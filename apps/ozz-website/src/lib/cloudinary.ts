import { v2 as cloudinary } from 'cloudinary'

type IMAGE_TYPE = 'gallery' | 'partners'

export interface Resource {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
}

export interface CloudinaryResponse {
  resources: Resource[]
  next_cursor?: string
}

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
})

export const getImages = async (
  folder: IMAGE_TYPE,
  max_images?: number,
  next_cursor?: string,
): Promise<CloudinaryResponse> => {
  const query = cloudinary.search
    .expression(`folder:${folder}`)
    .with_field('context')
    .with_field('metadata')
    .max_results(max_images)
    .sort_by('public_id', 'asc') // Scalable naming convention sort (e.g. 001-image)
    .sort_by('created_at', 'desc') // Fallback for images without numbering

  if (next_cursor) {
    query.next_cursor(next_cursor)
  }

  const result = (await query.execute()) as CloudinaryResponse

  return {
    resources: result.resources,
    next_cursor: result.next_cursor,
  }
}
