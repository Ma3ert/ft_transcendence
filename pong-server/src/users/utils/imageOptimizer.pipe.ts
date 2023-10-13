import { Injectable, PipeTransform } from '@nestjs/common';
import * as sharp from 'sharp';
import * as path from 'path';

@Injectable()
export class imageOptimizerPipe implements PipeTransform<Express.Multer.File> {
  async transform(image: Express.Multer.File): Promise<string> {
    if (!image) return null;
    const filename = Date.now() + '.jpeg';
    await sharp(image.buffer)
      .resize(500)
      .jpeg({ quality: 90 })
      .toFile(path.join('public/users/imgs', filename));
    return filename;
  }
}
