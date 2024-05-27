import prisma from '@/database/db'
import { redirect } from 'next/navigation'
import EditUserForm from './_components/edit.form'

export default async function Page({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  })

  if (!user) {
    return redirect('/admin/users')
  }

  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <EditUserForm user={user} />
    </div>
  )
}
