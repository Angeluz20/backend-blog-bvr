// gerencia a lógica
import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const createUserService = new CreateUserService();

        try {
            const user = await createUserService.execute({
                name,
                email,
                password,
                avatar: "",
            });

            return res.status(201).json(user);

        } catch (error) {
            console.error(error.message);
            return res.status(400).json({ error: error.message });
        }


    }
}

export { CreateUserController };