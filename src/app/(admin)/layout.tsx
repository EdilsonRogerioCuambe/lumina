'use client'
import { useState } from 'react'
import Navbar from '@/app/(admin)/_components/navbar'
import Sidebar from '@/app/(admin)/_components/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar open={isOpen} setOpen={setIsOpen} />
      <div className="flex flex-1">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  )
}
