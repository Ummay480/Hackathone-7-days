import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Create Sanity client
const client = createClient({
  projectId:"12q1kpjz",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-01-17',
});

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(),
    });
    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null;
  }
}

async function importData() {
  try {
    console.log('Fetching foods and chefs from API...');

    const foodsResponse = await axios.get('https://sanity-nextjs-rouge.vercel.app/api/foods');
    const chefsResponse = await axios.get('https://sanity-nextjs-rouge.vercel.app/api/chefs');

    const foods = foodsResponse.data;
    const chefs = chefsResponse.data;

    console.log(`Fetched ${foods.length} foods and ${chefs.length} chefs`);

    for (const food of foods) {
      console.log(`Processing food: ${food.title}`);
      let imageRef = null;
      if (food.image) {
        imageRef = await uploadImageToSanity(food.image);
      }
      const sanityFood = {
        _type: 'food',
        name: food.title,
        description: food.description,
        price: food.price,
        discountPercentage: 0,
        priceWithoutDiscount: food.price,
        rating: food.rating?.rate || 0,
        ratingCount: food.rating?.count || 0,
        tags: food.category ? [food.category] : [],
        sizes: [],
        image: imageRef ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageRef,
          },
        } : undefined,
      };
      console.log('Uploading food to Sanity:', sanityFood.name);
      const result = await client.create(sanityFood);
      console.log(`Food uploaded successfully: ${result._id}`);
    }

    for (const chef of chefs) {
      console.log(`Processing chef: ${chef.name}`);
      let imageRef = null;
      if (chef.image) {
        imageRef = await uploadImageToSanity(chef.image);
      }
      const sanityChef = {
        _type: 'chef',
        name: chef.name,
        position: chef.position,
        experience: chef.experience,
        specialty: chef.specialty,
        description: chef.description,
        available: chef.available,
        image: imageRef ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageRef,
          },
        } : undefined,
      };
      console.log('Uploading chef to Sanity:', sanityChef.name);
      const result = await client.create(sanityChef);
      console.log(`Chef uploaded successfully: ${result._id}`);
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData();
