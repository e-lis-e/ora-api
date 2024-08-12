import { FastifyInstance } from "fastify";
import { createNew } from "../controller/newsController";
import {
  createService,
  deleteService,
  findAllServices,
  findServiceById,
} from "../controller/serviceController";
import { verifyToken } from "../middlewares/authMiddleware";

export async function serviceRoutes(server: FastifyInstance) {
  server.post("/service", { preHandler: verifyToken }, createService);
  server.delete("/service/:id", { preHandler: verifyToken }, deleteService);
  server.get("/service", { preHandler: verifyToken }, findAllServices);
  server.get("/service/:id", { preHandler: verifyToken }, findServiceById);
}
