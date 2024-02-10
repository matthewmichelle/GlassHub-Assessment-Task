
import { Image } from "../models/image.entity";

export const excludeUserFromImage = (image: Image): any => {
    // Omit the 'user' property from the image object
    const { user, ...imageWithoutUser } = image;
    return imageWithoutUser;
}