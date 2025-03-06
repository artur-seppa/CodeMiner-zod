import BaseModel from "./baseModel.js";
import UserModel from "./userModel.js";

export default class PostModel extends BaseModel {
  static tableName = "posts";

  id!: string;
  visibility!: string;
  body!: string;

  authorId!: string;
  author!: UserModel;

  static get relationMappings() {
    return {
      author: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "posts.authorId",
          to: "users.id",
        },
      },
    };
  }
}
