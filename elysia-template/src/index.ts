import { Elysia, t } from "elysia";

const app = new Elysia()
  .group("/search", (app) => {
    return app.guard(
      {
        query: t.Object({
          q: t.String(),
        }),
      },
      (app) =>
        app
          .get("/", ({ query }) => `query: ${query.q}`)
          .get("/movie", ({ query }) => `query: ${query.q}`)
          .get("/tv", ({ query }) => `query: ${query.q}`)
          .get("/person", ({ query }) => `query: ${query.q}`)
          .get("/company", ({ query }) => `query: ${query.q}`)
          .get("/episode", ({ query }) => `query: ${query.q}`)
          .get("/review", ({ query }) => `query: ${query.q}`)
          .get("/award", ({ query }) => `query: ${query.q}`)
    );
  })
  .group("/title/:id", (app) => {
    return app
      .get("/", ({ params }) => params.id)
      .get("/episodes", ({ params }) => params.id)
      .get("/cast", ({ params }) => params.id)
      .get("/reviews", ({ params }) => params.id)
      .get("/awards", ({ params }) => params.id);
  })
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
