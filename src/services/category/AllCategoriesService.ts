import prisma from "../../prisma";

interface IAllCategoriesUser {
    userId: string;
}

class AllCategoriesService {
    async execute({ userId }: IAllCategoriesUser) {
        const userExists = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!userExists) {
            throw new Error("User not found.");
        }

        const categories = await prisma.category.findMany({
            where: { userId: userId },
            select: {
                id: true,
                name: true,
            }
        });

        if (categories.length === 0) {
            throw new Error("No categories found for this user.");
        }

        return categories;
    }
}

export { AllCategoriesService };
