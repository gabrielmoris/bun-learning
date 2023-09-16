import { PrismaClient } from "@prisma/client";
import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";

// Way 1
// const prisma = new PrismaClient();

//way2
const setup = (app: Elysia) => app.decorate("db", new PrismaClient());

const app = new Elysia()
  .use(swagger({ path: "/v1/swagger" }))
  .use(setup)
  .group("/search", (app) => {
    return app
      .get("/", async ({ query, db }) => db.movie.findMany())
      .guard(
        {
          query: t.Object({
            q: t.String(),
          }),
        },
        (app) =>
          app
            .get("/movie", async ({ query, db }) =>
              db.movie.findMany({
                where: {
                  title: {
                    contains: query.q,
                  },
                },
              })
            )
            .get("/tv", async ({ query, db }) =>
              db.movie.findMany({
                where: {
                  title: {
                    contains: query.q,
                  },
                  type: "series",
                },
              })
            )
            .get("/person", async ({ query, db }) =>
              db.person.findMany({
                where: {
                  name: {
                    contains: query.q,
                  },
                },
              })
            )
            // .get("/company",async ({ query, db }) =>
            //   db.person.findMany({
            //     where: {
            //       company: {
            //         contains: query.q,
            //       },
            //     },
            //   })
            // )
            .get("/episode", async ({ query, db }) =>
              db.episode.findMany({
                where: {
                  title: {
                    contains: query.q,
                  },
                },
              })
            )
            .get("/review", async ({ query, db }) =>
              db.review.findMany({
                where: {
                  comment: {
                    contains: query.q,
                  },
                },
              })
            )
            .get("/award", async ({ query, db }) =>
              db.award.findMany({
                where: {
                  name: {
                    contains: query.q,
                  },
                },
              })
            )
      );
  })
  .group("/title/:id", (app) => {
    return app
      .get("/", async ({ params, db }) =>
        db.movie.findUnique({
          where: {
            id: parseInt(params.id, 10),
          },
        })
      )
      .get("/episodes", async ({ params, db }) =>
        db.movie.findMany({
          where: {
            id: parseInt(params.id, 10),
          },
        })
      )
      .get("/cast", async ({ params, db }) =>
        db.person.findMany({
          where: {
            movies: {
              some: {
                id: parseInt(params.id, 10),
              },
            },
          },
        })
      )
      .get("/reviews", async ({ params, db }) =>
        db.review.findUnique({
          where: {
            id: parseInt(params.id, 10),
          },
        })
      )
      .get("/awards", async ({ params, db }) =>
        db.award.findUnique({
          where: {
            id: parseInt(params.id, 10),
          },
        })
      );
  })
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}.
Swagger docummentation in:
http://${app.server?.hostname}:${app.server?.port}/v1/swagger`);
