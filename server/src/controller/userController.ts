import { error } from './../../node_modules/ajv/lib/vocabularies/applicator/dependencies';
import { FastifyReply, FastifyRequest } from "fastify";
import { userSchema } from "../schema/userSchema";
import { prisma } from "../services/prisma";
import bcrypt from "bcrypt";

export async function createUser(req: FastifyRequest, res: FastifyReply) {
  const { name, email, password, restrictions } = userSchema.parse(req.body);

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const hasEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (hasEmail) {
      return res.status(400).send({ message: "E-mail já cadastrado" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        UserRestriction: {
          create: restrictions.map((restriction: string) => ({
            restriction: { connect: { type: restriction } }
          }))
        },
      },
      select: {
        id: true,
        email: true,
        UserRestriction: {
          select: {
            restriction: true,
          }
        }
      },
    });

    return res.status(201).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Ocorreu um erro interno no servidor!",
    });
  }
}