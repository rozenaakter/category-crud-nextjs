import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - All categories (NO PARAMS)
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

// POST - Create category
export async function POST(request: Request) {
  try {
    const { name, image } = await request.json()
    
    if (!name || !image) {
      return NextResponse.json({ error: 'Name and image required' }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: { name: name.trim(), image: image.trim() }
    })
    
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}