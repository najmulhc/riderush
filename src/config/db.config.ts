import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

export const dbConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    type: 'postgres',
    host: config.get<string>('DB_HOST'),
    port: config.get<number>('DB_PORT'),
    database: config.get<string>('DB_NAME'),
    username: config.get<string>('DB_USERNAME'),
    password: config.get<string>('DB_PASSWORD'),
    synchronize: true,
    entities: [User],
    ssl: {
      rejectUnauthorized: false,
    },
  }),
};
