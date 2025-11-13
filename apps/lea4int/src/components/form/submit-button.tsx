'use client'

import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useFormStatus } from 'react-dom'

import { buttonTypes } from '@/components/button/button'

export const SubmitButton = ({ isValid }: { isValid: boolean }) => {
  const { pending } = useFormStatus()
  const t = useTranslations('forms')

  return (
    <button
      className={clsx('self-end', buttonTypes({ intent: 'secondary-light' }))}
      type='submit'
      disabled={pending || !isValid}
    >
      {t('submit')}
    </button>
  )
}
