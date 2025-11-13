'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { useTranslations } from 'next-intl'
import { Fragment, useEffect, useRef, useState } from 'react'

import { buttonTypes } from '@/components/button/button'
import { Typography } from '@/components/typography/typography'
import { defaultTranslationVales } from '@/i18n/translation-values'

const COOKIE_CONSENT = 'COOKIE_CONSENT'

export const CookieBanner = () => {
  const t = useTranslations('cookie-banner')
  const [showBanner, setShowBanner] = useState<boolean>(false)
  const [allowCookies, setAllowCookies] = useState<boolean>(false)
  const acceptCookiesButtonRef = useRef(null)

  useEffect(() => {
    if (!window.localStorage.getItem(COOKIE_CONSENT)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowBanner(true)
      return
    }

    if (window.localStorage.getItem(COOKIE_CONSENT) === 'true') {
      setAllowCookies(true)
    }
  }, [])

  const onAllowClick = () => {
    window.localStorage.setItem(COOKIE_CONSENT, 'true')
    setAllowCookies(true)
    setShowBanner(false)
  }

  const onRejectClick = () => {
    window.localStorage.setItem(COOKIE_CONSENT, 'false')
    setAllowCookies(false)
    setShowBanner(false)
  }

  return (
    <>
      {allowCookies && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />}
      <Transition appear show={showBanner} as={Fragment}>
        <Dialog
          aria-label='cookie banner'
          as='div'
          className='relative z-50'
          onClose={() => {
            /* empty */
          }}
          initialFocus={acceptCookiesButtonRef}
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

          <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
            <TransitionChild
              as={Fragment}
              enter='transform transition ease-in-out duration-300'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transform transition ease-in-out duration-300'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              <DialogPanel className='desktop:w-full absolute bottom-0 w-[375px] transform overflow-hidden shadow-xl transition-all'>
                <div className='bg-europe-light desktop:flex-row desktop:justify-around desktop:gap-24 desktop:py-5 flex flex-col items-center gap-5 px-6 py-10'>
                  <Typography size='body-sm' color='basics-white'>
                    {t.rich('message', defaultTranslationVales)}
                  </Typography>
                  <div className='desktop:w-auto flex w-full gap-8'>
                    <button
                      className={buttonTypes({ intent: 'primary' })}
                      ref={acceptCookiesButtonRef}
                      onClick={onAllowClick}
                    >
                      {t('accept')}
                    </button>
                    <button className={buttonTypes({ intent: 'secondary-light' })} onClick={onRejectClick}>
                      {t('reject')}
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
