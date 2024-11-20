export interface EventCardProps {
  id: string
  title: string
  description: string | null
  eventURL: string | null
  startDate: string
  endDate: string | null
  content: string | null
  ticketPrice: string | null
  categoryId: string | null
  location: string | null
  isPrivate: boolean | null
  isVenue: boolean
  isPaidEvent: boolean
  isSeatsLimited: boolean
  seats: string | null
  attendees: Attendees[]
  featuredImage: string
  organizer: {
    id: string
    name: string
    image: string | null
  }
}
interface Attendees {
  eventId: string
  userId: string
}
