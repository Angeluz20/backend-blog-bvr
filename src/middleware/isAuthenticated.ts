import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function IsAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const tokenAuthorization = req.headers.authorization;

    if (!tokenAuthorization) {
        res.status(401).end();// barra o usuário
    }

    const token = tokenAuthorization.split(' ')[1];;
    console.log(token);

    try {
        //validação
        const { sub } = verify(
            token,
            process.env.SECRET_TOKEN_JWT,
        ) as IPayload;

        req.user_id = sub;

    } catch (error) {
        return res.status(401).end();
    }

    next();
}