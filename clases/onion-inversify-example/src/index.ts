import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import customerRoutes from './core/API/routes';

import { AppDataSource } from './infraestructure/DB/dataSource';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use(customerRoutes);


AppDataSource.initialize();

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
