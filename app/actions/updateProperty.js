"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateProperty(propertyId, formData) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("You need to be logged in to add a property");
  }
  const { userId } = sessionUser;

  const existingProperty = await Property.findById(propertyId);

  // Verify that the user owns the property
  if (existingProperty.owner.toString() !== userId) {
    throw new Error("You are not authorized to update this property");
  }
  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    bath: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities: formData.getAll("amenities"),
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const updateProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  revalidatePath("/", "layout");
  redirect(`/properties/${updateProperty._id}`);
}