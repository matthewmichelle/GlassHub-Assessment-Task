// imageUploadService.ts

import multer from "multer";
import path from "path";
import { Request, Response } from "express";
import { Image } from "../data/models/image.entity";
import { User } from "../data/models/user.entity";
import { ImageDto } from "../data/dto/imageDTO";
import httpStatus from "http-status";

export class ImageUploadService {
    private static storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.resolve(__dirname, "../uploads/"));
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        },
    });

    private static upload = multer({ storage: ImageUploadService.storage });

    public handleUpload(req: Request, res: Response, imageService: any): void {
        ImageUploadService.upload.single("file")(req, res, async (err: any) => {
            try {
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

                const result = await imageService.saveImage(image);
                res.status(httpStatus.CREATED).json({ message: "Image uploaded successfully", image: result });
            } catch (error) {
                console.error("Error uploading image:", error);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
            }
        });
    }
}
