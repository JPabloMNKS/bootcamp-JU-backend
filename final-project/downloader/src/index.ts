import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './API/routes/routes';

import { AppDataSource } from './DB/data-source'
import { receiveFromRabbit } from './services/rabbitmq/receiver';
import { ErrorHandler } from './API/middlewares/errorHandler';

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
app.use(userRoutes);
app.use(ErrorHandler.handle)

receiveFromRabbit();

AppDataSource.initialize();


app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
