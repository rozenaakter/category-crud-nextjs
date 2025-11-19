import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name too long'),
  image: z.string().url('Please enter a valid image URL')
})

export type CategoryFormData = z.infer<typeof categorySchema>