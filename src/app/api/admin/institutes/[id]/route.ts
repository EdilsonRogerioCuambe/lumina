import generateInstituteCode from '@/lib/generate.institute.code'
import { NextResponse } from 'next/server'
import prisma from '@/database/db'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    const { name } = await request.json()

    if (!name) {
      throw new Error('Name is required')
    }

    const institute = await prisma.institute.findUnique({
      where: {
        id,
      },
    })

    if (!institute) {
      throw new Error('Institute not found')
    }

    const code = generateInstituteCode(name)

    const updatedInstitute = await prisma.institute.update({
      where: {
        id,
      },
      data: {
        name,
        code,
      },
    })

    return NextResponse.json(updatedInstitute)
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
    const { id } = params

    const institute = await prisma.institute.findUnique({
      where: {
        id,
      },
    })

    if (!institute) {
      throw new Error('Institute not found')
    }

    await prisma.institute.delete({
      where: {
        id,
      },
    })

    return new NextResponse('Institute deleted successfully')
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
    const { id } = params

    const institute = await prisma.institute.findUnique({
      where: {
        id,
      },
    })

    if (!institute) {
      throw new Error('Institute not found')
    }

    return NextResponse.json(institute)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('An error occurred', { status: 500 })
  }
}
