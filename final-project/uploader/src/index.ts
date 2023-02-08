import express from 'express';
import { AppDataSource } from './DB/data-source';
import dotenv from 'dotenv';
import Routes from './core/API/routes';
import bodyParser from 'body-parser';
import cors from 'cors';


dotenv.config();
const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

app.use(Routes);
AppDataSource.initialize();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
