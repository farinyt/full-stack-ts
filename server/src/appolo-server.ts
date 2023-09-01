import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import {
  ApolloServer,
  ExpressContext,
} from "apollo-server-express"
import * as express from "express"
import { Server } from "http"
import Db from "./db"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { loadSchemaSync } from "@graphql-tools/load"
import { addResolversToSchema } from "@graphql-tools/schema"
import { GRAPHQL_SCHEMA_PATH } from "./constants"
import resolvers from "./resolvers"
import {
  TwitterResolverContext,
} from "./resolvers"

const SCHEMA = loadSchemaSync(GRAPHQL_SCHEMA_PATH, {
  loaders: [new GraphQLFileLoader()],
})

export async function createApolloServer(
  db: Db,
  httpServer: Server,
  app: express.Application
): Promise<ApolloServer<ExpressContext>> {
  const server = new ApolloServer({
    schema: addResolversToSchema({
      schema: SCHEMA,
      resolvers,
    }),
    // _FA - the context is being set to a function so it's recreated on each call
    // rather than being a static thing that gets shared
    context: ():TwitterResolverContext => ({ db }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  })
  await server.start()
  server.applyMiddleware({ app })
  return server
}