import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Single Category দেখাবে
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id }
    })
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    )
  }
}
// POST - নতুন Category তৈরি করবে
export async function POST(request: Request) {
  try {
    const { name, image } = await request.json()
    
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
    
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Create category error:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}

// PUT - Category Edit করবে
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, image } = await request.json()
    
    if (!name || !image) {
      return NextResponse.json(
        { error: 'Name and image are required' },
        { status: 400 }
      )
    }

    const category = await prisma.category.update({
      where: { id: params.id },
      data: { name, image }
    })
    
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    )
  }
}

// DELETE - Category Delete করবে
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.category.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ message: 'Category deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}
