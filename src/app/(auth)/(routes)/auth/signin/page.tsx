'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import logo from '@/assets/lumina.png'
import Image from 'next/image'
import Link from 'next/link'

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        toast.error(result.error)
      } else if (result?.ok) {
        const response = await fetch('/api/auth/session')
        const session = await response.json()

        if (session?.user?.role) {
          switch (session.user.role) {
            case 'ADMIN':
              router.push('/admin')
              break
            case 'COORDINATOR':
              router.push('/coordinator')
              break
            case 'PROFESSOR':
              router.push('/professor')
              break
            case 'STUDENT':
              router.push('/student')
              break
            default:
              router.push('/')
              break
          }
        } else {
          setError('Failed to retrieve user role')
        }
      } else {
        setError('Failed to sign in')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="mb-8">
          <Image
            src={logo}
            alt="Lumina"
            width={100}
            height={100}
            className="mx-auto"
          />
        </div>
        <h1 className="text-2xl text-center font-bold mb-4">
          Seja bem-vindo de volta!
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-[#333333] text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-[#333333] text-sm font-bold mb-2"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#202024] transition-all duration-300 ease-in-out hover:bg-[#121214] text-[#f5f5f5] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Entrar
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/auth/signup"
              className="text-[#202024] hover:underline"
            >
              Não possui uma conta? Registre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
