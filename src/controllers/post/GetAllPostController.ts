import { Request, Response } from "express";
import { GetAllPostsService } from "../../services/post/GetAllPostsServices";

class GetAllPostsController {
    async handle(req: Request, res: Response) {
        const userId = req.user_id;

        const getAllPostsService = new GetAllPostsService();

        try {
            const posts = await getAllPostsService.execute({ userId: userId });

            return res.status(200).json(posts);

        } catch (error) {
            console.error(error.message);
            return res.status(400).json({ error: error.message });
        }
    }
}
export { GetAllPostsController }