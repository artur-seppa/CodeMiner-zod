import Knex from "knex";
import { config } from "../../config.js";
import { Model } from "objection";

export const makeDatabase = () => {
  const knex = Knex({
    ...config.db[config.env],
    debug: config.env === "development",
  });

  Model.knex(knex);

  return {
    async connect() {
      await knex.raw("SELECT 1");
      console.log("Database connected");
    },

    async disconnect() {
      await knex.destroy();
      console.log("Database disconnected");
    },
  };
};
