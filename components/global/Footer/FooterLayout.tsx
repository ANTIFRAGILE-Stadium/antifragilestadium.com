import type { PortableTextBlock } from 'next-sanity'

import { CustomPortableText } from '@/components//shared/CustomPortableText'
import type { SettingsPayload } from '@/types'

interface FooterProps {
  data: SettingsPayload
}
export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])
  return (
    <footer className="flex flex-wrap items-center gap-x-5 bg-white dark:bg-black px-4 py-12 md:px-16 md:py-20 lg:px-32">
      {footer && (
        <CustomPortableText paragraphClasses="text-md" value={footer} />
      )}
    </footer>
  )
}
