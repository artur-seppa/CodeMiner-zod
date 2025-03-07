import { FastifyInstance } from "fastify";
import * as UsersController from "../controllers/usersController.js";
import { validateUser } from "../../validations/user.schema.js";

export const userRoutes = (fastify: FastifyInstance) => {
  fastify.post("/users", UsersController.create);
  fastify.patch("/users/:id", UsersController.update);
};
