// hooks/useCategoryWithPosts.ts
import { useQuery } from '@tanstack/react-query';
import { getCategoryWithPosts } from '@/lib/categorie';

export const useCategoryWithPosts = (slug: string) => {
  return useQuery({
    queryKey: ['categoryWithPosts', slug],
    queryFn: () => getCategoryWithPosts(slug),
    enabled: !!slug,
  });
};
