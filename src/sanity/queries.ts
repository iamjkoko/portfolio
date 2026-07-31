import {defineQuery} from 'groq'

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project" && defined(slug.current)] | order(year desc, _createdAt desc){
    _id,
    title,
    slug,
    description,
    year,
    category,
    keywords,
    mainImage,
    "videoUrl": video.asset->url
  }`,
)

export const PROJECT_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    year,
    category,
    keywords,
    mainImage,
    body,
    "videoUrl": video.asset->url
  }`,
)
