/* eslint-disable @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions */

import Link from 'next/link'

import type { ReactNode } from 'react'
import type { RichTranslationValues } from 'use-intl'

export const defaultTranslationVales: RichTranslationValues = {
  br: (chunks: ReactNode) => (
    <>
      <br />
      {chunks}
    </>
  ),
  li: (chunks: ReactNode) => (
    <li className='flex gap-2'>
      <span>&#8226;</span>
      <span>{chunks}</span>
    </li>
  ),
  b: (chunks: ReactNode) => <strong>{chunks}</strong>,
  link: (chunks: ReactNode) => (
    <a className='underline' href={`${chunks}`} target='_blank' rel='noreferrer'>
      {chunks}
    </a>
  ),
  email: (chunks: ReactNode) => (
    <a aria-label='mail' className='underline' href={`mailto:${chunks}`}>
      {chunks}
    </a>
  ),
  policy: (chunks: ReactNode) => (
    <Link aria-label='privacy policy' className='font-bold underline' href={'/privacy-policy'} target={'_blank'}>
      {chunks}
    </Link>
  ),
  contact: (chunks: ReactNode) => (
    <Link aria-label='contact' className='font-bold underline' href={'/contact/individual'} target={'_blank'}>
      {chunks}
    </Link>
  ),
}
/* eslint-enable @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions */
