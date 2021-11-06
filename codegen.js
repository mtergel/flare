module.exports = {
  schema: [
    {
      "https://flare.hasura.app/v1/graphql": {
        headers: {
          "x-hasura-admin-secret": process.env.AUTH_TOKEN,
        },
      },
    },
  ],
  documents: ["./src/graphql/**/*.graphql"],
  overwrite: true,
  generates: {
    "./src/graphql/generated/graphql.tsx": {
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
