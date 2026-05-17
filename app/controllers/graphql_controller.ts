import type { HttpContext } from '@adonisjs/core/http'
import { createGraphQLServer } from '#graphql/server'

export default class GraphqlController {
  public async handle({ request, response }: HttpContext) {
    try {
      const server = await createGraphQLServer()
      const { query, variables } = request.body()
      const user = (request as any).user

      const result = await server.executeOperation({ query, variables }, { contextValue: { user } } as any)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({
        errors: [{ message: error.message }],
      })
    }
  }
}
