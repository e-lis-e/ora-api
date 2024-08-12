import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export async function verifyToken(req: FastifyRequest, res: FastifyReply) {
  const token = req.headers.authorization;
  const secretKey = process.env.SECRET_KEY;

  try {
    if (!token) {
      return res.status(400).send({
        message: "Não há um token de autorização",
      });
    }

    try {
      if (!secretKey) {
        return res.status(400).send({ message: "Sem secret key no ambiente" });
      }

      const replace = token.replace("Bearer ", "");
      const decoded = jwt.verify(replace, secretKey);
    } catch (e) {
      return res.status(400).send({
        message: "Token inválido",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Ocorreu um erro interno no servidor!" });
  }
}
