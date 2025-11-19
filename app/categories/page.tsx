import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CategoryTable } from '@/components/categories/CategoryTable'

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="container mx-auto p-6">
      {/* back to home button */}
      <div className='mb-6'>
        <Link href= "/">
        <Button variant= "outline" className='mb-4'>← Back to Home</Button>
        </Link>

      </div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-gray-600">Manage your product categories</p>
        </div>
        <Link href="/categories/create">
          <Button>Add New Category</Button>
        </Link>
      </div>
      
      <CategoryTable categories={categories} />
    </div>
  )
}