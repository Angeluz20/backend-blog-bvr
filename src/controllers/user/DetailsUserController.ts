import { Request, Response } from "express";
import { DetailsUserService } from "../../services/user/DetailsUserService";

class DetailsUserController {
    async handle(req: Request, res: Response) {
        const userId = req.user_id;

        const detailsUserService = new DetailsUserService();

        try {

            const user = await detailsUserService.execute({
                id: userId,
            });

            return res.status(200).json(user);
        } catch (error) {
            console.error(error.message);
            return res.status(400).json({ error: error.message });
        }
    }
}

export { DetailsUserController };