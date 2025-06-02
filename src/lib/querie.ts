import { groq } from 'next-sanity';

// ✅ Tous les articles
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    publishedAt,
    excerpt,
    slug,
    youtubeUrl,
    mainImage {
      asset->{
        _id,
        url
      }
    },
    "author": author->{_id, name, image, bio},
    "categories": categories[]->{ _id, title, slug }
  }
`;

// ✅ Article par slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    publishedAt,
    excerpt,
    slug,
    youtubeUrl,
    mainImage {
      asset->{
        _id,
        url
      }
    },
    body,
    "author": author->{_id, name, image, bio},
    "categories": categories[]->{ _id, title, slug }
  }
`;

// ✅ Toutes les catégories
export const categoriesQuery = groq`
  *[_type == "category"]{
    _id,
    title,
    description,
    slug
  }
`;

// ✅ Une catégorie + ses articles
export const categoryWithPostsQuery = (slug: string): string => {
  return groq`
    *[_type == "category" && slug.current == "${slug}"][0]{
      _id,
      title,
      description,
      slug,
      "postCount": count(*[_type == "post" && references(^._id)]),
      "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc){
        _id,
        title,
        slug,
        publishedAt,
        youtubeUrl,
        mainImage {
          asset->{
            _id,
            url
          }
        },
        "author": author->{_id, name, image}
      }
    }
  `;
};

// ✅ Tous les auteurs
export const authorsQuery = groq`
  *[_type == "author"]{
    _id,
    name,
    image,
    bio
  }
`;
