import { NextResponse } from 'next/server'
import prisma from '@/database/db'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
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

    if (existingSubject && existingSubject.id !== params.id) {
      return new NextResponse('Disciplina já cadastrada', { status: 409 })
    }

    const subject = await prisma.subject.update({
      where: { id: params.id },
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.subject.delete({
      where: { id: params.id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('An error occurred', { status: 500 })
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const subject = await prisma.subject.findUnique({
      where: { id: params.id },
      include: {
        course: true,
        professor: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!subject) {
      return new NextResponse('Disciplina não encontrada', { status: 404 })
    }

    return NextResponse.json(subject)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('An error occurred', { status: 500 })
  }
}
