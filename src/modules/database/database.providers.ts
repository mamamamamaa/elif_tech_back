import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService): Promise<typeof mongoose> => {
      const CONNECT_URI = configService.get('DB_URI');
      return mongoose.connect(CONNECT_URI);
    },
  },
];
