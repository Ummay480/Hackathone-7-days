"use client"; // Ensures client-side rendering

import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import ChefCard from "@/components/ChefCard"; // Assuming the ChefCard component is correctly named and located

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-01-11",
});

// Define the chef type for TypeScript
type Chef = {
  _id: string;
  name: string;
  position?: string; // Marked as optional
  experience: number;
  specialty: string;
  imageUrl: string;
  description: string;
  available: boolean;
};

const Chef: React.FC = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChefs = async () => {
      const query = `*[_type == "chef"]{
        _id,
        name,
        position,
        experience,
        specialty,
        "imageUrl": image.asset->url,
        description,
        available
      }`;

      try {
        const data = await client.fetch(query);
        setChefs(data);
      } catch (error) {
        console.error("Failed to fetch chefs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading chefs...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Our Chefs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {chefs.map((chef) => (
          <ChefCard
            key={chef._id}
            image={chef.imageUrl}
            name={chef.name}
            position={chef.position || "Position not specified"} // Fallback text
            experience={`${chef.experience} years`}
            specialty={chef.specialty}
            description={chef.description}
            available={chef.available}
          />
        ))}
      </div>
    </div>
  );
};

export default Chef;
