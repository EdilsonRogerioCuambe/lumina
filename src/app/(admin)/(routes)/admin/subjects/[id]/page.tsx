import prisma from '@/database/db'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const subject = await prisma.subject.findUnique({
    where: {
      id: params.id,
    },
    include: {
      course: true,
    },
  })

  if (!subject) {
    redirect('/admin/subjects')
  }

  return (
    <div>
      <h1>{subject.name}</h1>
    </div>
  )
}
