import prisma from '@/database/db'
import AddSubjectForm from './_components/add.subject.form'

export default async function Page() {
  const professors = await prisma.professor.findMany({
    include: {
      user: true,
    },
  })

  const courses = await prisma.course.findMany()

  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <AddSubjectForm courses={courses} professors={professors} />
    </div>
  )
}
