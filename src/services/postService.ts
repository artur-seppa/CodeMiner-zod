import { CreatePostDto } from "../dtos/posts/create.js";
import ApplicationError, { ErrorCodes } from "../errors/applicationError.js";
import PostModel from "../infra/database/models/postModel.js";
import { validateCreatePost } from "../validations/post.schema.js";

export default class PostService {
  async create(post: CreatePostDto) {
    const validationResult = validateCreatePost(post);

    if (!validationResult.success) {
      throw new ApplicationError(
        ErrorCodes.BAD_REQUEST,
        "Validation failed",
        validationResult.errors
      );
    }

    try {
      const newPost = await PostModel.query().insert(post);

      return newPost;
    } catch (error) {
      console.log(error);

      throw new ApplicationError(
        ErrorCodes.BAD_REQUEST,
        "Failed to create post"
      );
    }
  }
}
