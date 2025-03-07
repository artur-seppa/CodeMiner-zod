import Fastify from "fastify";
import { userRoutes } from "./routes/users.js";
import { errorHandler } from "./plugins/errorHandler.js";
import { postRoutes } from "./routes/posts.js";


export const makeServer = () => {
  const server = Fastify();

  server.register(userRoutes);
  server.register(postRoutes);

  server.setErrorHandler(errorHandler);

  return server;
};
