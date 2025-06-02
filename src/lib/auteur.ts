import { sanityClient } from './sanity';
import { authorsQuery } from './querie';
import { Author } from '@/types/post';

export async function getAllAuthors(): Promise<Author[]> {
  return await sanityClient.fetch(authorsQuery);
}
