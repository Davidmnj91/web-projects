'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useLocale, useTranslations } from 'next-intl'
import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { useForm } from 'react-hook-form'

import type { ContactUsState } from '@/actions/contactUs'
import type { HostFamilyFormData } from '@/types/contact'
import type { FieldPath, Resolver } from 'react-hook-form'

import { getContactUs } from '@/actions/contactUs'
import { checkboxStyles, ErrorField, inputStyles, labelStyles } from '@/components/form/form'
import { FormLoadingPopup } from '@/components/form/form-loading'
import { FormResultPopup } from '@/components/form/form-result'
import { SubmitButton } from '@/components/form/submit-button'
import { useCaptcha } from '@/hooks/useCaptcha'
import { defaultTranslationVales } from '@/i18n/translation-values'
import { HostFamilyContactSchema } from '@/schemas/contactSchemas'

export const FamilyForm = () => {
  const [state, formAction] = useActionState<ContactUsState, FormData>(useCaptcha(getContactUs), null)
  const { pending } = useFormStatus()
  const [showPopup, setShowPopup] = useState(false)
  const [serverError, setServerError] = useState<boolean>(false)

  const {
    register,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<HostFamilyFormData>({
    mode: 'all',
    resolver: zodResolver(HostFamilyContactSchema) as Resolver<HostFamilyFormData>,
  })

  const t = useTranslations('forms')
  const locale = useLocale()

  useEffect(() => {
    if (!state) {
      return
    }
    if (state.status === 'VALIDATION_ERROR') {
      state.errors.forEach((error) => {
        setError(error.path as FieldPath<HostFamilyFormData>, {
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
      <form className='desktop:flex-row desktop:gap-16 flex flex-col justify-center gap-8' action={formAction}>
        <FormLoadingPopup show={pending} />
        <input type='hidden' name='language' value={locale} />
        <input type='hidden' name='type' value='FAMILY' />
        <div className='desktop:flex-[0_0_50%] flex flex-col gap-9'>
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
            <label htmlFor='email' className={labelStyles}>
              {t('input.email.label')}
            </label>
            <input
              id='email'
              {...register('email')}
              className={inputStyles}
              placeholder={t('input.email.placeholder')}
            />
            <ErrorField name='email' errors={errors} message={t('input.email.error')} />
          </div>
          <div>
            <label htmlFor='phone' className={labelStyles}>
              {t('input.phone.label')}
            </label>
            <input
              id='phone'
              {...register('phone')}
              className={inputStyles}
              placeholder={t('input.phone.placeholder')}
            />
            <ErrorField name='phone' errors={errors} message={t('input.phone.error')} />
          </div>
          <div>
            <label htmlFor='city' className={labelStyles}>
              {t('input.city.label')}
            </label>
            <input id='city' {...register('city')} className={inputStyles} placeholder={t('input.city.placeholder')} />
            <ErrorField name='city' errors={errors} message={t('input.city.error')} />
          </div>
          <div>
            <label htmlFor='zipCode' className={labelStyles}>
              {t('input.zipCode.label')}
            </label>
            <input
              id='zipCode'
              {...register('zipCode')}
              className={inputStyles}
              placeholder={t('input.zipCode.placeholder')}
            />
            <ErrorField name='zipCode' errors={errors} message={t('input.zipCode.error')} />
          </div>
        </div>
        <div className='desktop:flex-[0_0_50%] flex flex-col gap-9'>
          <div>
            <label htmlFor='hostSize' className={labelStyles}>
              {t('input.hostSize.label')}
            </label>
            <input
              id='hostSize'
              type='number'
              min='1'
              step='1'
              {...register('hostSize')}
              className={inputStyles}
              placeholder={t('input.hostSize.placeholder')}
            />
            <ErrorField name='hostSize' errors={errors} message={t('input.hostSize.error')} />
          </div>
          <div>
            <label htmlFor='message' className={labelStyles}>
              {t('input.message.label')}
            </label>
            <textarea
              id='message'
              rows={9}
              {...register('message')}
              className={clsx('h-[250px]', inputStyles)}
              placeholder={t('input.message.placeholder')}
            />
            <ErrorField name='message' errors={errors} message={t('input.message.error')} />
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
        </div>
      </form>
    </>
  )
}
