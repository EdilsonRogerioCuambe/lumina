import { NextResponse } from 'next/server'
import { generateCode } from '@/lib/generate.code'
import prisma from '@/database/db'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const {
      email,
      password,
      name,
      birthdate,
      gender,
      address,
      zip,
      role,
      city,
      state,
      country,
      phone,
      cpf,
    } = await request.json()

    if (
      !email ||
      !password ||
      !name ||
      !birthdate ||
      !gender ||
      !address ||
      !zip ||
      !city ||
      !state ||
      !state ||
      !country ||
      !phone ||
      !cpf
    ) {
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

    const code = generateCode(new Date())

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        birthdate,
        gender,
        address,
        zip,
        city,
        role,
        state,
        country,
        phone,
        code,
        cpf,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('An unexpected error occurred', { status: 500 })
  }
}
