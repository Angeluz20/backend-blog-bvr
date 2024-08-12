import prisma from "../../prisma/index"
import { hash } from "bcryptjs";

interface UserRequest {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

class CreateUserService {
    async execute({ name, email, password, avatar }: UserRequest) {
        console.log(name);

        if (!email) {
            throw new Error("Email is required");
        }
        // verifica se esse email já está cadastrado
        const userAlreadyExists = await prisma.user.findFirst({
            where: {
                email: email,
            },
        })
        // se já existe, lança uma exceção
        if (userAlreadyExists) {
            throw new Error("User already exists");
        }
        const passwordHash = await hash(password, 8);
        // se não existe, cria o novo usuário
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                avatar: avatar,
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
            }
        })
        return user;
    }
}

export { CreateUserService };