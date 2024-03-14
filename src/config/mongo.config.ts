import { registerAs } from '@nestjs/config';

export const mongoConfig = registerAs('mongo', () => ({
  url: process.env.MONGO_DATABASE_URL,
  dbName: process.env.MONGO_DATABASE_DBNAME,
}));
