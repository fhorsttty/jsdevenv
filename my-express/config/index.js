const env = process.env.NODE_ENV || 'development';

const development = {
  app: {
    port: 3000,
  },
  db: {
    name: 'dbname',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
  },
  mail: {
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
  },
};

const production = {};

const config = {
  development,
  production,
};

module.exports = config[env];
