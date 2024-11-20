export type UserType =
  | {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  | undefined