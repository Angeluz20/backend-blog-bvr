import { Request, Response } from "express";
import { CreatePostService } from "../../services/post/CreatePostService";

class CreatePostController {
    async handle(req: Request, res: Response) {
        const {
            title,
            description,
            published_at,
            poster,
            categoryId
        } = req.body;
        const userId = req.user_id;

        const createPostService = new CreatePostService();

        try {
            const post = await createPostService.execute(({
                title: title,
                description: description,
                poster: poster,
                published_at: published_at,
                userId: userId,
                categoryId: categoryId,
            }))
            return res.status(201).json(post);
            
        } catch (error) {
            console.error(error.message);
            return res.status(400).json({ error: error.message });

        }
    }
}

export { CreatePostController };