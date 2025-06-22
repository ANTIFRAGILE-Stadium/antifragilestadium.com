import React from 'react'

import { ConcertPayload } from '@/types'

import ConcertListItem from './ConcertListItem'

interface ConcertListProps {
  concerts: ConcertPayload[]
}

export default function ConcertList({ concerts }: ConcertListProps) {
  return (
    <>
      {concerts && concerts.length > 0 && (
        <div className="mr-auto max-w-[100rem]">
          {concerts.map((concert, i) => (
            <a href={concert.site} key={concert._id} target="_blank">
              <ConcertListItem data={concert} odd={i % 2} />
            </a>
          ))}
        </div>
      )}
    </>
  )
}
