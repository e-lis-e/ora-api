import { error } from "./../../node_modules/ajv/lib/vocabularies/applicator/dependencies";
import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import { userSchema } from "../schema/userSchema";
import { prisma } from "../services/prisma";
import bcrypt from "bcrypt";

interface Params {
  id: string;
}

interface GenericParams extends RouteGenericInterface {
  Params: Params;
}

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
            restriction: { connect: { type: restriction } },
          })),
        },
      },
      select: {
        id: true,
        email: true,
        UserRestriction: {
          select: {
            restriction: true,
          },
        },
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

export async function findUserById(
  req: FastifyRequest<GenericParams>,
  res: FastifyReply
) {
  const id = parseInt(req.params.id);

  try {
    const hasUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!hasUser) {
      return res
        .status(400)
        .send({ message: "Não há um usuário cadastrado com esse id" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        UserRestriction: {
          select: {
            restriction: true,
          },
        },
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

export async function findAllUsers(req: FastifyRequest, res: FastifyReply) {
  try {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        UserRestriction: {
          select: {
            restriction: true,
          },
        },
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
