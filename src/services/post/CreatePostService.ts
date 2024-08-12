import prisma from "../../prisma"

interface IPostRequest {
    title: string
    description: string
    poster: string
    published_at: string
    userId: string
    categoryId: string
}

class CreatePostService {
    async execute({
        title,
        description,
        poster,
        published_at,
        userId,
        categoryId
    }: IPostRequest) {

        if (!title || !description || !poster || !published_at || !userId || !categoryId) {
            throw new Error("All fields are required");
        }

        const post = await prisma.post.create({
            data: {
                title: title,
                description: description,
                poster: poster,
                published_at: published_at,
                user: {
                    connect: {
                        id: userId,
                    },
                },
                category: {
                    connect: {
                        id: categoryId,
                    },
                }
            },

        })
        return post;
    }
}

export { CreatePostService };