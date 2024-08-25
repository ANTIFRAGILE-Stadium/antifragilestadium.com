import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'
import ConcertListItem from '@/components/global/Concert/ConcertListItem'

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
      {/* Showcase projects */}
      {recentConcerts && recentConcerts.length > 0 && (
        <div className="mx-auto max-w-[100rem] rounded-md border">
          {recentConcerts.map((concert, i) => (
            <a href={concert.site} key={concert._id} target="_blank">
              <ConcertListItem data={concert} odd={i % 2} />
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
