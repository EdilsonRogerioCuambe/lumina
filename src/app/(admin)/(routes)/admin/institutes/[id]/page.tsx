import prisma from '@/database/db'
import NameForm from './_components/name.form'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const institute = await prisma.institute.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!institute) {
    redirect('/admin/institutes')
  }

  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <NameForm initialData={institute} id={params.id} />
    </div>
  )
}
