'use client'
import { Coordinator, User, Course } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

interface CoordinatorWithUserWithCourses extends Coordinator {
  user: User | null
  courses: Course[]
}

export const columns: ColumnDef<CoordinatorWithUserWithCourses>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'user',
    header: 'Coordenador',
    cell: ({ row }) => {
      const user = row.original.user
      return <span>{user ? user.name : 'Desconhecido'}</span>
    },
  },
  {
    accessorKey: 'courses',
    header: 'Cursos',
    cell: ({ row }) => {
      const courses = row.original.courses
      return (
        <span>
          {courses.length > 0
            ? courses.map((course) => course.name).join(', ')
            : 'Nenhum curso'}
        </span>
      )
    },
  },
]
