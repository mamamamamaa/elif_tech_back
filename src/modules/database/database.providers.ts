import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { DB_PROVIDER } from '../../config/providers';

export const databaseProviders = [
  {
    provide: DB_PROVIDER,
    inject: [ConfigService],
    useFactory: (configService: ConfigService): Promise<typeof mongoose> => {
      const CONNECT_URI = configService.get('DB_URI');
      return mongoose.connect(CONNECT_URI);
    },
  },
];
