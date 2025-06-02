// hooks/useAuthors.ts
import { useQuery } from '@tanstack/react-query';
import { getAllAuthors } from '@/lib/auteur';

export const useAuthors = () => {
  return useQuery({
    queryKey: ['authors'],
    queryFn: getAllAuthors,
  });
};
