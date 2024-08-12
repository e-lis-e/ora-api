import { FastifyInstance } from "fastify";
import { login } from "../controller/authController";

export async function authRoutes(server: FastifyInstance) {
  server.post("/auth", login);
}
