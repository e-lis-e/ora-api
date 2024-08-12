import { FastifyInstance } from "fastify";
import {
  createNew,
  deleteNew,
  findAllNews,
  findNewsById,
} from "../controller/newsController";
import { verifyToken } from "../middlewares/authMiddleware";

export async function newsRoutes(server: FastifyInstance) {
  server.post("/news", { preHandler: verifyToken }, createNew);
  server.delete("/news/:id", { preHandler: verifyToken }, deleteNew);
  server.get("/news", { preHandler: verifyToken }, findAllNews);
  server.get("/news/:id", { preHandler: verifyToken }, findNewsById);
}
