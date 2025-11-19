'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, X } from 'lucide-react'

interface CategoryFormProps {
  initialData?: {
    id: string
    name: string
    image: string
  }
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    image: initialData?.image || ''
  })

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    setUploading(true)
    try {
      console.log('Starting file upload...', file.name)

      const uploadFormData = new FormData()
      uploadFormData.append('image', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      console.log('Upload response status:', response.status)

      const result = await response.json()
      console.log('Upload result:', result)

      if (result.success) {
        // IMPORTANT: Directly update formData
        setFormData(prev => ({ ...prev, image: result.url }))
        alert('Image uploaded successfully! Now enter category name and click Create Category.')
      } else {
        alert(result.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  // Remove image
  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: '' }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Handle form submit - SIMPLE VERSION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('Submitting form data:', formData)

    if (!formData.name.trim()) {
      alert('Please enter category name')
      return
    }

    if (!formData.image.trim()) {
      alert('Please upload an image first')
      return
    }

    setLoading(true)

    try {
      const url = '/api/categories'
      const method = 'POST'

      console.log('Sending to API:', { name: formData.name, image: formData.image })

      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          image: formData.image
        }),
      })

      console.log('API Response status:', response.status)

      if (response.ok) {
        const result = await response.json()
        console.log('Category created:', result)
        alert('Category created successfully!')
        router.push('/categories')
        router.refresh()
      } else {
        const error = await response.json()
        console.error('API Error:', error)
        alert(error.error || 'Failed to create category')
      }
    } catch (error) {
      console.error('Network error:', error)
      alert('Network error - check console')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {initialData ? 'Edit Category' : 'Create New Category'}
        </CardTitle>
        <CardDescription>
          {initialData ? 'Update your category details' : 'Add a new category to your collection'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Category Name *</Label>
            <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter category name"
              required
            />
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
            <Label>Category Image *</Label>
            
            {/* File Upload - SIMPLE */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  id="fileUpload"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  disabled={uploading}
                  onClick={() => document.getElementById('fileUpload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                {uploading ? 'Uploading...' : 'Select image from your computer'}
              </p>
            </div>

            {/* Current Image Status */}
            {formData.image && (
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-700">
                  ✅ Image Ready: {formData.image}
                </p>
              </div>
            )}

            {/* Image Preview */}
            {formData.image && (
              <div className="mt-4 p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <Label>Image Preview</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded"
                />
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={loading || uploading || !formData.image} 
            className="w-full"
          >
            {loading ? 'Creating...' : uploading ? 'Uploading...' : 'Create Category'}
          </Button>

          {/* Debug Info */}
          <div className="p-2 bg-gray-100 rounded text-xs">
            <p>Debug: Name: {formData.name}</p>
            <p>Debug: Image: {formData.image ? '✅ Set' : '❌ Not Set'}</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}





