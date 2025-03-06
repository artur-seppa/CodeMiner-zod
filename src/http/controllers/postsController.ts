import { FastifyReply, FastifyRequest } from "fastify";
import PostService from "../../services/postService.js";
import { CreatePostDto } from "../../dtos/posts/create.js";

export const create = async (
  req: FastifyRequest<{ Body: CreatePostDto }>,
  reply: FastifyReply
) => {
  const postService = new PostService();

  const post = await postService.create(req.body);

  reply.status(201).send(post);
};
