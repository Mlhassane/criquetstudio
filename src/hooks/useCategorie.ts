// hooks/useCategories.ts
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/lib/categorie';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });
};
