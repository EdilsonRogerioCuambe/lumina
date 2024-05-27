import prisma from '@/database/db'
import {
  User,
  BookOpen,
  GraduationCap,
  Users,
  Building,
  Book,
} from 'lucide-react'
import Card from './_components/card'
import BarChart from './_components/bar.chart'
import PieChart from './_components/pie.chart'

export default async function Page() {
  const users = await prisma.user.findMany()
  const courses = await prisma.course.findMany()
  const students = await prisma.student.findMany()
  const professors = await prisma.professor.findMany()
  const institutes = await prisma.institute.findMany()
  const subjects = await prisma.subject.findMany()

  const cards = [
    {
      title: 'Total de Usuários',
      count: users.length,
      icon: <User className="h-12 w-12 text-gray-700" />,
    },
    {
      title: 'Total de Cursos',
      count: courses.length,
      icon: <BookOpen className="h-12 w-12 text-gray-700" />,
    },
    {
      title: 'Total de Estudantes',
      count: students.length,
      icon: <GraduationCap className="h-12 w-12 text-[#333333]" />,
    },
    {
      title: 'Total de Professores',
      count: professors.length,
      icon: <Users className="h-12 w-12 text-[#333333]" />,
    },
    {
      title: 'Total de Institutos',
      count: institutes.length,
      icon: <Building className="h-12 w-12 text-[#333333]" />,
    },
    {
      title: 'Total de Disciplinas',
      count: subjects.length,
      icon: <Book className="h-12 w-12 text-[#333333]" />,
    },
  ]

  const userChartData = [students.length, professors.length]
  const userChartLabels = ['Estudantes', 'Professores']

  const instituteCourseCounts: { [key: string]: number } = {}

  courses.forEach((course) => {
    if (instituteCourseCounts[course.id]) {
      instituteCourseCounts[course.id] += 1
    } else {
      instituteCourseCounts[course.id] = 1
    }
  })

  const courseChartData = Object.values(instituteCourseCounts)
  const courseChartLabels = Object.keys(instituteCourseCounts).map((id) => {
    const institute = institutes.find((inst) => inst.id === id)
    return institute ? institute.name : 'Desconhecido'
  })

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Distribuição de Usuários</h2>
        <BarChart data={userChartData} labels={userChartLabels} />
      </div>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4">
          Distribuição de Cursos por Instituto
        </h2>
        <PieChart data={courseChartData} labels={courseChartLabels} />
      </div>
    </div>
  )
}
