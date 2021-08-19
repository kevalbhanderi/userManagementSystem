import { Module } from '@nestjs/common';
import { Client } from 'pg';

export const client = new Client({
  user: 'postgres',
  port: 5432,
  password: '1234',
  host: '127.0.0.1',
  database: 'user_management',
});
client
  .connect()
  .then(() => console.log('Database Connected Successfully'))
  .catch((e) => console.log(e));

@Module({
  providers: [],
  exports: [],
})
export class DatabaseModule {}
