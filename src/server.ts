import express, {Request, Response, NextFunction} from "express"; // acessa o express
import "express-async-errors";
import cors from "cors";

import { router } from "./routes"; // importa as minhas rotas

const app = express(); // instancia um objeto para usar o express
app.use(express.json());// permite o processamento de dados JSON em req.body
app.use(cors()); // habilita o CORS para permitir que outros domínios acessem a API

app.use(router); // regsitra o router permitindo a manipulaçãp das rotas

//middleware
app.use((err: Error, req: Request, res: Response) => {
    if(err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        })
    }

    return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
    })
})

app.listen(3333, () => console.log("server on"));// permite que o express ouça a porta 3333

