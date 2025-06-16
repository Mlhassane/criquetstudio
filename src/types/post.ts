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
  title: string;
  slug: {
    current: string;
  };
  mainImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  publishedAt: string;
  excerpt?: string;
  body?: Array<{
    _type: string;
    children: Array<{
      _type: string;
      text?: string;
    }>;
  }>;
  youtubeUrl?: string;
  categories?: Array<{
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  }>;
  author?: {
    _id: string;
    name: string;
    image?: {
      asset: {
        _ref: string;
        _type: 'reference';
      };
    };
  };
}

// ✅ Catégorie avec articles
export interface CategoryWithPosts extends Category {
  postCount: number;
  posts: Post[];
}
