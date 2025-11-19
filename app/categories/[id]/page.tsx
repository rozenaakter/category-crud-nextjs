import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: Promise<{ id: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params
  
  const category = await prisma.category.findUnique({
    where: { id }
  })

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
      <img src={category.image} alt={category.name} className="w-64 h-64 object-cover rounded" />
    </div>
  )
}