import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteContext {
  params: Promise<{ id: string }>
}

// GET - Single Category দেখাবে
export async function GET(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params
    
    const category = await prisma.category.findUnique({
      where: { id }
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

// PUT - Category Edit করবে
export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params
    const { name, image } = await request.json()
    
    if (!name || !image) {
      return NextResponse.json(
        { error: 'Name and image are required' },
        { status: 400 }
      )
    }

    const category = await prisma.category.update({
      where: { id },
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
export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params
    
    await prisma.category.delete({
      where: { id }
    })
    
    return NextResponse.json({ message: 'Category deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}