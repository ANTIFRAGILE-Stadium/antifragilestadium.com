import { ConcertPayloadMutation, SanityMutation } from '@/types'
import { youtube } from '@googleapis/youtube'
import { NextRequest, NextResponse } from 'next/server'

function extractSetlistText(text: string) {
  // Regex to extract everything under "SETLIST"
  const regex = /SETLIST\s*([\s\S]*?)(?:VIDEOS|CREW|SOFTWARE|THANK YOU|$)/
  const match = text.match(regex)

  if (match) {
    return match[1].trim()
  } else {
    return null
  }
}

function extractArtistsFromSetlist(setlist: string) {
  // Regex to extract the artists after the "-" character
  const regex = /-\s*([^-\n]+)/g
  const artists: string[] = []
  let match

  while ((match = regex.exec(setlist)) !== null) {
    artists.push(match[1].trim())
  }

  return artists
}

function getArtistsFromSetlistText(text) {
  // Step 1: Extract the SETLIST section
  const setlistText = extractSetlistText(text)

  // Step 2: Extract artists from the SETLIST section and filter unique ones
  if (setlistText) {
    const artists = extractArtistsFromSetlist(setlistText)
    // Convert to a Set to filter unique artists, then convert back to an array
    return [...new Set(artists)]
  } else {
    return []
  }
}

export async function PUT(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (
    process.env.NODE_ENV === 'production' &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  const youtubeApiKey = process.env.YOUTUBE_API_KEY
  const sanityApiToken = process.env.SANITY_API_WRITE_TOKEN
  const sanityProjectId = process.env.SANITY_API_PROJECT_ID
  const sanityDataset = process.env.SANITY_API_DATASET
  // YYYY-MM-DD
  const sanityVersion = new Date().toISOString().split('T')[0]
  const sanityMutationUrl = `https://${sanityProjectId}.api.sanity.io/v${sanityVersion}/data/mutate/${sanityDataset}`

  if (!youtubeApiKey) {
    return new Response('Missing YouTube API key', {
      status: 500,
    })
  }

  const youtubeClient = youtube({
    version: 'v3',
    auth: youtubeApiKey,
  })

  const videos = await youtubeClient.playlistItems.list({
    part: ['snippet'],
    playlistId: process.env.YOUTUBE_PLAYLIST_ID,
    maxResults: 50, // Max allowed by YouTube API
  })

  if (!videos.data.items) {
    return new Response('No videos found', {
      status: 500,
    })
  }

  if (!videos.data.items) {
    return new Response('No videos found', {
      status: 500,
    })
  }

  const sanityMutation: SanityMutation<ConcertPayloadMutation>[] = []

  for (const video of videos.data.items) {
    // Check if every key is not null or undefined
    if (
      !video.id ||
      !video.snippet ||
      !video.snippet.title ||
      !video.snippet.description ||
      !video.snippet.thumbnails ||
      !video.snippet.thumbnails.maxres ||
      !video.snippet.thumbnails.maxres.url ||
      !video.snippet.thumbnails.maxres.width ||
      !video.snippet.thumbnails.maxres.height ||
      !video.snippet.publishedAt ||
      !video.snippet.resourceId ||
      !video.snippet.resourceId.videoId ||
      !video.snippet.description
    ) {
      console.error('Missing data for video ', video.id)
      continue
    }

    const mutation: ConcertPayloadMutation = {
      _id: video.snippet.resourceId.videoId,
      _type: 'concert',
      title: video.snippet.title,
      description: getArtistsFromSetlistText(video.snippet.description).join(
        ', ',
      ),
      coverImageYTThumbnail: {
        url: video.snippet.thumbnails.maxres.url,
        width: video.snippet.thumbnails.maxres.width,
        height: video.snippet.thumbnails.maxres.height,
      },
      date: video.snippet.publishedAt.split('T')[0],
      site: `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`,
      tags: ['TODO'],
    }

    sanityMutation.push({
      createOrReplace: mutation,
    })
  }

  console.log(sanityMutation)

  return fetch(sanityMutationUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sanityApiToken}`,
    },
    body: JSON.stringify({
      mutations: sanityMutation,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        console.error(data)
        console.error('Items:', data.error.items[0])
        return new Response('Error updating concerts', {
          status: 500,
        })
      }
      // If no error, return success here
      return NextResponse.json({ success: true })
    })
    .catch((err) => {
      console.error(err)
      return new Response('Error updating concerts', {
        status: 500,
      })
    })
}
