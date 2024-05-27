import prisma from '@/database/db'
import { NextResponse } from 'next/server'
import generateInstituteCode from '@/lib/generate.institute.code'

export async function POST(request: Request) {
  try {
    const { name } = await request.json()

    if (!name) {
      return new Response('Name is required', { status: 400 })
    }

    const code = generateInstituteCode(name)

    const institute = await prisma.institute.create({
      data: {
        name,
        code,
      },
    })

    return NextResponse.json(institute)
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
    const institutes = await prisma.institute.findMany()

    return NextResponse.json(institutes)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('An error occurred', { status: 500 })
  }
}
