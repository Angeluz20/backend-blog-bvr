import prisma from "../../prisma";

interface IDetailsUser {
    id: string;
}

class DetailsUserService {
    async execute({ id }: IDetailsUser) {

        const getDetails = await prisma.user.findFirst({
            where: { id: id },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
            }
        })

        if(!getDetails) {
            throw new Error('User not found')
        }

        return getDetails
    }
}

export { DetailsUserService };