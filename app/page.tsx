import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock } from 'lucide-react'

export default async function Home() {
  // সর্বশেষ 3টি Category নিন
  const categories = await prisma.category.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  })

  // Date and Time Format Function
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      })
    }
  }

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-yellow-300 via-orange-200 to-yellow-100">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-3">Category Management System (CRUD)</h1>
        <p className="text-xl text-gray-600">Manage your product categories with ease</p>
      </div>

      {/* Latest Categories Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Categories</h2>
          <Link href="/categories">
            <Button variant="outline">View All Categories</Button>
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <p className="text-gray-500 text-lg mb-4">No categories found</p>
            <Link href="/categories/create">
              <Button>Create First Category</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category:any) => {
              const { date, time } = formatDateTime(category.createdAt)
              
              return (
                <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Category Image */}
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription className="flex flex-col gap-2 mt-2">
                      {/* Date and Time Display */}
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>Date: {date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>Time: {time}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        )}
      </section>

      {/* Action Buttons Section */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Add New Category Card */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Category</CardTitle>
              <CardDescription>
                Create a new product category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/categories/create" className="w-full">
                <Button size="lg" className="w-full">
                  Create Category
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* View All Categories Card */}
          <Card>
            <CardHeader>
              <CardTitle>View All Categories</CardTitle>
              <CardDescription>
                See all your categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/categories" className="w-full">
                <Button variant="outline" size="lg" className="w-full">
                  View All Categories
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}