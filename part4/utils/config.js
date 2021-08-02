require('dotenv').config();

const DB_URL = process.env.DB_URL;
const PORT = 3001;

module.exports = {
  DB_URL,
  PORT
}