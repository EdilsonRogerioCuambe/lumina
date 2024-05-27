'use client'

import * as z from 'zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { PenIcon } from 'lucide-react'
import { useState } from 'react'
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

interface Props {
  initialData: {
    name: string
  }
  id: string
}

const formSchema = z.object({
  name: z.string().min(3, { message: 'Nome muito curto' }),
})

export default function NameForm({ initialData, id }: Props) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  const toggleEditing = () => setIsEditing((prev) => !prev)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/admin/institutes/${id}`, values)
      toast.success('Nome atualizado com sucesso')
      toggleEditing()
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao atualizar nome')
    }
  }

  return (
    <>
      <div className="mt-6 rounded bg-[#f5f5f5] p-4">
        <div className="font-medium flex items-center justify-between">
          Nome do Instituto
          <Button variant="ghost" onClick={toggleEditing}>
            {isEditing ? (
              <>
                <span className="mr-2">Cancelar</span>
              </>
            ) : (
              <>
                <PenIcon className="h-4 w-4 mr-2" />
                Editar
              </>
            )}
          </Button>
        </div>
        {!isEditing && <p className="text-sm mt-2">{initialData.name}</p>}
        {isEditing && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="ex: Organização das Nações Unidas (ONU)"
                        className="rounded"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2 mt-2">
                <Button
                  className="rounded"
                  disabled={!isValid || isSubmitting}
                  type="submit"
                >
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </>
  )
}
