import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/database/db'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { Role } from '@prisma/client'

export const auth: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          throw new Error('No user found with the email')
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        )
        if (!isValidPassword) {
          throw new Error('Invalid password')
        }

        return user
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role as Role
      }
      return token
    },
    async session({ session, token }) {
      if (token && typeof token.id === 'string' && token.role) {
        if (session.user) {
          session.user.id = token.id
          session.user.role = token.role as Role
        }
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
}
