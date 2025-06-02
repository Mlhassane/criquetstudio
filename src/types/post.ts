// ✅ Auteur
import { PortableTextBlock } from '@portabletext/types';

export interface Author {
  _id: string;
  name: string;
  image?: SanityImage;
  bio?: PortableTextBlock[];
}

// ✅ Image Sanity
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

// ✅ Slug
export interface Slug {
  _type: 'slug';
  current: string;
}

// ✅ Catégorie
export interface Category {
  _id: string;
  title: string;
  description?: string;
  slug: Slug;
}

// ✅ Article (Post)
export interface Post {
  _id: string;
  _createdAt?: string;
  title: string;
  publishedAt: string;
  excerpt?: string;
  slug: Slug;
  youtubeUrl?: string;
  mainImage?: SanityImage;
  author?: Author;
  categories?: Category[];
  body?: PortableTextBlock[];
}

// ✅ Catégorie avec articles
export interface CategoryWithPosts extends Category {
  postCount: number;
  posts: Post[];
}
