# Elysia with Bun runtime

## Getting Started

To get started with this template, simply paste this command into your terminal:

```bash
bun create elysia ./elysia-example
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

# Prisma Bun Databases

after installing it `bun add prisma`, I start de tatabase wit the command `bunx prisma init --datasource-provider mysql`

Then I make a DB in app.planetscale.com and create a database that Ill put in .env
After I creathe the models in /prisma/schema.prisma I run `bunx prisma migrate dev -- init`
