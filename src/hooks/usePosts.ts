// hooks/usePosts.ts
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '@/lib/post';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  });
};
