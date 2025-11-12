import Link from 'next/link'
import React from 'react'

import type { RichTranslation } from '@/types/types'
import type { LinkProps } from 'next/link'

import { Typography } from '@/components/typography/typography'

type BigButtonProps = {
  subject: string
  caption: RichTranslation
} & LinkProps
export const BigButton = ({ subject, caption, href, ...linkProps }: BigButtonProps) => {
  return (
    <Link
      href={href}
      className='group border-basics-white hover:border-star-dark desktop:w-[310px] flex h-[158px] flex-col justify-between border p-2.5'
      {...linkProps}
    >
      <Typography
        as='h4'
        size='heading-lg'
        color='basics-white'
        weight='bold'
        className='text-left'
        dangerouslySetInnerHTML={{ __html: subject }}
      />
      <Typography as='span' size='heading-sm' color='basics-white' className='group-hover:text-star-dark self-end'>
        {caption}
      </Typography>
    </Link>
  )
}
