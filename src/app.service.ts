import { Injectable, Inject, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  @Inject('DATA_SOURCE') private readonly dataSource: DataSource;

  async getHello(): Promise<User[]> {
    return this.dataSource.getRepository(User).find();
  }

  uploadChunk(file: Express.Multer.File, name: string) {
    const match = name.match(/(.+)-\d+$/);
    const fileName = match?.[1] ?? '';
    const chunkDir = path.join('uploads', `chunks_${fileName}`);

    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir, { recursive: true });
    }

    const destPath = path.join(chunkDir, name);
    fs.cpSync(file.path, destPath);
    fs.rmSync(file.path);
  }

  mergeChunks(name: string) {
    const chunkDir = path.join('uploads', `chunks_${name}`);
    const targetPath = path.join('uploads', name);

    if (!fs.existsSync(chunkDir)) {
      throw new Error('Chunk directory does not exist');
    }

    const files = fs.readdirSync(chunkDir).sort((a, b) => {
      // 确保按照分片顺序合并，例如 xxx-1, xxx-2, ...
      const aIndex = parseInt(a.split('-').pop() || '0', 10);
      const bIndex = parseInt(b.split('-').pop() || '0', 10);
      return aIndex - bIndex;
    });

    let count = 0;
    let startPos = 0;

    for (const file of files) {
      const filePath = path.join(chunkDir, file);
      const chunkSize = fs.statSync(filePath).size;
      const stream = fs.createReadStream(filePath);

      stream.pipe(
        fs.createWriteStream(targetPath, { start: startPos }),
      ).on('finish', () => {
        count++;
        if (count === files.length) {
          fs.rm(chunkDir, { recursive: true }, () => {
            this.logger.log(`Merged and cleaned up: ${chunkDir}`);
          });
        }
      });

      startPos += chunkSize;
    }
  }
}
