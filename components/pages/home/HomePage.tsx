import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import ConcertList from '@/components/global/Concert/ConcertList'
import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], recentConcerts = [], title = '' } = data ?? {}

  return (
    <div className="space-y-20">
      {/* Header */}
      {title && <Header description={overview} />}
      <h2 className="text-xl font-semibold tracking-tight md:text-4xl">
        Recent Concerts
      </h2>
      {/* Showcase projects */}
      <ConcertList concerts={recentConcerts} />
    </div>
  )
}

export default HomePage
