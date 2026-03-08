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

// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const getImages = async (
  folder: IMAGE_TYPE,
  max_images?: number,
  next_cursor?: string,
): Promise<CloudinaryResponse> => {
  // await delay(2000)

  const query = cloudinary.search.expression(`folder:${folder}`).max_results(max_images)

  if (next_cursor) {
    query.next_cursor(next_cursor)
  }

  const result = (await query.execute()) as CloudinaryResponse

  // const result = {
  //   resources: Array.from({ length: 10 }, (_, i) => ({
  //     public_id: 'public_id',
  //     secure_url: `https://picsum.photos/200/300?random=${i}.jpg`,
  //     width: 200,
  //     height: 300,
  //     format: 'jpg',
  //   })),
  //   next_cursor: 'testt',
  // }

  return {
    resources: result.resources,
    next_cursor: result.next_cursor,
  }
}
