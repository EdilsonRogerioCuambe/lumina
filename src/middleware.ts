import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return !!token
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
})

export const config = {
  matcher: [
    '/admin/:path*',
    '/coordinator/:path*',
    '/student/:path*',
    '/teacher/:path*',
  ],
}
