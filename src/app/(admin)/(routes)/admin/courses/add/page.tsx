import prisma from '@/database/db'
import AddCoursePage from './_components/add.course.form'

export default async function Page() {
  const coordinators = await prisma.coordinator.findMany({
    include: {
      user: true,
    },
  })

  const institutes = await prisma.institute.findMany()

  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <AddCoursePage users={coordinators} institutes={institutes} />
    </div>
  )
}
