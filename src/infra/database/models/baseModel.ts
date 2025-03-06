import { Model } from "objection";

export default class BaseModel extends Model {
  createdAt!: Date;
  updatedAt!: Date;
}
