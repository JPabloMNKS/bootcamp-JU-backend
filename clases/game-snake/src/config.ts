import sqlite3 from 'sqlite3';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config();

const db = new sqlite3.Database(
  path.resolve(__dirname, 'snake_game.db'),
  sqlite3.OPEN_READWRITE,
  (err: { message: any; }) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  }
);

module.exports = {
  db,
  port: process.env.PORT,
};