import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import { serviceSchema } from "../schema/serviceSchema";
import { prisma } from "../services/prisma";

interface Params {
  id: string;
}

interface GenericParams extends RouteGenericInterface {
  Params: Params;
}

export async function createService(req: FastifyRequest, res: FastifyReply) {
  const { name, description, restrictions } = serviceSchema.parse(req.body);

  try {
    const service = await prisma.service.create({
      data: {
        name,
        description,
        ServiceRestriction: {
          create: restrictions.map((restriction: string) => ({
            restriction: { connect: { type: restriction } },
          })),
        },
      },
    });

    return res.status(201).send(service);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Ocorreu um erro interno no servidor!" });
  }
}

export async function deleteService(
  req: FastifyRequest<GenericParams>,
  res: FastifyReply
) {
  const id = parseInt(req.params.id);

  try {
    const hasService = await prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!hasService) {
      return res.status(400).send({ message: "Não há um serviço com esse id" });
    }

    await prisma.serviceRestriction.deleteMany({
      where: {
        serviceId: id,
      },
    });

    await prisma.service.delete({
      where: {
        id,
      },
    });

    return res.status(200).send({ message: "Deletado com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Ocorreu um erro interno no servidor!" });
  }
}

export async function findAllServices(req: FastifyRequest, res: FastifyReply) {
  try {
    const service = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        ServiceRestriction: {
          select: {
            restriction: true,
          },
        },
      },
    });
    return res.status(200).send(service);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Ocorreu um erro interno no servidor!" });
  }
}

export async function findServiceById(
  req: FastifyRequest<GenericParams>,
  res: FastifyReply
) {
  const id = parseInt(req.params.id);

  try {
    const service = await prisma.service.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        ServiceRestriction: {
          select: {
            restriction: true,
          },
        },
      },
    });

    if (!service) {
      return res.status(400).send({ message: "Não há um serviço com esse id" });
    }

    return res.status(200).send(service);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Ocorreu um erro interno no servidor!" });
  }
}
