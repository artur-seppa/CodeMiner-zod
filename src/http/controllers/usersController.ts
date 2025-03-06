import { FastifyReply, FastifyRequest } from "fastify";
import UserService from "../../services/userService.js";
import { CreateUserDto } from "../../dtos/users/create.js";
import { UpdateUserDto } from "../../dtos/users/update.js";

type UpdateBody = {
  name?: string;
  email?: string;
  username?: string;
  birthDate?: Date;
};

export const create = async (
  req: FastifyRequest<{ Body: CreateUserDto }>,
  reply: FastifyReply
) => {
  const userService = new UserService();

  const user = await userService.create(req.body);

  reply.status(201).send(user);
};

export const update = async (
  req: FastifyRequest<{ Params: { id: string }; Body: UpdateUserDto }>,
  reply: FastifyReply
) => {
  const userService = new UserService();

  const { id } = req.params;

  const updatedUser = await userService.update(id, req.body);

  reply.status(200).send(updatedUser);
};
