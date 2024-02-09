import { Request, Response } from "express";
import { route, GET, POST } from "awilix-express";
import { UserService } from "../services/user.service";
import { UserDto } from "../data/dto/userDTO";
import { validate, ValidationError } from "class-validator";
import { User } from "../data/models/user.entity";
import { plainToClass } from "class-transformer";
import httpStatus from "http-status";

@route("/users")
export class UserController {
    constructor(private readonly userService: UserService) { }


    /**
     * @swagger
     * components:
     *   schemas:
     *     User:
     *       type: object
     *       properties:
     *         id:
     *           type: string
     *           description: The unique identifier for the user.
     *         name:
     *           type: string
     *           description: The name of the user.
     *         email:
     *           type: string
     *           description: The email of the user.
     *     ValidationError:
     *       type: object
     *       properties:
     *         message:
     *           type: string
     *           description: A message describing the validation error.
     *         errors:
     *           type: array
     *           items:
     *             type: string
     *           description: An array of validation error messages.
     */

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Get all users
     *     tags:
     *       - Users
     *     responses:
     *       200:
     *         description: A list of users
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     *       500:
     *         description: Internal server error
     */

    @GET()
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getAllUsers();
            res.status(httpStatus.OK).json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Failed to fetch users" });
        }
    }

     /**
     * @swagger
     * /users:
     *   post:
     *     summary: Create a new user
     *     tags:
     *       - Users
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       201:
     *         description: User created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       422:
     *         description: Unprocessable entity
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ValidationError'
     *       500:
     *         description: Internal server error
     */

    @POST()
    async createUser(req: Request, res: Response) {
        try {
            // Validate request body
            const userDto: UserDto = plainToClass(UserDto, req.body);
            const validationErrors = await validate(userDto);
            if (validationErrors.length > 0) {
                return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ errors: validationErrors });
            }

            const { name, email }: UserDto = req.body;
            const user: User = {
                name,
                email,
            };

            const result = await this.userService.saveUser(user);
            return res.status(httpStatus.CREATED).json({
                message: "User created successfully",
                user: result,
            });
        } catch (error) {
            console.error("Error creating user:", error);
            if (error instanceof ValidationError) {
                return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ errors: error });
            } else {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Failed to create user" });
            }
        }
    }
}
