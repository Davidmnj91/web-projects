import { ErrorMessage } from '@hookform/error-message'
import clsx from 'clsx'
import React from 'react'

import type { RichTranslation } from '@/types/types'
import type { FieldErrors } from 'react-hook-form'

import { typographyClasses } from '@/components/typography/typography'

export const labelStyles = typographyClasses({
  size: 'body-md',
  color: 'europe-dark',
})
export const inputStyles = clsx(
  'border-b h-10 w-full border-b border-europe-light bg-transparent text-europe-light placeholder-europe-light',
  [
    'focus:border-b-2 focus:border-europe-dark focus:text-europe-dark focus:outline-hidden',
    'hover:border-b-2 hover:border-europe-dark hover:text-europe-dark hover:outline-hidden',
  ],
)

export const checkboxStyles = clsx(
  'w-5 h-5 flex-[1_0_auto] accent-europe-dark bg-europe-light border-europe-light outline-0',
  ['focus:ring-2 focus:ring-europe-dark'],
)

export const errorHintStyles = typographyClasses({
  size: 'body-md',
  color: 'error',
})

export const ErrorField = ({
  name,
  errors,
  message,
}: {
  name: string
  errors: FieldErrors
  message: RichTranslation
}) => {
  return <ErrorMessage name={name} errors={errors} render={() => <span className={errorHintStyles}>{message}</span>} />
}
