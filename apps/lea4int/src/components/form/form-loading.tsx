'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import React, { Fragment } from 'react'

import { Typography } from '@/components/typography/typography'

export const FormLoadingPopup = ({ show }: { show: boolean }) => {
  const t = useTranslations('forms.loading')

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        aria-label='loading form'
        as='div'
        className='relative z-50'
        onClose={() => {
          /* empty */
        }}
      >
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
                <div className='flex flex-col items-center justify-center gap-4 py-8 text-center'>
                  <SpinnerGapIcon size={48} className='animate-spin' />
                  <Typography as='h3' size='heading-lg' color='europe-dark'>
                    {t('title')}
                  </Typography>
                  <Typography size='body-md' color='europe'>
                    {t('description')}
                  </Typography>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
