import PropertyEditPage from '@/components/PropertyEdit';
import { getSessionUser } from '@/utils/getSessionUser';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializedObject } from '@/utils/convertToObject';
import NotFound from '@/app/not-found';

export default async function EditPage({ params }) {
  await connectDB();

  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  if (!userId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // const propertyDoc = await Property.findById(params.slug).lean();

  const propertyDoc = await Property.findOne({
    _id: params.slug,
    owner: userId,
  }).lean();

  if (!propertyDoc) {
    return (
      <>
        <NotFound />
      </>
    );
  }

  const property = convertToSerializedObject(propertyDoc);
  if (!property) {
    <h1 className=" text-center text-2xl font-blood mt-10">
      Property Not Found
    </h1>;
  }
  return (
    <section className=" bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          {property.name}
          <PropertyEditPage property={property} />
        </div>
      </div>
    </section>
  );
}
