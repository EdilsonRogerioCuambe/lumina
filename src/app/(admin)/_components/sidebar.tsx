'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Menu,
  Users,
  BookOpen,
  Building,
  ChevronDown,
  ChevronUp,
  UserCheck,
  User,
  ClipboardList,
  Calendar,
  ListChecks,
  Clipboard,
  LogOut,
} from 'lucide-react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

interface MenuItem {
  title: string
  path: string
  icon: JSX.Element
  sublinks?: { title: string; path: string }[]
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)
  const pathname = usePathname()

  const handleSubMenuToggle = (title: string) => {
    if (openSubMenu === title) {
      setOpenSubMenu(null)
    } else {
      setOpenSubMenu(title)
    }
  }

  const menus: MenuItem[] = [
    { title: 'Dashboard', path: '/admin', icon: <Menu /> },
    {
      title: 'Usuários',
      path: '/admin/users',
      icon: <Users />,
      sublinks: [
        { title: 'Lista de Usuários', path: '/admin/users/list' },
        { title: 'Adicionar Usuário', path: '/admin/users/add' },
      ],
    },
    {
      title: 'Institutos',
      path: '/admin/institutes',
      icon: <Building />,
      sublinks: [
        { title: 'Lista de Institutos', path: '/admin/institutes/list' },
        { title: 'Adicionar Instituto', path: '/admin/institutes/add' },
      ],
    },
    {
      title: 'Cursos',
      path: '/admin/courses',
      icon: <BookOpen />,
      sublinks: [
        { title: 'Lista de Cursos', path: '/admin/courses/list' },
        { title: 'Adicionar Curso', path: '/admin/courses/add' },
      ],
    },
    {
      title: 'Coordenadores',
      path: '/admin/coordinators',
      icon: <UserCheck />,
    },
    {
      title: 'Professores',
      path: '/admin/professors',
      icon: <User />,
    },
    {
      title: 'Estudantes',
      path: '/admin/students',
      icon: <ClipboardList />,
    },
    {
      title: 'Disciplinas',
      path: '/admin/subjects',
      icon: <Clipboard />,
      sublinks: [
        { title: 'Lista de Disciplinas', path: '/admin/subjects/list' },
        { title: 'Adicionar Disciplina', path: '/admin/subjects/add' },
      ],
    },
    {
      title: 'Turmas',
      path: '/admin/classes',
      icon: <Calendar />,
    },
    {
      title: 'Horários',
      path: '/admin/schedules',
      icon: <Calendar />,
    },
    {
      title: 'Notas',
      path: '/admin/grades',
      icon: <ListChecks />,
    },
    {
      title: 'Presenças',
      path: '/admin/attendances',
      icon: <Clipboard />,
    },
  ]

  return (
    <div className="w-64">
      <div
        className={`fixed inset-y-0 left-0 top-16 bg-white min-h-screen z-50 w-64 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <ul className="space-y-2 p-4">
          {menus.map((menu, index) => (
            <li key={index} className="text-[#333333]">
              <div
                className={`flex items-center justify-between hover:bg-[#202024] hover:text-[#f5f5f5] rounded-md p-2 transition-all duration-300 ease-in-out ${pathname === menu.path ? 'text-[#f5f5f5] bg-[#333333] rounded px-2' : ''}`}
              >
                <Link href={menu.path} className="flex items-center">
                  {menu.icon}
                  <span className="ml-3">{menu.title}</span>
                </Link>
                {menu.sublinks && (
                  <button
                    type="button"
                    onClick={() => handleSubMenuToggle(menu.title)}
                    className="focus:outline-none"
                  >
                    {openSubMenu === menu.title ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </button>
                )}
              </div>
              {menu.sublinks && openSubMenu === menu.title && (
                <ul className="pl-8 space-y-2">
                  {menu.sublinks.map((sublink, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        href={sublink.path}
                        className={`block py-1 transition-all duration-300 ease-in-out hover:bg-[#202024] rounded px-2 hover:text-[#f5f5f5] ${pathname === sublink.path ? 'text-[#f5f5f5] bg-[#333333] rounded px-2' : ''}`}
                      >
                        {sublink.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="absolute bottom-0 w-full bg-white p-4">
          <button
            type="button"
            onClick={() => signOut()}
            className="flex items-center p-2 space-x-2 text-red-600 hover:text-red-800"
          >
            <LogOut />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </div>
  )
}
