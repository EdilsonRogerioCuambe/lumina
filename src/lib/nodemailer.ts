import nodemailer, { Transporter } from 'nodemailer'

interface MailOptions {
  from: string
  to: string
  subject: string
  html: string
}

const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL as string,
    pass: process.env.PASSWORD as string,
  },
})

export const sendMail = async (
  to: string,
  subject: string,
  html: string,
): Promise<void> => {
  try {
    const mailOptions: MailOptions = {
      from: process.env.EMAIL as string,
      to,
      subject,
      html,
    }

    await transporter.sendMail(mailOptions)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
