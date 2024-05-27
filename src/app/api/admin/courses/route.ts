import { NextResponse } from 'next/server'
import prisma from '@/database/db'

export async function POST(request: Request) {
  try {
    const { name, code, coordinatorId, instituteId } = await request.json()

    if (!name || !code || !coordinatorId || !instituteId) {
      return new Response('Missing required fields', { status: 400 })
    }

    const coordinatorExists = await prisma.coordinator.findUnique({
      where: {
        id: coordinatorId,
      },
    })

    if (!coordinatorExists) {
      return new Response('Coordinator not found', { status: 404 })
    }

    const instituteExists = await prisma.institute.findUnique({
      where: {
        id: instituteId,
      },
    })

    if (!instituteExists) {
      return new Response('Institute not found', { status: 404 })
    }

    const course = await prisma.course.create({
      data: {
        name,
        code,
        coordinator: {
          connect: {
            id: coordinatorId,
          },
        },
        institute: {
          connect: {
            id: instituteId,
          },
        },
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new Response(error.message, { status: 500 })
    }
    return new Response('An error occurred', { status: 500 })
  }
}

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        coordinator: {
          include: {
            user: true,
          },
        },
        institute: true,
      },
    })

    return NextResponse.json(courses)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new Response(error.message, { status: 500 })
    }
    return new Response('An error occurred', { status: 500 })
  }
}
