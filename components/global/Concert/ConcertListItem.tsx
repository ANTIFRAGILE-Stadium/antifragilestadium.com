import ImageBox from '@/components/shared/ImageBox'
import { ConcertPayload } from '@/types'
import React from 'react'

interface ConcertListItemProps {
  data: ConcertPayload
  odd: number
}

export default function ConcertListItem({ data, odd }: ConcertListItemProps) {
  return (
    <div
      className={`flex flex-col gap-x-5 mb-6 transition hover:underline lg:flex-row ${
        odd && 'lg:flex-row-reverse'
      }`}
    >
      <div className="w-full lg:w-9/12">
        <ImageBox
          rawImageUrl={data.coverImageYTThumbnail.url}
          width={data.coverImageYTThumbnail.width}
          height={data.coverImageYTThumbnail.height}
          alt={`Cover image from ${data.title}`}
          classesWrapper="relative aspect-[16/9]"
        />
      </div>
      <div className="relative mt-2 flex w-full flex-col justify-between lg:mt-0">
        <div>
          <div className="mb-2 text-xl font-semibold tracking-tight md:text-2xl">
            {data.title}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {data.description}
          </div>
        </div>
        <div>
          <div className="mt-4 flex flex-row gap-x-2">
            {data.tags?.map((tag) => (
              <div className="text-sm font-medium md:text-lg" key={tag}>
                {tag} Stage
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
