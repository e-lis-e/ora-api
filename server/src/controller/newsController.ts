import { newsSchema } from "../schema/newsSchema";
import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import { prisma } from "../services/prisma";

interface Params {
  id: string;
}

interface GenericParams extends RouteGenericInterface {
  Params: Params;
}

export async function createNew(req: FastifyRequest, res: FastifyReply) {
  const { title, content, restrictions } = newsSchema.parse(req.body);

  try {
    const news = await prisma.news.create({
      data: {
        title,
        content,
        NewsRestriction: {
          create: restrictions.map((restriction: string) => ({
            restriction: { connect: { type: restriction } },
          })),
        },
      },
    });

    return res.status(201).send(news);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Ocorreu um erro interno no servidor!" });
  }
}

export async function deleteNew(
  req: FastifyRequest<GenericParams>,
  res: FastifyReply
) {
  const id = parseInt(req.params.id);

  try {
    const hasNews = await prisma.news.findUnique({
      where: {
        id,
      },
    });

    if (!hasNews) {
      return res
        .status(400)
        .send({ message: "Não há uma notícia com esse id" });
    }

    await prisma.newsRestriction.deleteMany({
      where: {
        newsId: id,
      },
    });

    await prisma.news.delete({
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

export async function findAllNews(req: FastifyRequest, res: FastifyReply) {
  try {
    const news = await prisma.news.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        NewsRestriction: {
          select: {
            restriction: true,
          },
        },
      },
    });
    return res.status(200).send(news);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Ocorreu um erro interno no servidor!" });
  }
}

export async function findNewsById(
  req: FastifyRequest<GenericParams>,
  res: FastifyReply
) {
  const id = parseInt(req.params.id);

  try {
    const news = await prisma.news.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        NewsRestriction: {
          select: {
            restriction: true,
          },
        },
      },
    });

    if (!news) {
      return res
        .status(400)
        .send({ message: "Não há uma notícia com esse id" });
    }

    return res.status(200).send(news);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Ocorreu um erro interno no servidor!" });
  }
}
