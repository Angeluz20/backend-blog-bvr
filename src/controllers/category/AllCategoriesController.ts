import { Request, Response } from "express";
import { AllCategoriesService } from "../../services/category/AllCategoriesService";

class AllCategoriesController {
    async handle(req: Request, res: Response) {
        const userId = req.user_id;

        const allCategoriesService = new AllCategoriesService();
        try {
            const categories = await allCategoriesService.execute({
                userId: userId,
            });
            return res.status(200).json(categories);
       
        } catch (error) {
            console.error(error.message);
            return res.status(400).json({ error: error.message });
        }
    }
}

export { AllCategoriesController };