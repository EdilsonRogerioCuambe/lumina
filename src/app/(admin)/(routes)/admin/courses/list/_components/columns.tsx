'use client'
import { Course, Coordinator, Institute, User } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'

interface CourseWithCoordinatorWithInstitute extends Course {
  coordinator: Coordinator & { user: User | null }
  institute: Institute
}

export const columns: ColumnDef<CourseWithCoordinatorWithInstitute>[] = [
  {
    accessorKey: 'code',
    header: 'Código',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'coordinator',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Coordenador
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { user } = row.original.coordinator

      if (user && user.name) {
        return <span>{user.name}</span>
      }
    },
  },
  {
    accessorKey: 'institute',
    header: 'Instituto',
    cell: ({ row }) => {
      const { name } = row.original.institute

      return <span>{name}</span>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original

      const handleDelete = async () => {
        try {
          await axios.delete(`/api/admin/courses/${id}`)
          toast.success('Instituto excluído com sucesso')
          window.location.reload()
        } catch (error) {
          console.error(error)
          toast.error('Erro ao excluir instituto')
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="text-[#333333] bg-[#333333] rounded-md shadow-lg"
            align="end"
          >
            <Link href={`/admin/courses/${id}`} passHref>
              <DropdownMenuItem className="text-[#f5f5f5] bg-[#333333] flex items-center px-4 py-2 rounded">
                <Pencil className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="text-red-400 cursor-pointer bg-[#333333] flex items-center px-4 py-2 rounded"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4 mr-2" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
