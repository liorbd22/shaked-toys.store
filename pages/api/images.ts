import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await cloudinary.search
      .expression('resource_type:image AND folder:shaked')
      .max_results(30)
      .execute();

    const images = result.resources.map((img: { secure_url: string; public_id: string }) => ({
      url: img.secure_url,
      public_id: img.public_id,
    }));

    res.status(200).json({ images });
  } catch (_error) {
    res.status(500).json({ error: 'Failed to fetch images' + _error });
  }
}