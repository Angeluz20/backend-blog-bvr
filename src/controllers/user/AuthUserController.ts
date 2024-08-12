import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const authService = new AuthUserService();

        try {
            const user = await authService.execute({
                email,
                password
            });

            return res.status(200).json(user);
        } catch (error) {
            console.error(error.message);
            return res.status(400).json({ error: error.message });
        }
    }
}

export { AuthUserController };