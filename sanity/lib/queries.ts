import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    "recentConcerts": *[_type == "concert"][0...6] | order(date desc) {
        _id,
        title,
        description,
        coverImageYTThumbnail,
        tags,
        site
      },
    title,
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
    "concertsList": select(
      $slug == "concerts" => *[_type == "concert"] | order(date desc) {
        _id,
        title,
        description,
        coverImageYTThumbnail,
        tags,
        site
      },
      null
    )
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`
