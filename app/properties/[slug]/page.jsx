import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import BookmarkButton from "@/components/BookmarkButton";
import PropertyContactForm from "@/components/PropertyContactForm";
import ShareButton from "@/components/ShareButton";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Propertyimages from "@/components/Propertyimages";
import PropertyDetails from "@/components/PropertyDetails";
import { convertToSerializedObject } from "@/utils/convertToObject";
import connectDB from "@/config/database";
export default async function PropertyPage({ params }) {
  await connectDB();
  const propertyDoc = await Property.findById(params.slug).lean();
  const property = convertToSerializedObject(propertyDoc);

  if (!property) {
    return (
      <div className=" text-center text-2xl font-bold mt-10">
        Property not found
      </div>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            {/* Property Info */}
            <PropertyDetails property={property} />
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButton property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <Propertyimages images={property.images} />
    </>
  );
}
