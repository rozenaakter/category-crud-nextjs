import { prisma } from '@/lib/prisma'
import { CategoryForm } from '@/components/categories/CategoryForm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface EditCategoryPageProps {
  params:Promise<{
    id: string
  }>
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const {id} = await params
  const category = await prisma.category.findUnique({
    where: { id}
  })

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto p-6">
      <Link href="/categories">
        <Button variant="outline" className="mb-4">
          ← Back to Categories
        </Button>
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">Edit Category</h1>
      <CategoryForm initialData={category} />
    </div>
  )
}