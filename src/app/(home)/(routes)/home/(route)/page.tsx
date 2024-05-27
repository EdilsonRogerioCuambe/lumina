'use client'
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import logo from '@/assets/lumina.png'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-[#333333] to-[#111111] p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center text-white"
      >
        <Image
          src={logo}
          alt="University Logo"
          width={150}
          height={150}
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold mb-4">Bem-vindo à Lumina!</h1>
        <p className="text-xl mb-4">
          Lumina é uma universidade dedicada à excelência acadêmica e à
          inovação. Nossa missão é formar líderes que façam a diferença no
          mundo.
        </p>
        <p className="text-xl mb-8">
          Por favor, faça login ou registre-se para continuar.
        </p>
        <div className="flex space-x-4 justify-center">
          <Link
            href="/auth/signin"
            className="flex items-center justify-center bg-white text-blue-500 hover:bg-gray-100 font-bold py-2 px-4 rounded shadow-lg transform transition-transform duration-200 hover:scale-105"
          >
            <FaSignInAlt className="mr-2" /> Login
          </Link>
          <Link
            href="/auth/signup"
            className="flex items-center justify-center bg-white text-purple-600 hover:bg-gray-100 font-bold py-2 px-4 rounded shadow-lg transform transition-transform duration-200 hover:scale-105"
          >
            <FaUserPlus className="mr-2" /> Registrar
          </Link>
        </div>
      </motion.div>
      <div className="absolute bottom-0 text-white left-0 right-0 h-20 flex items-center justify-center">
        <p>
          &copy;
          {new Date().getFullYear()}
          Lumina. Todos os direitos reservados.
        </p>
      </div>
    </main>
  )
}
