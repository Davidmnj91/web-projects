import clsx from 'clsx'

import type { RichTranslation } from '@/types/types'
import type { JSX } from 'react'

import { Typography } from '@/components/typography/typography'

interface ServiceItemProps {
  icon: JSX.Element
  title?: RichTranslation
  description?: RichTranslation
  mobileDirection?: 'VERTICAL' | 'HORIZONTAL'
}
export const ServiceItem = ({ title, description, icon, mobileDirection = 'VERTICAL' }: ServiceItemProps) => {
  return (
    <div
      className={clsx(
        'border-gold desktop:flex-row flex items-center border',
        mobileDirection === 'VERTICAL' ? 'flex-col' : 'flex-row',
      )}
    >
      <div className='flex h-full items-center p-4'>{icon}</div>
      <div
        className={clsx(
          'desktop:border-l desktop:border-t-0 desktop:border-l-gold flex w-full flex-col gap-1 p-4',
          mobileDirection === 'VERTICAL' ? 'border-t-gold border-t' : 'border-l-gold border-l',
        )}
      >
        {title && (
          <Typography as='h3' size='heading-md' color='europe-dark' className='desktop:font-normal font-bold'>
            {title}
          </Typography>
        )}
        {description && (
          <Typography as='ul' size='body-lg' color='europe-dark'>
            {description}
          </Typography>
        )}
      </div>
    </div>
  )
}
