import express from 'express';
import { AppDataSource } from './DB/data-source';
import { DriveAccount } from './DB/entity/driveAccount';

const app = express();
const port = 3002;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

AppDataSource.initialize().then(async() => {
  const accountOne = new DriveAccount();
  accountOne.email = "test@gmail.com";
  accountOne.googleDriveKey = "djshfkjasndlka=";

  await AppDataSource.manager.save(accountOne);

  const driveAccountOne = await AppDataSource.manager.find(DriveAccount)

  app.get('/account', (req, res) => {
    res.send(driveAccountOne)
  })
  

}).catch(error => console.log(error));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
