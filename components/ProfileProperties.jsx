"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage({ properties: initialProperties }) {
  const [properties, setProperties] = useState(initialProperties);

  return properties.map((property) => (
    <div key={property._id} className="md:w-3/4 md:pl-4">
      <div className="mb-10">
        <a href="/property">
          <Image
            className="h-32 w-full rounded-md object-cover"
            src={property.images[0]}
            width={800}
            height={400}
            alt="Property 1"
          />
        </a>
        <div className="mt-2">
          <p className="text-lg font-semibold">{property.name}</p>
          <p className="text-gray-600">
            Address: {property.location.street} {property.location.city}
            {property.location.state}
          </p>
        </div>
        <div className="mt-2">
          <Link
            href="/add-property"
            className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
          >
            Edit
          </Link>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ));
}
