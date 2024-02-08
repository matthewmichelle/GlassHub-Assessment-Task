import { createContainer, AwilixContainer, asClass, asValue } from "awilix";
import { ImageService } from "../services/image.service";
import { UserService } from "../services/user.service";

// Import models
import { Image } from "../data/models/image.entity";
import { User } from "../data/models/user.entity";

export default function (dataSource: any): AwilixContainer {
    const container = createContainer({
        injectionMode: "CLASSIC",
    });

    const imageRepository = dataSource.getRepository(Image);

    const userRepository = dataSource.getRepository(User);
    // register services here
    // TODO: make service registration automattic
    container.register({
        imageService: asClass(ImageService).scoped(),
        userService: asClass(UserService).scoped(),
        imageRepository: asValue(imageRepository),
        userRepository: asValue(userRepository),
    });

    return container;
}
