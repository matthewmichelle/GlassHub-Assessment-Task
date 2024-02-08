import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV ?? "development";

const isConfig = dotenv.config()

if (isConfig.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    env: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || '3000', 10),
    db_host: process.env.DB_HOST,
    db_port: parseInt(process.env.DB_PORT || '2345'),
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_databasename: process.env.DB_DATABASE,
};