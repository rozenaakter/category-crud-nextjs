import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    console.log('Upload API called') // Debug

    const formData = await request.formData()
    const file = formData.get('image') as File

    console.log('File received:', file?.name) // Debug

    if (!file) {
      console.log('No file found in request') // Debug
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    // File validation
    if (!file.type.startsWith('image/')) {
      console.log('Invalid file type:', file.type) // Debug
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const extension = path.extname(file.name)
    const filename = `category-${timestamp}${extension}`
    
    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'categories')
    await mkdir(uploadDir, { recursive: true })
    
    // Save file to public/uploads/categories folder
    const uploadPath = path.join(uploadDir, filename)
    await writeFile(uploadPath, buffer)

    console.log('File saved to:', uploadPath) // Debug

    // Return the file URL
    const fileUrl = `/uploads/categories/${filename}`

    console.log('Returning URL:', fileUrl) // Debug

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      filename: filename
    })

  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}