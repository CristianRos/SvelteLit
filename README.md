# SvelteLit is a DX focused stack for building web apps

SvelteLit is carefully crafted to provide a solid base for building web apps with a focus on DX, with top grade tools and best practices.

## The stack

- SvelteKit with runes mode
- Hono
- Drizzle ORM
- Zod
- Better Auth
- Vitest

## Niceties

- TailwindCSS (Maybe a controversial take but I like mixing pure css with tailwind it feels natural to me but you can always opt-out and use whatever you want)
- [Tanstack Query](https://tanstack.com/query/latest/docs/framework/svelte/overview) with Svelte Query Devtools
- Prettier
- ESLint
- Husky
- OpenAPI Docs with [Scalar](https://scalar.com/) and hono-zod-openapi
- Pino logger
- Stocker by [@w3cj](https://github.com/w3cj) for hono helpers and utils

## Features

- e2e type safety with drizzle-zod and hono rpc's
  - Drizzle schemas are transformed into Zod schemas with drizzle-zod
  - Generate types based on the schemas
  - hono-zod-openapi is used to validate those schemas
  - Hono Client can be used to call those rpc's with type safety
- Tanstack Query provides a powerful way to fetch data and handle caching, optimistic updates...
  - Svelte Query Devtools is awesome for debugging
  - QueryClient lives in the main layout.ts and layout.svelte
  - page.ts can be used to prefetch data
  - Now you can use the queryClient in any component
  - Clear flow of data from the server to the client
  - I recommend having a service layer for queries, mutations and prefetches, it allows you to replicate Hono RPC behaviour by using a similar API e.g. tasksService.qry.get()
  - You can also use the queryClient in the service layer to create a custom hook for your own needs
- FSD architecture (Feature slice design)
  - Clear dependency flow between layers, explicitness, robustness and oriented towards the business logic
  - Learn more about it here: https://feature-sliced.design
  - \_infra: contains all the infrastructure code, e.g. backend, database... In a lax way, allowing you to be flexible with imports in edge cases that needs stuff like schema imports in drizzle so the db knows about relations. This can also be called by these layers in a loose way, without too much hustle but be careful with circular imports
  - \_infra is a custom one, other folders follow the FSD architecture: https://feature-sliced.design/docs/get-started/overview#layers
- Fully documented API with Scalar and hono-zod-openapi, this was made following [@w3cj](https://github.com/w3cj) Hono setup videos he made on the [Syntax youtube channel](https://www.youtube.com/@syntaxfm)
  - [You Should Use Hono in your Next Project](https://www.youtube.com/watch?v=sYZW8TK2IV4)
  - [Build a documented / type-safe API with hono, drizzle, zod, OpenAPI and scalar](https://www.youtube.com/watch?v=sNh9PoM9sUE)

## Intended workflow

- Think about your app as a series of features, user stories, use cases, etc.
- Let's divide the app in kind of lego blocks that can be used to build the app
- Entities are the shape of these blocks, e.g. tasks, posts, etc.
- Features are the actions that can be performed on these entities, what the user can do, e.g. create a task, like a post, etc.
- Widgets are the basic reusable pieces that encompass a set of features, e.g. a task list, a header with auth buttons, etc.
- Pages are 1 to 1 standard svelte routes and are composed lower layers, e.g. the home page, the login page, etc.
- Knowing the app structure, you can start building but you will probably need to interact with the database and the api
- \_infra and it's role is to provide the backend and the database access but also collect routes, handlers and schemas
- With that said, usually the features layer will have an api and model folders providing these stuff to upper layers and themselves
- Tanstack Query acts as an intermediary between the backend api and the frontend, that's where the service folder comes in, inside the api folder
- In your frontend you now can access `tasksService.qry.get()` as a way to fetch the tasks from the Hono's RPC, this can be done with posts or whatever you need.

### How services are provided

- There is a barrel index.ts file serving a single object to make a fluent interface.
- This object provides `.qry`, `.mut`, and `.pre` (Queries, Mutations and Prefetches)
- These are defined in their own file `tasks.qry.ts`, `tasks.mut.ts`, `tasks.pre.ts`, with and additional `_def.ts` file for related or duplicated stuff like tags and duplicated options
- With these you can access your data by using:
  - `tasksService.qry.get()`
  - `tasksServices.qry.getById({id})`
  - or modify(mutate) it with `const createMut = tasksService.mut.create()` and `createMut.mutate({...taskData})` which actually modifies the cached tanstack query data you you created.
  - You can only mutate existing queries!!!
- These services are fully tied to tanstack query as convention, you can make your own queries, mutation and prefetches in services or outside if you want to handle an edge case
- You can always opt-out and don't use the tanstack query services by calling the backend endpoint or the database directly for a granular transaction, this might be useful in some scenarios
  - In this case Hono RPC provides a fluent interface too e.g. `api.tasks.$get()` will call a GET endpoint for the /api/tasks route
  - If you want to do a specific query, you can access the drizzle db instance provided in `_infra/database/api/db.ts` but remember to always validate everything with zod!!!
- Everything except database direct usage is fully typesafe. Be aware of this but generally speaking the compiler will always complain to you if something is wrong.
