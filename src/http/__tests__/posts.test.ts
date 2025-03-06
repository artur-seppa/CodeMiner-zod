import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { makeDatabase } from "../../infra/database/database.js";
import { makeServer } from "../server.js";
import UserModel from "../../infra/database/models/userModel.js";
import PostModel from "../../infra/database/models/postModel.js";

const database = makeDatabase();
const fastify = makeServer();

beforeAll(async () => {
  await fastify.ready();
  await database.connect();
});

afterEach(async () => {
  await PostModel.query().delete();
  await UserModel.query().delete();
});

afterAll(async () => {
  await database.disconnect();
  await fastify.close();
});

describe("POST /posts", () => {
  it("creates a post successfully", async () => {
    const user = await UserModel.query().insert({
      username: "test",
      email: "test@example.com",
      birthDate: new Date("2000-01-01"),
    });

    const payload = {
      authorId: user.id,
      visibility: "public",
      body: "hello world",
    };

    const response = await fastify.inject({
      method: "POST",
      path: "/posts",
      payload,
    });

    const body = response.json();

    expect(response.statusCode).toBe(201);
    expect(body).toMatchObject({
      id: expect.any(String),
      visibility: "public",
      body: "hello world",
      authorId: user.id,
    });
  });

  describe("when the user does not exist", () => {
    it("returns HTTP bad request", async () => {
      const payload = {
        authorId: "a2196618-59c9-4f28-b35b-40812a6de70b",
        visibility: "public",
        body: "hello world",
      };

      const response = await fastify.inject({
        method: "POST",
        path: "/posts",
        payload,
      });

      const body = response.json();

      expect(response.statusCode).toBe(400);
      expect(body).toMatchObject({
        error: "Bad Request",
        message: "Failed to create post",
      });
    });
  });
});
