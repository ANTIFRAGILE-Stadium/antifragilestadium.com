import Link from 'next/link'

import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'
import Logo from '@/components/shared/Logo'

interface NavbarProps {
  data: SettingsPayload
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-x-5 bg-white dark:bg-black px-4 py-4 md:px-16 md:py-5 lg:px-32">
      <Link href="/">
        <Logo height="30px" className="fill-black dark:fill-white" />
      </Link>
      {menuItems &&
        menuItems.map((menuItem, key) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug)
          if (!href) {
            return null
          }
          return (
            <Link
              key={key}
              className={`text-lg hover:text-black dark:hover:text-white md:text-xl ${
                menuItem?._type === 'home'
                  ? 'font-semibold text-black dark:text-white flex-[100%] md:flex-1 text-base leading-[40px]'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              href={href}
            >
              {menuItem.title}
            </Link>
          )
        })}
    </div>
  )
}
