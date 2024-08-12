import prisma from "../../prisma";
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken";// registra e gere um token

interface IAuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: IAuthRequest) {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            }
        })

        if (!user) {
            throw new Error("User/password incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("User/password incorrect");
        }

        const token = sign({
            name: user.name,
            email: user.email,
            avatar: user.avatar
        },
            process.env.SECRET_TOKEN_JWT,
            {
                subject: user.id,
                expiresIn: "30d"
            }
        );
        console.log(user);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            token,
        };
    }
}

export { AuthUserService };