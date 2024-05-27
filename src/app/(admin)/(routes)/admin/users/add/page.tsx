'use client'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

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
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O instituto deve ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  gender: z.string().optional(),
  phone: z.string().optional(),
  birthdate: z.date(),
  // role can be ADMIN, TEACHER or STUDENT
  role: z.string().optional(),
  password: z.string(),
  confirmPassword: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zip: z.string().optional(),
  cpf: z.string().optional(),
})

export default function Page() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      gender: '',
      phone: '',
      birthdate: undefined,
      role: '',
      password: '',
      confirmPassword: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zip: '',
      cpf: '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/admin/users', {
        ...values,
      })
      router.push(`/admin/users/list`)
      toast.success('Usuário criado com sucesso')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao criar usuário')
    }
  }

  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Nome"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Email"
                      {...field}
                      disabled={isSubmitting}
                      className="border-2 rounded p-4 w-full"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gênero</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-y-1 items-center space-x-4 justify-center"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="MASCULINE" />
                        </FormControl>
                        <FormLabel className="font-normal">Masculino</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="FEMALE" />
                        </FormControl>
                        <FormLabel className="font-normal">Feminino</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      id="phone"
                      placeholder="Telefone"
                      {...field}
                      disabled={isSubmitting}
                      className="border-2 rounded p-4 w-full"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.phone?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de nascimento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'dd MMMM yyyy')
                          ) : (
                            <span>Data de nascimento</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Função</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Função" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="TEACHER">Professor</SelectItem>
                      <SelectItem value="STUDENT">Estudante</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Senha"
                      {...field}
                      disabled={isSubmitting}
                      className="border-2 rounded p-4 w-full"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirmar Senha"
                      {...field}
                      disabled={isSubmitting}
                      className="border-2 rounded p-4 w-full"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.confirmPassword?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input
                      id="address"
                      placeholder="Endereço"
                      {...field}
                      disabled={isSubmitting}
                      className="border-2 rounded p-4 w-full"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.address?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input
                      id="city"
                      placeholder="Cidade"
                      {...field}
                      disabled={isSubmitting}
                      className="border-2 rounded p-4 w-full"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.city?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input
                      id="state"
                      placeholder="Estado"
                      {...field}
                      disabled={isSubmitting}
                      className="border-2 rounded p-4 w-full"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.state?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <Input
                      id="country"
                      placeholder="País"
                      {...field}
                      disabled={isSubmitting}
                      className="border-2 rounded p-4 w-full"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.country?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input
                      id="zip"
                      placeholder="CEP"
                      {...field}
                      disabled={isSubmitting}
                      className="border-2 rounded p-4 w-full"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.zip?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      id="cpf"
                      placeholder="CPF"
                      {...field}
                      disabled={isSubmitting}
                      className="border-2 rounded p-4 w-full"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.cpf?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
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
