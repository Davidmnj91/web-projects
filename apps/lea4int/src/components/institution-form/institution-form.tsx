'use client'

import 'react-datepicker/dist/react-datepicker.css'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useLocale, useTranslations } from 'next-intl'
import React, { useActionState, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'

import countries from '../../../public/countries.json'

import type { ContactUsState } from '@/actions/contactUs'
import type { InstitutionFormData } from '@/types/contact'
import type { FieldPath, Resolver } from 'react-hook-form'

import { getContactUs } from '@/actions/contactUs'
import { checkboxStyles, ErrorField, inputStyles, labelStyles } from '@/components/form/form'
import { FormLoadingPopup } from '@/components/form/form-loading'
import { FormResultPopup } from '@/components/form/form-result'
import { SubmitButton } from '@/components/form/submit-button'
import { defaultTranslationVales } from '@/i18n/translation-values'
import { InstitutionsContactSchema } from '@/schemas/contactSchemas'

const accommodationTypes = ['apartment', 'student-residence', 'hotel', 'hostel', 'host-family', 'airbnb']

const roomTypes = ['single', 'double', 'triple', 'quadruple']

const boardTypes = ['self-catering', 'Breakfast', 'half-board', 'full-board']

const roundTripOptions = ['yes', 'arrival', 'departure', 'no']

const culturalOptions = ['yes', 'no']

export const InstitutionForm = () => {
  const [state, formAction, pending] = useActionState<ContactUsState, FormData>(getContactUs, null)
  const [showPopup, setShowPopup] = useState(false)
  const [serverError, setServerError] = useState<boolean>(false)

  const {
    register,
    control,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<InstitutionFormData>({
    mode: 'all',
    resolver: zodResolver(InstitutionsContactSchema) as Resolver<InstitutionFormData>,
  })

  const t = useTranslations('forms')
  const locale = useLocale()

  useEffect(() => {
    if (!state) {
      return
    }
    if (state.status === 'VALIDATION_ERROR') {
      state.errors.forEach((error) => {
        setError(error.path as FieldPath<InstitutionFormData>, {
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

  const parseDateRangeStr = (value: string): [Date | undefined, Date | undefined] => {
    const [from, to] = value.split('-')
    return [from !== 'undefined' ? new Date(from) : undefined, to !== 'undefined' ? new Date(to) : undefined]
  }

  return (
    <>
      <FormResultPopup state={serverError ? 'error' : 'success'} open={showPopup} onClose={() => setShowPopup(false)} />
      <form className='desktop:flex-row desktop:gap-16 flex flex-col justify-center gap-8' action={formAction}>
        <FormLoadingPopup show={pending} />
        <input type='hidden' name='language' value={locale} />
        <input type='hidden' name='type' value='INSTITUTION' />
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
            <label htmlFor='nationality' className={labelStyles}>
              {t('input.nationality.label')}
            </label>
            <select id='service' className={inputStyles} {...register('nationality')}>
              {countries.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <ErrorField name='nationality' errors={errors} message={t('input.nationality.error')} />
          </div>
          <div>
            <label htmlFor='institutionName' className={labelStyles}>
              {t('input.institutionName.label')}
            </label>
            <input
              id='institutionName'
              {...register('institutionName')}
              className={inputStyles}
              placeholder={t('input.institutionName.placeholder')}
            />
            <ErrorField name='institutionName' errors={errors} message={t('input.institutionName.error')} />
          </div>
          <div>
            <label htmlFor='city' className={labelStyles}>
              {t('input.city.label')}
            </label>
            <input id='city' {...register('city')} className={inputStyles} placeholder={t('input.city.placeholder')} />
            <ErrorField name='city' errors={errors} message={t('input.city.error')} />
          </div>
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
        </div>
        <div className='desktop:flex-[0_0_50%] flex flex-col gap-9'>
          <div>
            <div className='flex flex-col'>
              <label htmlFor='dateRange' className={labelStyles}>
                {t('input.dateRange.label')}
              </label>
              <Controller
                control={control}
                name='dateRange'
                render={({ field: { onChange, value, name } }) => (
                  <DatePicker
                    className='block w-full'
                    name={name}
                    selected={value ? parseDateRangeStr(value)[0] : undefined}
                    onChange={([from, to]) => onChange(`${from?.toDateString()}-${to?.toDateString()}`)}
                    startDate={value ? parseDateRangeStr(value)[0] : undefined}
                    endDate={value ? parseDateRangeStr(value)[1] : undefined}
                    selectsRange
                  />
                )}
              />
            </div>
            <ErrorField name='dateRange' errors={errors} message={t('input.dateRange.error')} />
          </div>
          <div>
            <label htmlFor='supervisorNumber' className={labelStyles}>
              {t('input.supervisorNumber.label')}
            </label>
            <input
              id='supervisorNumber'
              type='number'
              min='1'
              step='1'
              {...register('supervisorNumber', { valueAsNumber: true })}
              className={inputStyles}
              placeholder={t('input.supervisorNumber.placeholder')}
            />
            <ErrorField name='supervisorNumber' errors={errors} message={t('input.supervisorNumber.error')} />
          </div>
          <div>
            <label htmlFor='accommodationType' className={labelStyles}>
              {t('input.accommodationType.label')}
            </label>
            <select id='accommodationType' className={inputStyles} {...register('accommodationType')}>
              {accommodationTypes.map((accommodationType) => (
                <option key={accommodationType} value={accommodationType}>
                  {t(`input.accommodationType.options.${accommodationType}`)}
                </option>
              ))}
            </select>
            <ErrorField name='accommodationType' errors={errors} message={t('input.accommodationType.error')} />
          </div>
          <div>
            <label htmlFor='roomType' className={labelStyles}>
              {t('input.roomType.label')}
            </label>
            <select id='roomType' className={inputStyles} {...register('roomType')}>
              {roomTypes.map((roomType) => (
                <option key={roomType} value={roomType}>
                  {t(`input.roomType.options.${roomType}`)}
                </option>
              ))}
            </select>
            <ErrorField name='roomType' errors={errors} message={t('input.roomType.error')} />
          </div>
          <div>
            <label htmlFor='boardType' className={labelStyles}>
              {t('input.boardType.label')}
            </label>
            <select id='boardType' className={inputStyles} {...register('boardType')}>
              {boardTypes.map((boardType) => (
                <option key={boardType} value={boardType}>
                  {t(`input.boardType.options.${boardType}`)}
                </option>
              ))}
            </select>
            <ErrorField name='boardType' errors={errors} message={t('input.boardType.error')} />
          </div>
          <div>
            <label htmlFor='roundTripIncluded' className={labelStyles}>
              {t('input.roundTripIncluded.label')}
            </label>
            <select id='roundTripIncluded' className={inputStyles} {...register('roundTripIncluded')}>
              {roundTripOptions.map((option) => (
                <option key={option} value={option}>
                  {t(`input.roundTripIncluded.options.${option}`)}
                </option>
              ))}
            </select>
            <ErrorField name='roundTripIncluded' errors={errors} message={t('input.roundTripIncluded.error')} />
          </div>
          <div>
            <label htmlFor='culturalActivitiesIncluded' className={labelStyles}>
              {t('input.culturalActivitiesIncluded.label')}
            </label>
            <select id='culturalActivitiesIncluded' className={inputStyles} {...register('culturalActivitiesIncluded')}>
              {culturalOptions.map((option) => (
                <option key={option} value={option}>
                  {t(`input.culturalActivitiesIncluded.options.${option}`)}
                </option>
              ))}
            </select>
            <ErrorField
              name='culturalActivitiesIncluded'
              errors={errors}
              message={t('input.culturalActivitiesIncluded.error')}
            />
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
