import { setRequestLocale } from 'next-intl/server'
import React from 'react'

import type { LanguagePageProps } from '@/i18n/config'
import type { JSX } from 'react'

import { FamilyForm } from '@/components/family-form/family-form'
import { IndividualForm } from '@/components/general-form/individual-form'
import { InstitutionForm } from '@/components/institution-form/institution-form'
import { PartnerForm } from '@/components/partner-form/partner-form'

export const dynamicParams = false

const roles: Record<string, JSX.Element> = {
  individual: <IndividualForm />,
  'host-family': <FamilyForm />,
  institutions: <InstitutionForm />,
  partner: <PartnerForm />,
}

export function generateStaticParams() {
  return Object.keys(roles).map((role) => ({
    role,
  }))
}

export default async function Page(props: LanguagePageProps<{ role: keyof typeof roles }>) {
  const params = await props.params

  const { locale, role } = params

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const coercedRole = roles[role] || <IndividualForm />

  setRequestLocale(locale)

  return <>{coercedRole}</>
}
