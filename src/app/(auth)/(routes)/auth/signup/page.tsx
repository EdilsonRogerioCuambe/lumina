'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import logo from '@/assets/lumina.png'
import Image from 'next/image'
import Link from 'next/link'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })
  const router = useRouter()

  useEffect(() => {
    const length = password.length >= 8
    const uppercase = /[A-Z]/.test(password)
    const lowercase = /[a-z]/.test(password)
    const number = /[0-9]/.test(password)
    const special = /[!@#$%^&*]/.test(password)

    setPasswordRequirements({
      length,
      uppercase,
      lowercase,
      number,
      special,
    })
  }, [password])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!email || !password || !name || !confirmPassword) {
      setError('Todos os campos são obrigatórios')
      toast.error('Todos os campos são obrigatórios')
      return
    }

    if (password !== confirmPassword) {
      setError('Senhas não conferem')
      toast.error('Senhas não conferem')
      return
    }

    const { length, uppercase, lowercase, number, special } =
      passwordRequirements
    if (!length || !uppercase || !lowercase || !number || !special) {
      setError('Senha não atende aos requisitos')
      toast.error('Senha não atende aos requisitos')
      return
    }

    try {
      const response = await axios.post('/api/auth/signup', {
        email,
        password,
        name,
      })

      if (response.status === 201) {
        toast.success('Account created successfully!')
        router.push('/auth/signin')
      } else {
        toast.error(response.data.message || 'Falha ao criar conta')
      }
    } catch (error) {
      toast.error('Um erro inesperado ocorreu')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          <Image src={logo} alt="Lumina" width={100} height={100} />
        </div>
        <h1 className="text-2xl text-center font-bold mb-4">Crie sua conta</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-[#333333] text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome completo"
              required
              className="w-full px-3 py-2 border border-[#333333] rounded"
            />
          </div>
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
              placeholder="Digite seu email"
              required
              className="w-full px-3 py-2 border border-[#333333] rounded"
            />
          </div>
          <div className="mb-4">
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
              placeholder="Digite sua senha"
              required
              className="w-full px-3 py-2 border border-[#333333] rounded"
            />
            <ul className="text-sm mt-2">
              <li
                className={
                  passwordRequirements.length
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                Pelo menos 8 caracteres
              </li>
              <li
                className={
                  passwordRequirements.uppercase
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                Pelo menos uma letra maiúscula
              </li>
              <li
                className={
                  passwordRequirements.lowercase
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                Pelo menos uma letra minúscula
              </li>
              <li
                className={
                  passwordRequirements.number
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                Pelo menos um número
              </li>
              <li
                className={
                  passwordRequirements.special
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                Pelo menos um caractere especial (!@#$%^&*)
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar senha"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#202024] hover:bg-[#121214] text-[#f5f5f5] transition-all duration-300 ease-in-out font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Registrar
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/auth/signin"
              className="text-[#202024] hover:underline"
            >
              Já possui uma conta? Faça login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
