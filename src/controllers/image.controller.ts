import { Request, Response } from "express";
import { route, GET, POST } from "awilix-express";
import { ImageService } from "../services/image.service";
import { Image } from "../data/models/image.entity";
import { ImageDto } from "../data/dto/imageDTO";
import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import multer from "multer";
import path from "path";
import { User } from "../data/models/user.entity";
import httpStatus from "http-status";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../uploads/"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

@route("/images")
export class ImageController {
    constructor(private readonly imageService: ImageService) { }

    /**
     * @swagger
     * components:
     *   schemas:
     *     Image:
     *       type: object
     *       properties:
     *         id:
     *           type: string
     *           description: The unique identifier for the image.
     *         filename:
     *           type: string
     *           description: The filename of the image.
     *         latitude:
     *           type: number
     *           description: The latitude coordinate of the image location.
     *         longitude:
     *           type: number
     *           description: The longitude coordinate of the image location.
     *         userId:
     *           type: string
     *           description: The unique identifier of the user who uploaded the image.
     *   parameters:
     *     file:
     *       name: file
     *       in: formData
     *       required: true
     *       type: file
     *       description: The image file to upload.
     */


    /**
     * @swagger
     * /images:
     *   get:
     *     summary: Get all images
     *     tags:
     *       - Images
     *     responses:
     *       200:
     *         description: A list of images
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Image'
     */

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

     /**
     * @swagger
     * /images:
     *   post:
     *     summary: Upload an image
     *     tags:
     *       - Images
     *     consumes:
     *       - multipart/form-data
     *     parameters:
     *       - $ref: '#/components/parameters/file'
     *       - name: latitude
     *         in: formData
     *         required: true
     *         type: number
     *         description: The latitude coordinate of the image location.
     *       - name: longitude
     *         in: formData
     *         required: true
     *         type: number
     *         description: The longitude coordinate of the image location.
     *       - name: userId
     *         in: formData
     *         required: true
     *         type: string
     *         description: The unique identifier of the user who uploaded the image.
     *     responses:
     *       '201':
     *         description: Image uploaded successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Image'
     *       '400':
     *         description: Bad request
     *       '422':
     *         description: Unprocessable entity
     *       '500':
     *         description: Internal server error
     */

    @POST()
    async uploadImage(req: Request, res: Response): Promise<void> {
        try {
            const uploadImageDto: ImageDto = plainToClass(ImageDto, req.body);
            const validationErrors = await validate(uploadImageDto);

            if (validationErrors.length > 0) {
                res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ errors: validationErrors });
                return;
            }

            upload.single("file")(req, res, async (err: any) => {
                if (err) {
                    console.error("Error uploading file:", err);
                    res.status(httpStatus.BAD_REQUEST).json({ error: "Failed to upload file" });
                    return;
                }

                const { latitude, longitude, userId }: ImageDto = req.body;
                const filename = req.file?.filename || "";

                const image: Image = {
                    filename,
                    latitude,
                    longitude,
                    user: new User(userId),
                };

                const result = await this.imageService.saveImage(image);
                res.status(httpStatus.CREATED).json({ message: "Image uploaded successfully", image: result });
            });
        } catch (error) {
            console.error("Error uploading image:", error);
            if (error instanceof ValidationError) {
                // Handle validation errors
                res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ errors: error });
            } else {
                // Handle other types of errors
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
            }
        }
    }
}
