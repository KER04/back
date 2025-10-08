import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let dbConfig: any = {};


// mysql
dbConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
  timezone: process.env.DB_TIMEZONE || 'America/Bogota',
}

const db = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

export default db;