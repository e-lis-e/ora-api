import fastify from "fastify";
import { userRoutes } from "./routes/userRoutes";
import { newsRoutes } from "./routes/newsRoutes";
import { serviceRoutes } from "./routes/serviceRoutes";
import { authRoutes } from "./routes/authRoutes";

const app = fastify();

userRoutes(app);
newsRoutes(app);
serviceRoutes(app);
authRoutes(app);

app
  .listen({
    host: "0.0.0.0",
    port: 3333,
  })
  .then(() => {
    console.log("Server running");
  });
