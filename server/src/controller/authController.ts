import { FastifyReply, FastifyRequest } from "fastify";
import { loginSchema } from "../schema/loginSchema";
import { prisma } from "../services/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req: FastifyRequest, res: FastifyReply) {
  const { email, password } = loginSchema.parse(req.body);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).send({ message: "E-mail não encontrado" });
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const secretKey = process.env.SECRET_KEY;

      if (!secretKey) {
        return res.status(500).send({ message: "Sem secret key no ambiente" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        secretKey,
        {
          expiresIn: "2 days",
        }
      );

      return res.status(200).send({ token });
    } else {
      return res.status(400).send({
        message: "E-mail ou senha incorretos",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Ocorreu um erro interno no servidor!" });
  }
}
