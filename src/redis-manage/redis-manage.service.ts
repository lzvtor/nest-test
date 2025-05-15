import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class RedisManageService {
  constructor(@InjectRedis() private readonly redisCache: Redis) {}

  async get<T>(key: string, isObject?: boolean): Promise<string | T | null> {
    const result = await this.redisCache.get(key);
    if (result === null) return null;
    if (isObject) {
      return JSON.parse(result) as T;
    }
    return result;
  }

  async set(key: string, value: string | number | object, ttl?: number) {
    const strValue = JSON.stringify(value);
    if (typeof value === 'object') {
      await this.redisCache.set(
        key,
        strValue,
        'EX',
        ttl ? ttl : 60 * 60 * 24 * 7,
      );
    } else {
      await this.redisCache.set(key, value, 'EX', ttl ? ttl : 60 * 60 * 24 * 7);
    }
  }

  async reset() {
    await this.redisCache.reset();
  }

  async del(key: string) {
    await this.redisCache.del(key);
  }
}
