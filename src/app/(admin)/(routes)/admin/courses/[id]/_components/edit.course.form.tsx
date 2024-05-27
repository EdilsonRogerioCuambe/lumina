'use client'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import toast from 'react-hot-toast'
import { Institute, Coordinator, User, Course } from '@prisma/client'

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome do curso deve ter no mínimo 3 caracteres' }),
  code: z
    .string()
    .min(2, { message: 'O código do curso deve ter no mínimo 2 caracteres' }),
  coordinatorId: z.string(),
  instituteId: z.string(),
})

interface AddCoursePageProps {
  users: (Coordinator & { user: User | null })[]
  institutes: Institute[]
  course?: Course | null
}

export default function EditCourseForm({
  users,
  institutes,
  course,
}: AddCoursePageProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: course?.name || '',
      code: course?.code || '',
      coordinatorId: course?.coordinatorId || '',
      instituteId: course?.instituteId || '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (course) {
        await axios.put(`/api/admin/courses/${course.id}`, {
          ...values,
        })
        toast.success('Curso atualizado com sucesso')
      } else {
        await axios.post('/api/admin/courses', {
          ...values,
        })
        toast.success('Curso criado com sucesso')
      }
      router.push(`/admin/courses/list`)
    } catch (error) {
      console.log(error)
      toast.error(`Erro ao ${course ? 'atualizar' : 'criar'} curso`)
    }
  }

  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Curso</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Nome do Curso"
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
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código do Curso</FormLabel>
                  <FormControl>
                    <Input
                      id="code"
                      placeholder="Código do Curso"
                      {...field}
                      disabled={isSubmitting}
                      className="border-2 rounded p-4 w-full"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.code?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coordinatorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coordenador</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um coordenador" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.user?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.coordinatorId?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instituteId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instituto</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um instituto" />
                      </SelectTrigger>
                      <SelectContent>
                        {institutes.map((institute) => (
                          <SelectItem key={institute.id} value={institute.id}>
                            {institute.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.instituteId?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <Button
              className="rounded"
              variant="outline"
              type="button"
              onClick={() => router.push('/admin/courses/list')}
            >
              Cancelar
            </Button>
            <Button
              className="rounded"
              variant="default"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
