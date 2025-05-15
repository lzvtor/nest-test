import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { RedisManageModule } from './redis-manage/redis-manage.module';

@Module({
  imports: [DatabaseModule, RedisManageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
