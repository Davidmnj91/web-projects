'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useLocale, useTranslations } from 'next-intl'
import { useActionState, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import type { ContactUsState } from '@/actions/contactUs'
import type { PartnerFormData } from '@/types/contact'
import type { FieldPath, Resolver } from 'react-hook-form'

import { getContactUs } from '@/actions/contactUs'
import { checkboxStyles, ErrorField, inputStyles, labelStyles } from '@/components/form/form'
import { FormLoadingPopup } from '@/components/form/form-loading'
import { FormResultPopup } from '@/components/form/form-result'
import { SubmitButton } from '@/components/form/submit-button'
import { useCaptcha } from '@/hooks/useCaptcha'
import { defaultTranslationVales } from '@/i18n/translation-values'
import { PartnerContactSchema } from '@/schemas/contactSchemas'

export const PartnerForm = () => {
  const [state, formAction, pending] = useActionState<ContactUsState, FormData>(useCaptcha(getContactUs), null)
  const [showPopup, setShowPopup] = useState(false)
  const [serverError, setServerError] = useState<boolean>(false)

  const {
    register,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<PartnerFormData>({
    mode: 'all',
    resolver: zodResolver(PartnerContactSchema) as Resolver<PartnerFormData>,
  })

  const t = useTranslations('forms')
  const locale = useLocale()

  useEffect(() => {
    if (!state) {
      return
    }
    if (state.status === 'VALIDATION_ERROR') {
      state.errors.forEach((error) => {
        setError(error.path as FieldPath<PartnerFormData>, {
          message: error.message,
        })
      })
      return
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowPopup(true)
    if (state.status === 'INTERNAL_ERROR') {
      setServerError(true)
    }
    if (state.status === 'SUCCESS') {
      reset()
    }
  }, [state, setError, reset])

  return (
    <>
      <FormResultPopup state={serverError ? 'error' : 'success'} open={showPopup} onClose={() => setShowPopup(false)} />
      <form className='flex flex-col justify-center gap-9' action={formAction}>
        <FormLoadingPopup show={pending} />
        <input type='hidden' name='language' value={locale} />
        <input type='hidden' name='type' value='PARTNER' />
        <div>
          <label htmlFor='name' className={labelStyles}>
            {t('input.name.label')}
          </label>
          <input id='name' {...register('name')} className={inputStyles} placeholder={t('input.name.placeholder')} />
          <ErrorField name='name' errors={errors} message={t('input.name.error')} />
        </div>
        <div>
          <label htmlFor='lastname' className={labelStyles}>
            {t('input.lastname.label')}
          </label>
          <input
            id='lastname'
            {...register('lastname')}
            className={inputStyles}
            placeholder={t('input.lastname.placeholder')}
          />
          <ErrorField name='lastname' errors={errors} message={t('input.lastname.error')} />
        </div>
        <div>
          <label htmlFor='applicantName' className={labelStyles}>
            {t('input.applicantName.label')}
          </label>
          <input
            id='applicantName'
            {...register('applicantName')}
            className={inputStyles}
            placeholder={t('input.applicantName.placeholder')}
          />
          <ErrorField name='applicantName' errors={errors} message={t('input.applicantName.error')} />
        </div>
        <div>
          <label htmlFor='email' className={labelStyles}>
            {t('input.email.label')}
          </label>
          <input id='email' {...register('email')} className={inputStyles} placeholder={t('input.email.placeholder')} />
          <ErrorField name='email' errors={errors} message={t('input.email.error')} />
        </div>
        <div>
          <label htmlFor='projectDescription' className={labelStyles}>
            {t('input.projectDescription.label')}
          </label>
          <textarea
            id='projectDescription'
            rows={9}
            {...register('projectDescription', { required: true })}
            className={clsx('h-[250px]', inputStyles)}
            placeholder={t('input.projectDescription.placeholder')}
          />
          <ErrorField name='projectDescription' errors={errors} message={t('input.projectDescription.error')} />
        </div>
        <div className='flex flex-col'>
          <div className='flex items-center gap-4'>
            <input type='checkbox' id='terms' {...register('terms')} className={checkboxStyles} />
            <label htmlFor='terms' className={clsx('text-b-sm', labelStyles)}>
              {t.rich('input.terms.label', defaultTranslationVales)}
            </label>
          </div>
          <ErrorField name='terms' errors={errors} message={t.rich('input.terms.error', defaultTranslationVales)} />
        </div>
        <SubmitButton isValid={isValid} />
      </form>
    </>
  )
}
