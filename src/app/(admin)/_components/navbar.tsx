'use client'
import * as React from 'react'
import Link from 'next/link'
import { UserCircle, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import logo from '@/assets/lumina.png'

interface NavbarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function Navbar({ open, setOpen }: NavbarProps) {
  const { data: session } = useSession()

  return (
    <nav className="bg-white w-full border-b fixed top-0 z-50">
      <div className="flex items-center justify-between px-4 mx-auto md:px-8">
        <Link href="/" className="flex items-center py-3 md:py-5">
          <Image src={logo} alt="Lumina" width={40} height={40} />
          <span className="ml-2 text-xl font-bold text-yellow-600">Lumina</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(!open)}
              className="flex items-center"
            >
              {session &&
              session.user &&
              session.user.image &&
              session.user.name ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <UserCircle className="w-8 h-8 text-gray-700" />
              )}
            </Button>
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-20">
                {session && session.user && (
                  <p className="px-4 py-2 text-sm text-[#333333]">
                    {session.user.name}
                  </p>
                )}
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Perfil
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Configurações
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sair
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden">
          <Button
            onClick={() => setOpen(!open)}
            className="bg-[#333333] text-[#f5f5f5] hover:bg-[#202024]"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>
    </nav>
  )
}
