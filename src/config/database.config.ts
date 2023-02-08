import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const database = (): { database: SequelizeModuleOptions } => ({
  database: {
    dialect: 'postgres',
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    autoLoadModels: false,
    retry: {
      max: 1,
    },
  }
});
