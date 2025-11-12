import { ChatCircleTextIcon } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { buttonTypes } from '@/components/button/button'

export const ContactUs = () => {
  const t = useTranslations('contact-us')

  return (
    <>
      {/*Mobile version*/}
      <Link
        href={'/contact/individual'}
        className={clsx(
          'desktop:hidden fixed right-6 bottom-10 z-20',
          buttonTypes({ intent: 'primary', type: 'icon' }),
        )}
      >
        <ChatCircleTextIcon size={24} />
      </Link>
      {/*Desktop version*/}
      <Link
        href={'/contact/individual'}
        className={clsx(
          'desktop:inline-flex mobile:hidden fixed right-10 bottom-10 z-20',
          buttonTypes({ intent: 'primary', type: 'button' }),
        )}
      >
        {t('text')}
      </Link>
    </>
  )
}
