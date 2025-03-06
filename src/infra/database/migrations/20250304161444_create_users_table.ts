import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("users", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

      table.string("email").notNullable();
      table.string("username").notNullable();
      table.string("name");
      table.date("birthDate");

      table.timestamps(true, true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
