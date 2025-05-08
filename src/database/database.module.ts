// src/database/database.module.ts
import { Module, Global } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { createDataSource } from './create-data-source';

@Global()
@Module({
  providers: [
    {
      provide: 'DATA_SOURCE',
      useFactory: async (): Promise<DataSource> => {
        const dataSource = createDataSource();
        if (!dataSource.isInitialized) {
          await dataSource.initialize();
        }
        return dataSource;
      },
    },
  ],
  exports: ['DATA_SOURCE'],
})
export class DatabaseModule {
}
