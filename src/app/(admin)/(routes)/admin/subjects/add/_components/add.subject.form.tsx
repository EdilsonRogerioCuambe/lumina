'use client'
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
import { Course, Professor, User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome da disciplina deve ter no mínimo 3 caracteres',
  }),
  code: z.string().min(2, {
    message: 'O código da disciplina deve ter no mínimo 2 caracteres',
  }),
  courseId: z.string(),
  professorId: z.string(),
  workload: z.coerce.number().int().positive(),
  semester: z.coerce.number().int().positive(),
})

interface AddSubjectFormProps {
  courses: Course[]
  professors: (Professor & { user: User })[]
}

export default function AddSubjectForm({
  courses,
  professors,
}: AddSubjectFormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      code: '',
      courseId: '',
      professorId: '',
      workload: 0,
      semester: 1,
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/admin/subjects', {
        ...values,
      })
      router.push(`/admin/subjects/list`)
      toast.success('Disciplina criada com sucesso')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao criar disciplina')
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
                  <FormLabel>Nome da Disciplina</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Nome da Disciplina"
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
                  <FormLabel>Código da Disciplina</FormLabel>
                  <FormControl>
                    <Input
                      id="code"
                      placeholder="Código da Disciplina"
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
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curso</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um curso" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.courseId?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="professorId"
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
                        {professors.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.user?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.professorId?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workload"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carga Horária (em horas)</FormLabel>
                  <FormControl>
                    <Input
                      id="workload"
                      type="number"
                      placeholder="Carga Horária"
                      {...field}
                      disabled={isSubmitting}
                      className="border-2 rounded p-4 w-full"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.workload?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semestre</FormLabel>
                  <FormControl>
                    <Input
                      id="semester"
                      type="number"
                      placeholder="Semestre"
                      {...field}
                      disabled={isSubmitting}
                      className="border-2 rounded p-4 w-full"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.semester?.message}
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
              onClick={() => router.push('/admin/subjects/list')}
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
