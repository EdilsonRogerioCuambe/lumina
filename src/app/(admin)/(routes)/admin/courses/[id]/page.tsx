import prisma from '@/database/db'
import { redirect } from 'next/navigation'
import EditCourseForm from './_components/edit.course.form'

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params

  const course = await prisma.course.findUnique({
    where: {
      id,
    },
  })

  const coordinators = await prisma.coordinator.findMany({
    include: {
      user: true,
    },
  })

  const institutes = await prisma.institute.findMany()

  if (!course) {
    redirect('/admin/courses')
  }

  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <EditCourseForm
        course={course}
        users={coordinators}
        institutes={institutes}
      />
    </div>
  )
}
