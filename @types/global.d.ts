/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string
      role: 'ADMIN' | 'COORDINATOR' | 'PROFESSOR' | 'STUDENT'
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    id: string
    role: 'ADMIN' | 'COORDINATOR' | 'PROFESSOR' | 'STUDENT'
  }

  interface JWT {
    id: string
    role: 'ADMIN' | 'COORDINATOR' | 'PROFESSOR' | 'STUDENT'
  }
}
