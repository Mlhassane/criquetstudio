// lib/posts.ts
import { sanityClient } from './sanity';
import { postsQuery, postBySlugQuery } from './querie';
import { Post } from '@/types/post';

export async function getAllPosts(): Promise<Post[]> {
  return await sanityClient.fetch(postsQuery);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  return await sanityClient.fetch(postBySlugQuery, { slug });
}
