import { ZodFormattedError } from "zod";

export enum ErrorCodes {
  BAD_REQUEST = "BAD_REQUEST",
  NOT_FOUND = "NOT_FOUND",
}

interface ValidationErrors {
  errors: ZodFormattedError<{
    username: string;
    email: string;
    birthDate: string;
    name?: string | undefined;
}, string> | undefined;
}

export default class ApplicationError extends Error {
  code: string;
  details?: ValidationErrors["errors"];

  constructor(code: ErrorCodes, message: string, details?: ValidationErrors["errors"]) {
    super(message);
    this.code = code;
    this.details = details;
  }
}
