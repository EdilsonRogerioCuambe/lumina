'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import toast from 'react-hot-toast'

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O instituto deve ter no mínimo 3 caracteres' }),
})

export default function NameForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/admin/institutes', {
        ...values,
      })
      router.push(`/admin/institutes/list`)
      toast.success('Instituto criado com sucesso')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao criar o instituto')
    }
  }

  return (
    <div className="text-[#333333] max-w-7xl mx-auto flex items-center justify-center h-screen">
      <div>
        <h1 className="text-2xl">Nome do Instituto</h1>
        <p className="text-sm">
          Como o instituto é chamado? Não se preocupe, você pode mudar isso
          depois.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="ex: Instituto de Desenvolvimento Rural"
                      {...field}
                      disabled={isSubmitting}
                      className="border-2 rounded p-4 w-full"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.name?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button className="rounded" variant="outline">
                  Cancelar
                </Button>
              </Link>
              <Button
                className="rounded"
                variant="default"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Continuar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
