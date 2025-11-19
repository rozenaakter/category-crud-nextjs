import { CategoryForm } from '@/components/categories/CategoryForm'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CreateCategoryPage() {
  return (
    <div className="container mx-auto p-6">
      <Link href="/categories">
        <Button variant="outline" className="mb-6">
          ← Back to Categories
        </Button>
      </Link>
      
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create New Category</CardTitle>
          <CardDescription>
            Add a new category to your product catalog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryForm />
        </CardContent>
      </Card>
    </div>
  )
}