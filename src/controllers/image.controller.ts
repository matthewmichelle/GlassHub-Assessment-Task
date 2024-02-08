import { Request, Response } from "express";
import { route, GET, POST } from "awilix-express";
import { ImageService } from "../services/image.service";
import { Image } from "../data/models/image.entity";
import { ImageDto } from "../data/dto/imageDTO";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import multer from "multer";
import path from "path";
import { User } from "../data/models/user.entity";
import httpStatus from "http-status";

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../uploads/")); // Specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Specify how the uploaded files will be named
    },
});

const upload = multer({ storage: storage });

@route("/images")
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @GET()
    async get(req: Request, res: Response) {
        try {
            const images = await this.imageService.getAllImages();
            res.status(httpStatus.OK).json(images);
        } catch (error) {
            console.error("Error fetching images:", error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }
    }

    @POST()
    async uploadImage(req: Request, res: Response): Promise<void> {
        try {
            // Validate request body
            const uploadImageDto: ImageDto = plainToClass(ImageDto, req.body);
            const validationErrors = await validate(uploadImageDto);
            if (validationErrors.length > 0) {
                res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
                    errors: validationErrors,
                });
                return;
            }

            // Handle file upload
            upload.single("file")(req, res, async (err: any) => {
                if (err) {
                    console.error("Error uploading file:", err);
                    res.status(httpStatus.BAD_REQUEST).json({
                        error: "Failed to upload file",
                    });
                    return;
                }

                // Construct Image object
                const { latitude, longitude, userId }: ImageDto = req.body;
                const filename = req.file?.filename || "";

                // Create new Image entity
                const image: Image = {
                    filename,
                    latitude,
                    longitude,
                    // TODO: get from headers
                    user: new User(userId),
                };

                // Save image using the image service
                const result = await this.imageService.saveImage(image);

                // Send success response
                res.status(httpStatus.CREATED).json({
                    message: "Image uploaded successfully",
                    image: result,
                });
            });
        } catch (error) {
            console.error("Error uploading image:", error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }
    }
}
