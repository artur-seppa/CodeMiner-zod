import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { makeDatabase } from "../../infra/database/database.js";
import { makeServer } from "../server.js";
import UserModel from "../../infra/database/models/userModel.js";

const database = makeDatabase();
const fastify = makeServer();

beforeAll(async () => {
  await fastify.ready();
  await database.connect();
});

afterEach(async () => {
  await UserModel.query().delete();
});

afterAll(async () => {
  await database.disconnect();
  await fastify.close();
});

describe("POST /users", () => {
  it("creates a user", async () => {
    const payload = {
      email: "test@example.com",
      username: "test",
      birthDate: "2000-01-01",
    };

    const response = await fastify.inject({
      method: "POST",
      url: "/users",
      payload,
    });

    const body = response.json();
    const user = await UserModel.query().findOne({ email: "test@example.com" });

    expect(response.statusCode).toBe(201);
    expect(body).toMatchObject({
      id: expect.any(String),
      name: null,
      email: "test@example.com",
      username: "test",
    });
    expect(user).toBeDefined();
  });
});

describe("PATCH /users/:id", () => {
  it("updates the user successfully", async () => {
    const user = await UserModel.query().insert({
      username: "test",
      email: "test@example.com",
      birthDate: new Date("2000-01-01"),
    });

    const payload = {
      name: "Julius",
    };

    const response = await fastify.inject({
      method: "PATCH",
      path: `/users/${user.id}`,
      payload,
    });

    const body = response.json();

    expect(response.statusCode).toBe(200);
    expect(body).toMatchObject({
      id: user.id,
      name: "Julius",
      username: "test",
      email: "test@example.com",
    });
  });

  describe("when the user is not found", () => {
    it("returns HTTP not found", async () => {
      const payload = {
        name: "Julius",
      };

      const response = await fastify.inject({
        method: "PATCH",
        path: "/users/c4faf24a-f1cf-40d6-ace0-b500f8be5f75",
        payload,
      });

      const body = response.json();

      expect(response.statusCode).toBe(404);
      expect(body).toMatchObject({
        error: "Not Found",
        message: "User not found",
      });
    });
  });
});
