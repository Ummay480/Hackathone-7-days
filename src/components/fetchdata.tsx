"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import Image from "next/image";

const client = createClient({
  projectId: "12q1kpjz",
  dataset: "production",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN, // Ensure it's a public token
  apiVersion: "2025-01-17",
});

interface Food {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  available: boolean;
  imageUrl: string;
  tags?: string[];
}

export default function FetchFood() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "food"]{
          _id,
          name,
          price,
          "originalPrice": originalPrice,
          rating,
          tags,
          "imageUrl": image.asset->url,
          description,
          available
        }`;
        const data: Food[] = await client.fetch(query);
        setFoods(data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Foods</h1>
      <div>
        {foods.map((food) => (
          <div key={food._id}>
            <h2>{food.name}</h2>
            <p>{food.description}</p>
            <p>Price: ${food.price}</p>
            {food.originalPrice && (
              <p>
                Original Price: <s>${food.originalPrice}</s>
              </p>
            )}
            <p>{food.available ? "Available" : "Out of Stock"}</p>
            <Image
              src={food.imageUrl}
              alt={food.name}
              width={200}
              height={150}
              priority
            />
            {food.tags && <p>Tags: {food.tags.join(", ")}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
