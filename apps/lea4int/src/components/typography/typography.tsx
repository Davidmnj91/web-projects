import { cva, cx } from 'class-variance-authority'

import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps, ElementType, ReactElement } from 'react'

export type TypographyVariantProps = VariantProps<typeof typographyClasses> &
  Required<Pick<VariantProps<typeof typographyClasses>, 'size' | 'color'>>
export const typographyClasses = cva('', {
  variants: {
    size: {
      'heading-4xl': 'font-title text-mobile-h-4xl desktop:text-desktop-h-4xl',
      'heading-3xl': 'font-title text-mobile-h-3xl desktop:text-desktop-h-3xl',
      'heading-2xl': 'font-title text-mobile-h-2xl desktop:text-desktop-h-2xl',
      'heading-xl': 'font-title text-mobile-h-xl desktop:text-desktop-h-xl',
      'heading-lg': 'font-title text-mobile-h-lg desktop:text-desktop-h-lg',
      'heading-md': 'font-title text-mobile-h-md desktop:text-desktop-h-md',
      'heading-sm': 'font-title text-mobile-h-sm desktop:text-desktop-h-sm',
      'body-2xl': 'font-body text-mobile-b-2xl desktop:text-desktop-b-2xl',
      'body-xl': 'font-body text-mobile-b-xl desktop:text-desktop-b-xl',
      'body-lg': 'font-body text-mobile-b-lg desktop:text-desktop-b-lg',
      'body-md': 'font-body text-mobile-b-md desktop:text-desktop-b-md',
      'body-sm': 'font-body text-mobile-b-sm desktop:text-desktop-b-sm',
      'body-xs': 'font-body text-mobile-b-xs desktop:text-desktop-b-xs',
    },
    color: {
      europe: 'text-europe',
      'europe-light': 'text-europe-light',
      'europe-dark': 'text-europe-dark',
      gold: 'text-gold',
      'gold-light': 'text-gold-light',
      'gold-dark': 'text-gold-dark',
      star: 'text-star',
      'star-light': 'text-star-light',
      'star-dark': 'text-star-dark',
      'basics-white': 'text-basics-white',
      'basics-gray': 'text-basics-gray',
      'basics-disabled': 'text-basics-disabled',
      success: 'text-status-success',
      warning: 'text-status-warning',
      error: 'text-status-error',
      overlay: 'text-overlay',
    },
    weight: {
      normal: 'font-normal',
      bold: 'font-bold',
      light: 'font-light',
    },
  },
  defaultVariants: {
    weight: 'normal',
  },
})

type TypographyProps<Element extends ElementType> = TypographyVariantProps &
  Omit<ComponentProps<Element>, 'as'> & {
    as?: Element
  }
export const Typography = <Element extends ElementType = 'span'>({
  as,
  size,
  color,
  weight,
  children,
  className,
  ...rest
}: TypographyProps<Element>): ReactElement => {
  const Component = as ?? ('span' as const)

  return (
    <Component className={cx(typographyClasses({ size, color, weight }), className)} {...rest}>
      {children}
    </Component>
  )
}
