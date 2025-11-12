import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { CheckCircleIcon, WarningCircleIcon, XIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import React, { Fragment } from 'react'

import { buttonTypes } from '@/components/button/button'
import { Typography } from '@/components/typography/typography'
import { defaultTranslationVales } from '@/i18n/translation-values'

interface FormResultProps {
  state: 'success' | 'error'
  open: boolean
  onClose: () => void
}
export const FormResultPopup = ({ state, open, onClose }: FormResultProps) => {
  const t = useTranslations('forms.feedback')

  if (!open) return null

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog aria-label='form result' as='div' className='relative z-50' onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='flex w-[354px] transform flex-col gap-4 overflow-hidden rounded-2xl bg-white px-6 py-4 text-left align-middle shadow-xl transition-all'>
                <button onClick={onClose} className='text-europe self-end'>
                  <XIcon size={32} />
                </button>
                <div className='flex flex-col items-center justify-center gap-4 pt-4 pb-16 text-center'>
                  {state === 'success' ? (
                    <CheckCircleIcon size={38} className='text-status-success' />
                  ) : (
                    <WarningCircleIcon size={38} className='text-status-error' />
                  )}
                  <Typography as='h3' size='heading-lg' color='europe-dark'>
                    {t(`${state}.title`)}
                  </Typography>
                  <Typography size='body-md' color='europe'>
                    {t.rich(`${state}.description`, defaultTranslationVales)}
                  </Typography>
                  <span className='border-b-europe-light h-1 w-full grow border-b' />
                  <Typography size='body-md' color='europe'>
                    {t.rich(`${state}.sub-description`, defaultTranslationVales)}
                  </Typography>
                  <button className={buttonTypes({ intent: 'secondary-light' })} onClick={onClose}>
                    {t('close')}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
