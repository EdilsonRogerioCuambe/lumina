'use client'
import { Professor, User, Course } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

interface ProfessorWithUserWithCourses extends Professor {
  user: User | null
  courses: Course[]
}

export const columns: ColumnDef<ProfessorWithUserWithCourses>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'user',
    header: 'Professor',
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
