import "server-only"
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId , token } from '../env'

export const write_client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn:false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token ,
});

if(!write_client.config().token) throw new Error("Write token not found") ;
