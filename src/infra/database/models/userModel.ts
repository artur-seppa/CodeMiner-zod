import { ModelObject } from "objection";
import BaseModel from "./baseModel.js";
import PostModel from "./postModel.js";

export default class UserModel extends BaseModel {
  static tableName = "users";

  id!: string;
  name?: string;
  email!: string;
  username!: string;
  birthDate!: Date;

  static get relationMappings() {
    return {
      posts: {
        relation: BaseModel.HasManyRelation,
        modelClass: PostModel,
        join: {
          from: "users.id",
          to: "posts.authorId",
        },
      },
    };
  }
}
