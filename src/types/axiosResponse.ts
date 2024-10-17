export interface ApiResponse {
  success: boolean
  message: string
  user: {
    id: number
    name: string
    email: string
    role: 'USER' | 'ADMIN'
  }
}
