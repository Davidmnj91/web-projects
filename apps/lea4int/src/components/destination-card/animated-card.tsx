import clsx from 'clsx'

import { Typography } from '@/components/typography/typography'

interface DestinationCardProps {
  imgSrc: string
  title: string
  caption: string
  containerClasses: string
  labelClasses: string
}
export const AnimatedCard = ({ imgSrc, title, caption, containerClasses, labelClasses }: DestinationCardProps) => {
  return (
    <div className={clsx('h-[${size.height}] w-[${size.width}] group overflow-hidden', containerClasses)}>
      <div
        className='flex h-full w-full transform items-center justify-center transition duration-500 group-hover:scale-[1.15]'
        style={{
          backgroundImage: `url(${imgSrc}), linear-gradient(#0308227F,#0308227F)`,
          backgroundBlendMode: 'overlay',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className={clsx(
            'h-[${labelSize.height}px] w-[${labelSize.width}px] border-basics-white flex flex-col justify-between border p-2.5',
            labelClasses,
          )}
        >
          <Typography as='span' size='heading-md' color='basics-white' weight='bold' className='text-start'>
            {title}
          </Typography>
          <Typography as='span' size='heading-sm' color='basics-white' weight='bold' className='text-end'>
            {caption}
          </Typography>
        </div>
      </div>
    </div>
  )
}
