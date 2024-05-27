import { NextResponse } from 'next/server'
import prisma from '@/database/db'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    const values = await request.json()

    if (!values) {
      return new NextResponse('No values provided', {
        status: 400,
      })
    }

    const course = await prisma.course.findUnique({
      where: {
        id,
      },
    })

    if (!course) {
      return new NextResponse('Course not found', {
        status: 404,
      })
    }

    const updatedCourse = await prisma.course.update({
      where: {
        id,
      },
      data: {
        ...values,
      },
    })

    return NextResponse.json(updatedCourse)
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, {
        status: 500,
      })
    }
    return new NextResponse('An error occurred', {
      status: 500,
    })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    const course = await prisma.course.findUnique({
      where: {
        id,
      },
    })

    if (!course) {
      return new NextResponse('Course not found', {
        status: 404,
      })
    }

    await prisma.course.delete({
      where: {
        id,
      },
    })

    return new NextResponse('Course deleted', {
      status: 200,
    })
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, {
        status: 500,
      })
    }
    return new NextResponse('An error occurred', {
      status: 500,
    })
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    const course = await prisma.course.findUnique({
      where: {
        id,
      },
    })

    if (!course) {
      return new NextResponse('Course not found', {
        status: 404,
      })
    }

    return NextResponse.json(course)
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, {
        status: 500,
      })
    }
    return new NextResponse('An error occurred', {
      status: 500,
    })
  }
}
