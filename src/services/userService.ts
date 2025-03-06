import { CreateUserDto } from "../dtos/users/create.js";
import { UpdateUserDto } from "../dtos/users/update.js";
import ApplicationError, { ErrorCodes } from "../errors/applicationError.js";
import UserModel from "../infra/database/models/userModel.js";

export default class UserService {
  async create(user: CreateUserDto) {
    try {
      const newUser = await UserModel.query().insertAndFetch(user);

      return newUser;
    } catch (error) {
      console.error("Error while creating user:", error);

      throw new ApplicationError(
        ErrorCodes.BAD_REQUEST,
        "Failed to create user"
      );
    }
  }

  async update(id: string, userData: UpdateUserDto) {
    const user = await UserModel.query().findById(id);

    if (!user) {
      throw new ApplicationError(ErrorCodes.NOT_FOUND, "User not found");
    }

    try {
      const updatedUser = await UserModel.query().patchAndFetchById(
        id,
        userData
      );

      return updatedUser;
    } catch (error) {
      console.error("Error while updating user:", error);

      throw new ApplicationError(
        ErrorCodes.BAD_REQUEST,
        "Failed to update user"
      );
    }
  }
}
