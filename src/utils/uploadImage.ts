import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const upload = async (image: string) => {
  try {
    const result = await cloudinary.v2.uploader.upload(image, {
      public_id: `reddit/${Date.now()}`,
      resource_type: 'auto', // jpeg, png
    });

    return {
      publicId: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('something went wrong');
    }
  }
};

export const remove = async (publicId: string) => {
  const { result } = await cloudinary.v2.uploader.destroy(publicId);
  if (result === 'ok') {
    return { success: true, publicId };
  }
  throw new Error('something went wrong while removing image');
};
