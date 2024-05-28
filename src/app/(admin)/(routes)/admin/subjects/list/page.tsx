import prisma from '@/database/db'
import { DataTable } from './_components/data.table'
import { columns } from './_components/columns'

export default async function Page() {
  const subjects = await prisma.subject.findMany({
    include: {
      course: true,
    },
  })

  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <DataTable columns={columns} data={subjects} />
    </div>
  )
}
