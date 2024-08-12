import { FastifyInstance } from "fastify";
import {
  createUser,
  findAllUsers,
  findUserById,
} from "../controller/userController";
import { verifyToken } from "../middlewares/authMiddleware";

export async function userRoutes(server: FastifyInstance) {
  server.post("/user", createUser);
  server.get("/user", { preHandler: verifyToken }, findAllUsers);
  server.get("/user/:id", { preHandler: verifyToken }, findUserById);
}
