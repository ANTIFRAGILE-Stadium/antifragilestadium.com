import { ConcertPayloadMutation, SanityMutation } from '@/types'
import { youtube } from '@googleapis/youtube'
import { NextRequest, NextResponse } from 'next/server'

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
      !video.snippet.thumbnails ||
      !video.snippet.thumbnails.standard ||
      !video.snippet.thumbnails.standard.url ||
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
      coverImageUrl: video.snippet.thumbnails.standard.url,
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
