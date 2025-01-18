import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId:"12q1kpjz",
  dataset:"production",
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-01-17',
})
