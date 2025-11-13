import { Column, Text } from '@react-email/components'

import emails from '../../messages/emails.json'

import type { Language } from '@/i18n/config'
import type {
  ContactEmailProps,
  HostFamilyFormData,
  IndividualFormData,
  InstitutionFormData,
  PartnerFormData,
} from '@/types/contact'

interface GeneralContactDetailsProps {
  data: IndividualFormData
  language: Language
}
export const GeneralContactDetails = ({ data, language }: GeneralContactDetailsProps) => {
  const t = emails[language].fields
  return (
    <Column>
      <Text className='text-desktop-b-md text-europe'>
        {t.service}: <strong>{data.service}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.name}: <strong>{data.name}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.lastname}: <strong>{data.lastname}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.email}: <strong>{data.email}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.phone}: <strong>{data.phone}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.nationality}: <strong>{data.nationality}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.message}: <strong>{data.message}</strong>
      </Text>
    </Column>
  )
}

interface HostFamilyContactDetailsProps {
  data: HostFamilyFormData
  language: Language
}
export const HostFamilyContactDetails = ({ data, language }: HostFamilyContactDetailsProps) => {
  const t = emails[language].fields
  return (
    <Column>
      <Text className='text-desktop-b-md text-europe'>
        {t.name}: <strong> {data.name}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.lastname}: <strong> {data.lastname}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.email}: <strong> {data.email}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.phone}: <strong> {data.phone}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.city}: <strong> {data.city}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.zipCode}: <strong> {data.zipCode}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.hostSize}: <strong> {data.hostSize}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.message}: <strong> {data.message}</strong>
      </Text>
    </Column>
  )
}

interface InstitutionContactDetailsProps {
  data: InstitutionFormData
  language: Language
}
export const InstitutionContactDetails = ({ data, language }: InstitutionContactDetailsProps) => {
  const t = emails[language].fields
  return (
    <Column>
      <Text className='text-desktop-b-md text-europe'>
        {t.name}: <strong> {data.name}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.lastname}: <strong> {data.lastname}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.email}: <strong> {data.email}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.phone}: <strong> {data.phone}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.nationality}: <strong> {data.nationality}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.institutionName}: <strong> {data.institutionName}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.city}: <strong> {data.city}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.hostSize}: <strong> {data.hostSize}</strong>
      </Text>
      {data.dateRange && (
        <Text className='text-desktop-b-md text-europe'>
          {t.dateRange}: <strong>{`${data.dateRange}`}</strong>
        </Text>
      )}
      <Text className='text-desktop-b-md text-europe'>
        {t.supervisorNumber}: <strong> {data.supervisorNumber}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.accommodationType}: <strong> {data.accommodationType}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.roomType}: <strong> {data.roomType}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.boardType}: <strong> {data.boardType}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.roundTripIncluded}: <strong> {data.roundTripIncluded}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.culturalActivitiesIncluded}: <strong> {data.culturalActivitiesIncluded}</strong>
      </Text>
    </Column>
  )
}

interface PartnerContactDetailsProps {
  data: PartnerFormData
  language: Language
}
export const PartnerContactDetails = ({ data, language }: PartnerContactDetailsProps) => {
  const t = emails[language].fields
  return (
    <Column>
      <Text className='text-desktop-b-md text-europe'>
        {t.name}: <strong> {data.name}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.lastname}: <strong> {data.lastname}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.applicantName}: <strong> {data.applicantName}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.email}: <strong> {data.email}</strong>
      </Text>
      <Text className='text-desktop-b-md text-europe'>
        {t.projectDescription}: <strong> {data.projectDescription}</strong>
      </Text>
    </Column>
  )
}

export const FormSummary = ({ language, contactData }: ContactEmailProps) => {
  switch (contactData.type) {
    case 'INDIVIDUAL':
      return <GeneralContactDetails data={contactData.data} language={language} />
    case 'FAMILY':
      return <HostFamilyContactDetails data={contactData.data} language={language} />
    case 'INSTITUTION':
      return <InstitutionContactDetails data={contactData.data} language={language} />
    case 'PARTNER':
      return <PartnerContactDetails data={contactData.data} language={language} />
  }
}
