import { NextResponse } from 'next/server'
import { generateCode } from '@/lib/generate.code'
import prisma from '@/database/db'
import bcrypt from 'bcryptjs'
import { sendMail } from '@/lib/nodemailer'

export async function POST(request: Request) {
  try {
    const {
      email,
      password,
      name,
      birthdate,
      gender,
      address,
      role,
      zip,
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
        state,
        country,
        role,
        phone,
        code,
        cpf,
      },
    })

    if (role === 'STUDENT') {
      await prisma.student.create({
        data: {
          userId: user.id,
        },
      })
    } else if (role === 'PROFESSOR') {
      await prisma.professor.create({
        data: {
          userId: user.id,
        },
      })
    }

    const emailSubject = 'Bem-vindo ao nosso sistema!'
    const emailHtml = `
      <div style="background-color: #f5f5f5; padding: 20px; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #333333; padding: 20px; border-radius: 10px;">
          <h2 style="color: #f5f5f5;">Bem-vindo ao nosso sistema!</h2>
          <p style="color: #333333;">
            Olá ${name},
          </p>
          <p style="color: #333333;">
            Seu cadastro foi realizado com sucesso. Você já pode entrar no sistema utilizando seu email e senha.
          </p>
          <p style="color: #333333;">
            Obrigado!
          </p>
        </div>
      </div>
    `

    await sendMail(email, emailSubject, emailHtml)

    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('An unexpected error occurred', { status: 500 })
  }
}
