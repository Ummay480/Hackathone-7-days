"use client";
import React from 'react';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: "12q1kpjz",
  dataset: "production",
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-01-17',
});

export default async function FetchFood() {
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

  const foods = await client.fetch(query);

  return (
    <div>
      <h1>Foods</h1>
      <div>
        {foods.map((food: any) => (
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
            <img src={food.imageUrl} alt={food.name} />
            {food.tags && (
              <p>
                Tags: {food.tags.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
