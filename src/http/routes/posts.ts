import { FastifyInstance } from "fastify";
import * as PostsController from "../controllers/postsController.js";

export const postRoutes = (fastify: FastifyInstance) => {
  fastify.post("/posts", PostsController.create);
};
