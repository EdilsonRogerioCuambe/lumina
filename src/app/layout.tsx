import type { Metadata } from 'next'
import { Source_Code_Pro as SourceCode } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import Providers from '@/providers/providers'

const code = SourceCode({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lumina - Universidade Lumina',
  description: 'Venha estudar na melhor universidade do Brasil!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <html lang="pt">
        <body className={`bg-[#f5f5f5] text-[#333333] ${code.className}`}>
          {children}
          <Toaster />
        </body>
      </html>
    </Providers>
  )
}
