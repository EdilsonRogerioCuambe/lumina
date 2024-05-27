import { auth } from '@/lib/auth.config'
import NextAuth from 'next-auth'

const handler = NextAuth(auth)

export { handler as GET, handler as POST }
