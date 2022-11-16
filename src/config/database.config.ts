import { SequelizeModuleOptions } from '@nestjs/sequelize';

export default (): { database: SequelizeModuleOptions } => ({
  database: {
    dialect: 'postgres',
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    autoLoadModels: true,
    retry: {
      max: 1,
    },
  }
});
