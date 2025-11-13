import { cva } from 'class-variance-authority'
import clsx from 'clsx'

import { typographyClasses } from '@/components/typography/typography'

export const buttonTypes = cva('inline-flex justify-center items-center gap-2 font-body', {
  variants: {
    intent: {
      primary: [
        'bg-star text-europe border border-europe',
        'disabled:bg-europe disabled:text-basics-disabled disabled:border disabled:border-basics-disabled',
        'hover:bg-europe hover:text-basics-white hover:border hover:border-basics-white',
        'focus:bg-europe focus:text-basics-white focus:border focus:border-basics-white focus:ring-1 focus:ring-offset-2 focus:ring-basics-white',
      ],
      'secondary-dark': [
        'bg-europe text-basics-white border border-basics-white',
        'disabled:bg-europe disabled:text-basics-disabled disabled:border disabled:border-basics-disabled',
        'hover:bg-basics-white hover:text-europe hover:border hover:border-europe-dark',
        'focus:bg-europe focus:text-basics-white focus:border focus:border-basics-white focus:ring-1 focus:ring-offset-2 focus:ring-basics-white',
      ],
      'secondary-light': [
        'bg-basics-white text-europe-dark border border-europe-dark',
        'disabled:bg-basics-white disabled:text-basics-disabled disabled:border disabled:border-basics-disabled',
        'hover:bg-europe hover:text-basics-white hover:border hover:border-basics-white',
        'focus:bg-basics-white focus:text-europe-dark focus:border focus:border-europe-dark focus:ring-1 focus:ring-offset-2 focus:ring-europe-dark',
      ],
      'tertiary-dark': [
        'text-basics-white',
        'disabled:text-basics-disabled',
        'hover:text-basics-white hover:underline',
        'focus:text-basics-white focus:border focus:border-basics-white focus:ring-1 focus:ring-offset-2 focus:ring-basics-white',
      ],
      'tertiary-light': [
        'text-europe-dark',
        'disabled:text-basics-disabled',
        'hover:text-europe-dark hover:underline',
        'focus:text-europe-dark focus:border focus:border-europe-dark focus:ring-1 focus:ring-offset-2 focus:ring-europe-dark',
      ],
    },
    type: {
      button: 'h-[40px] min-w-[116px] rounded-[30px] px-3 py-2',
      icon: 'h-[40px] w-[40px] rounded-full',
    },
  },
  defaultVariants: {
    intent: 'primary',
    type: 'button',
  },
})

export const tagButtonTypes = cva(
  clsx(
    typographyClasses({ size: 'body-md', color: 'europe-dark' }),
    'inline-flex flex-[1_0_auto] desktop:flex-initial py-1 px-2.5 justify-center items-center rounded-[30px] border border-europe-dark hover:bg-star-light hover:font-normal text-center',
  ),
  {
    variants: {
      intent: {
        enabled: ['bg-default-white'],
        selected: ['bg-star font-bold'],
      },
    },
    defaultVariants: {
      intent: 'enabled',
    },
  },
)

export const linkTypes = cva('inline-flex items-start', {
  variants: {
    intent: {
      dark: [
        'text-europe',
        'disabled:text-disabled disabled:underline',
        'hover:underline',
        'focus:ring-3 focus:rounded-xs focus:ring-europe-light',
        'visited:underline',
      ],
      light: [
        'text-basics-white',
        'disabled:text-disabled disabled:underline',
        'hover:underline',
        'focus:ring-3 focus:rounded-xs focus:ring-basics-gray',
        'visited:underline',
      ],
    },
  },
})
