'use server';
import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
export default async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('You need to be logged in to delete a property');
  }
  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error('Property not found');
  }
  // Verify that the user owns the property
  if (property.owner.toString() !== userId) {
    throw new Error('You are not authorized to delete this property');
  }
  // Extract the public_id from the images
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split('/');
    return parts.at(-1).split('.').at(0);
  });

  // Delete the images from Cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy('property-udemy/' + publicId);
    }
  }

  await property.deleteOne();
  revalidatePath('/', 'layout');
}
