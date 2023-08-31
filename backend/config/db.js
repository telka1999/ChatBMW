import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
  username: process.env.RAILWAY_MYSQL_USERNAME,
  password: process.env.RAILWAY_MYSQL_PASSWORD,
  database: process.env.RAILWAY_MYSQL_DATABASE,
  dialect: "mysql",
  dialectModule: require('mysql2'),
  port: process.env.RAILWAY_MYSQL_PORT,
  host: process.env.RAILWAY_MYSQL_HOST,
});

export default sequelize;
