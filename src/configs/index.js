require("dotenv/config");

module.exports = {
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  port: process.env.PORT,
  JWT_Key: process.env.JWT_SecretKey,
  ip: process.env.DB_IP,
};
