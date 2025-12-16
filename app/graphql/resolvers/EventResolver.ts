import { Resolver, Query, Arg, Ctx } from 'type-graphql'
import { Event } from '../types/Event.js'
import SavedEvent from '#models/event'
import mongoose from 'mongoose'

@Resolver(Event)
export class EventResolver {
  @Query(() => [Event])
  public async myEvents(
    @Arg('month', { nullable: true }) month?: number,
    @Arg('year', { nullable: true }) year?: number,
    @Ctx() context?: any
  ): Promise<Event[]> {
    const userId = new mongoose.Types.ObjectId(context.contextValue.user.userId)
    let query: any = { userId }
    
    if (month && !year) {
      query.$expr = { $eq: [{ $month: '$date' }, month] }
    } else if (year && !month) {
      query.date = { $gte: new Date(year, 0, 1), $lte: new Date(year, 11, 31, 23, 59, 59, 999) }
    } else if (month && year) {
      query.date = {
        $gte: new Date(year, month - 1, 1),
        $lte: new Date(year, month, 0, 23, 59, 59, 999),
      }
    }

    console.log('Query:', query)

    const events = await SavedEvent.find(query)
    return events.map((event) => ({
      id: event._id.toString(),
      title: event.title,
      date: event.date,
      place: event.place,
      notes: event.notes,
      userId: event.userId.toString(),
    }))
  }
}
