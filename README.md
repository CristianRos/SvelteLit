## SvelteLit is a DX focused stack for building web apps
SvelteLit is carefully crafted to provide a solid base for building web apps with a focus on DX, with top grade tools and best practices.

### The stack
- SvelteKit with runes mode
- Hono
- Drizzle ORM
- Zod
- Better Auth
- Vitest

### Niceties
- TailwindCSS (Maybe controversial but mixing pure css with tailwind feels natural, you can always opt out and use whatever you want)
- Tanstack Query with Svelte Query Devtools
- Prettier
- ESLint
- Husky
- OpenAPI Docs with Scalar and hono-zod-openapi
- Pino logger
- Stocker by @w3cj for hono helpers and utils

### Features
- e2e type safety with drizzle-zod and hono rpc's
    - Drizzle schemas are transformed into Zod schemas with drizzle-zod
    - Generate types based on the schemas
    - hono-zod-openapi is used to validate those schemas
    - Hono Client can be used to call those rpc's with type safety
- Tanstack Query provides a powerful way to fetch data and handle caching, optimistic updates...
    - Svelte Query Devtools is awesome for debugging
    - QueryClient lives in the main layout.ts and layout.svelte
    - page.ts can be use to prefetch data
    - Now you can use the queryClient in any component
    - Clear flow of data from the server to the client
    - I recommend having a service layer for queries, mutations and prefetches, it allows you to replicate Hono RPC behaviour by using a similar API e.g. tasksService.qry.get()
    - You can also use the queryClient in the service layer to create a custom hook for your own needs
- FSD architecture (Feature slice design)
    - Clear dependency flow between layers, explicitness, robustness and oriented towards the business logic
    - Learn more about it here: https://feature-sliced.design
    - _infra: contains all the infrastructure code, e.g. backend, database... In a lax way, allowing you to be flexible with imports in edge cases that needs stuff like schema imports in drizzle so the db knows about relations. This can also be called by these layers in a loose way, without too much hustle but be careful with circular imports
    - _infra is a custom one, other folders follow the FSD architecture: https://feature-sliced.design/docs/get-started/overview#layers

### Intended workflow
- Think about your app as a series of features, user stories, use cases, etc.
- Let's divide the app in kind of lego blocks that can be used to build the app
- Entities are the shape of these blocks, e.g. tasks, posts, etc.
- Features are the actions that can be performed on these entities, what the user can do, e.g. create a task, like a post, etc.
- Widgets are the basic reusable pieces that encompass a set of features, e.g. a task list, a header with auth buttons, etc.
- Pages are 1 to 1 standard svelte routes and are composed lower layers, e.g. the home page, the login page, etc.
- Knowing the app structure, you can start building but you will probably need to interact with the database and the api
- _infra and it's role is to provide the backend and the database access but also collect routes, handlers and schemas
- With that said, usually the features layer will have an api and model folders providing these stuff to upper layers and themselves
- Tanstack Query acts as an intermediary between the backend api and the frontend, that's where the service folder comes in, inside the api folder
