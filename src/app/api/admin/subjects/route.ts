import { NextResponse } from 'next/server'
import prisma from '@/database/db'

export async function POST(request: Request) {
  try {
    const { name, code, courseId, professorId, workload, semester } =
      await request.json()

    if (!name || !code || !courseId || !professorId || !workload || !semester) {
      return new NextResponse('Todos os campos são obrigatórios', {
        status: 400,
      })
    }

    const existingSubject = await prisma.subject.findUnique({
      where: { code },
    })

    if (existingSubject) {
      return new NextResponse('Disciplina já cadastrada', { status: 409 })
    }

    const subject = await prisma.subject.create({
      data: {
        name,
        code,
        courseId,
        professorId,
        workload,
        semester,
      },
    })

    return NextResponse.json(subject)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('An error occurred', { status: 500 })
  }
}
