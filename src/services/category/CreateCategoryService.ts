import prisma from "../../prisma";

interface ICategory {
    name: string;
    userId: string;
}

class CreateCategoryService {
    async execute({ name, userId }: ICategory) {

        if (name === " ") {
            throw new Error("Name is required");
        }

        const categoryAlreadyExists = await prisma.category.findFirst({
            where: {
                userId: userId,
                name: name,
            }
        })

        if (categoryAlreadyExists) {
            throw new Error(`Category ${name} already exists`);
        }

        const category = await prisma.category.create({
            data: {
                userId: userId,
                name: name,
            },
        })
        return category;
    }
}
export { CreateCategoryService };