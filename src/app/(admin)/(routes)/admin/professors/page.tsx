import prisma from '@/database/db'
import { DataTable } from './_components/data.table'
import { columns } from './_components/columns'

export default async function Page() {
  const professors = await prisma.professor.findMany({
    include: {
      user: true,
      courses: true,
    },
  })

  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <DataTable columns={columns} data={professors} />
    </div>
  )
}
