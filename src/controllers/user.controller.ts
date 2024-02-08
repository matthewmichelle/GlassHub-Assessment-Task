import { Request, Response } from "express";
import { route, GET, POST } from "awilix-express";
import { UserService } from "../services/user.service";
import { UserDto } from "../data/dto/userDTO";
import { validate } from "class-validator";
import { User } from "../data/models/user.entity";
import { plainToClass } from "class-transformer";
import httpStatus from "http-status";

@route("/users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @GET()
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getAllUser();
            res.status(httpStatus.OK).json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }
    }

    @POST()
    async createUser(req: Request, res: Response) {
        try {
            // Validate request body
            const userDto: UserDto = plainToClass(UserDto, req.body);
            const validationErrors = await validate(userDto);
            if (validationErrors.length > 0) {
                res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ errors: validationErrors });
                return;
            }

            const { name, email }: UserDto = req.body;
            const user: User = {
                name,
                email,
            };

            const result = await this.userService.saveUser(user);
            res.status(httpStatus.CREATED).json({
                message: "User create successfully",
                user: result,
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }
    }
}
