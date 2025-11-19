import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - All categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST - Create new category
export async function POST(request: Request) {
  try {
    const { name, image } = await request.json()
    
    console.log('Creating category:', { name, image })
    
    if (!name || !image) {
      return NextResponse.json(
        { error: 'Name and image are required' },
        { status: 400 }
      )
    }

    const category = await prisma.category.create({
      data: { 
        name: name.trim(),
        image: image.trim()
      }
    })
    
    console.log('Category created successfully:', category)
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Create category error:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}