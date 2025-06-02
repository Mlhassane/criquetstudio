// hooks/usePost.ts
import { useQuery } from '@tanstack/react-query';
import { getPostBySlug } from '@/lib/post';

export const usePost = (slug: string) => {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug, // attend que le slug soit disponible
  });
};
