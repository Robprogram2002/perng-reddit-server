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
  try {
    const error = await cloudinary.v2.uploader.destroy(publicId);
    if (error) throw error;
    return { success: true, publicId };
  } catch (err) {
    return err;
  }
};
