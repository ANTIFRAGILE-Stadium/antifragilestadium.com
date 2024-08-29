import ConcertList from '@/components/global/Concert/ConcertList'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import type { PagePayload } from '@/types'

export interface PageProps {
  data: PagePayload | null
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title, concertsList } = data ?? {}

  return (
    <div>
      <div className="mb-14">
        {/* Header */}
        <Header title={title} description={overview} />

        {/* Body */}
        {body && (
          <CustomPortableText
            paragraphClasses="font-serif max-w-3xl text-gray-600 dark:text-gray-400 text-xl"
            value={body}
          />
        )}

        {/* Concerts (only when on "concerts" slug) */}
        {concertsList && <ConcertList concerts={concertsList} />}
      </div>
      <div className="absolute left-0 w-screen border-t dark:border-gray-600" />
    </div>
  )
}

export default Page
