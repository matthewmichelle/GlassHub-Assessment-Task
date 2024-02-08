import { EntityRepository, Repository } from "typeorm";
import { Image } from "../data/models/image.entity";

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
    // custom repository methods...
}
