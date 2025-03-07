import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import ApplicationError, { ErrorCodes } from "../../errors/applicationError.js";

export const errorHandler = (
  error: FastifyError,
  _req: FastifyRequest,
  reply: FastifyReply
) => {
  if (error instanceof ApplicationError) {
    if (error.code === ErrorCodes.BAD_REQUEST) {
      return reply.code(400).send({
        error: "Bad Request",
        message: error.message,
        details: error.details
      });
    }

    if (error.code === ErrorCodes.NOT_FOUND) {
      return reply.code(404).send({
        error: "Not Found",
        message: error.message,
        details: error.details
      });
    }
  }

  return reply.status(500).send({
    error: "Internal Server Error",
    message: "Internal Server Error",
  });
};
