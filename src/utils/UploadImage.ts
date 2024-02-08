import multer, { Multer } from "multer";
import { Request, Response } from "express";

class ImageUploader {
    private upload: Multer;

    constructor() {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "uploads/"); // Specify the directory where uploaded files will be stored
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + "-" + file.originalname); // Specify how the uploaded files will be named
            },
        });

        this.upload = multer({ storage: storage });
    }

    async uploadImageSource(req: Request, res: Response): Promise<void> {
        try {
            // Use Multer middleware to handle file upload
            this.upload.single("image")(req, res, async (err: any) => {
                if (err) {
                    console.error("Error uploading file:", err);
                    res.status(400).json({ error: "Failed to upload file" });
                    return;
                }
            });
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }
}

export default ImageUploader;
