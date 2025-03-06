import { config } from "./config.js";
import { makeServer } from "./http/server.js";
import { makeDatabase } from "./infra/database/database.js";

const database = makeDatabase();

database
  .connect()
  .then(async () => {
    const server = makeServer();

    const address = await server.listen({ port: config.http.port });

    console.log(`Webserver listening at port: ${address}`);
  })
  .catch((error) => {
    console.error(error);

    process.exit(1);
  });
