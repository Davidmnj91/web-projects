import { useTranslations } from 'next-intl'

import { BigButton } from '@/components/button/big-button'
import { Typography } from '@/components/typography/typography'
import { defaultTranslationVales } from '@/i18n/translation-values'

export const BecomePartner = () => {
  const t = useTranslations('become-partner')

  return (
    <div className='bg-europe desktop:bg-transparent flex justify-center py-14'>
      <div className='bg-europe desktop:p-14 flex flex-col gap-9 p-6'>
        <Typography as='h2' size='heading-2xl' color='basics-white' className='desktop:text-left text-center'>
          {t('title')}
        </Typography>
        <Typography as='p' size='body-lg' color='basics-white'>
          {t.rich('description', defaultTranslationVales)}
        </Typography>
        <BigButton subject={t('button.title')} caption={t('button.caption')} href={'/contact/partner'} />
      </div>
    </div>
  )
}
