import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-01-17", // Ensure it's used inside the config
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN, // Use public env variables
});
