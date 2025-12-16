import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class Event {
  @Field(() => ID)
  id!: string

  @Field()
  title!: string

  @Field()
  date!: Date

  @Field({ nullable: true })
  place?: string

  @Field({ nullable: true })
  notes?: string

  @Field()
  userId!: string
}