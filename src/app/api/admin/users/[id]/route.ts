import { NextResponse } from 'next/server'
import prisma from '@/database/db'
import bcrypt from 'bcryptjs'

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

    if (values.password) {
      values.password = await bcrypt.hash(values.password, 10)
    }

    delete values.confirmPassword

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...values,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
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

    await prisma.user.delete({
      where: { id },
    })

    return new NextResponse('User deleted', {
      status: 200,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
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

    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return new NextResponse('User not found', {
        status: 404,
      })
    }

    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new NextResponse(error.message, {
        status: 500,
      })
    }
    return new NextResponse('An error occurred', {
      status: 500,
    })
  }
}
