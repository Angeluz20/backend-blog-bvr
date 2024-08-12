import prisma from "../../prisma";


interface IAllPostsUser {
    userId: string;
}

class GetAllPostsService {
    async execute({ userId }: IAllPostsUser) {
        const userExists = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!userExists) {
            throw new Error("User not found.");
        }

        const allPosts = await prisma.post.findMany({
            where: {
                userId: userId,
            },
            select: {
                id: true,
                title: true,
                description: true,
                poster: true,
                published_at: true,
                categoryId: true,
            }
        });

        if (allPosts.length === 0) {
            throw new Error("No posts found for this user.");
        }

        return allPosts;
    }
}

export { GetAllPostsService };