import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import { EventResolver } from './resolvers/EventResolver.js'

export async function createGraphQLServer() {
  const schema = await buildSchema({
    resolvers: [EventResolver],
    emitSchemaFile: false,
  })

  const server = new ApolloServer({
    schema,
    context: (context) => context,
  })

  return server
}
