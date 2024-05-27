import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/database/db'
import { generateCode } from '@/lib/generate.code'

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return new NextResponse('Todos os campos são obrigatórios', {
        status: 400,
      })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return new NextResponse('Email já está em uso', {
        status: 409,
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const date = new Date()
    const code = generateCode(date)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        code,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('An unexpected error occurred', { status: 500 })
  }
}
