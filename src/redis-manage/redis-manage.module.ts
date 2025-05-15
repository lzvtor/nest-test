import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisManageService } from './redis-manage.service';

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    }),
  ],
  providers: [RedisManageService],
  exports: [RedisManageService],
})
export class RedisManageModule {}
