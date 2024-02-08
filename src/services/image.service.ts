// src/services/company.service.ts
import { injectable } from 'inversify';
import { Image } from '../data/models/image.entity';
import { ImageRepository } from '../repositories/image.repository';

@injectable()
export class ImageService {
    constructor(private readonly imageRepository: ImageRepository) {}

   async saveImage(image: Image): Promise<Image> {
    return await this.imageRepository.save(image);
  }

  async getAllImages(): Promise<Image[]> {
    return await this.imageRepository.find();
  }
}
