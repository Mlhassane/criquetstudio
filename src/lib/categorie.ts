import { sanityClient } from './sanity';
import { categoriesQuery, categoryWithPostsQuery } from './querie';
import { Category, CategoryWithPosts } from '@/types/post';

export async function getAllCategories(): Promise<Category[]> {
  return await sanityClient.fetch(categoriesQuery);
}

export async function getCategoryWithPosts(slug: string): Promise<CategoryWithPosts> {
  return await sanityClient.fetch(categoryWithPostsQuery(slug));
}
