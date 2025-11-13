'use client'

import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import useEmblaCarousel from 'embla-carousel-react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'

import type { EmblaCarouselType } from 'embla-carousel'

import { buttonTypes } from '@/components/button/button'
import { Typography } from '@/components/typography/typography'

export const CommitmentsCarousel = () => {
  const [carouselRef, carouselApi] = useEmblaCarousel({ loop: true })
  const t = useTranslations()

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const scrollPrev = useCallback(() => carouselApi?.scrollPrev(), [carouselApi])
  const scrollNext = useCallback(() => carouselApi?.scrollNext(), [carouselApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!carouselApi) return

    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect(carouselApi)
    carouselApi.on('reInit', onSelect)
    carouselApi.on('select', onSelect)
  }, [carouselApi, onSelect])

  const slides = [
    {
      title: t('commitments-carousel.standards.title'),
      description: t.raw('commitments-carousel.standards.description'),
    },
    {
      title: t('commitments-carousel.team.title'),
      description: t.raw('commitments-carousel.team.description'),
    },
    {
      title: t('commitments-carousel.approach.title'),
      description: t.raw('commitments-carousel.approach.description'),
    },
  ]

  return (
    <div className='overflow-hidden' ref={carouselRef}>
      <div className='desktop:min-h-[337px] desktop:w-[440px] flex w-full'>
        {slides.map(({ title, description }, index) => (
          <div key={index} className='bg-basics-gray flex min-w-0 flex-[0_0_100%] flex-col justify-between p-6'>
            <div>
              <Typography as='span' size='heading-sm' color='gold-dark'>
                {`${(index + 1).toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}/${slides.length}`}
              </Typography>
              <Typography as='h3' size='heading-lg' color='europe-dark'>
                {title}
              </Typography>
              <Typography
                as='p'
                size='body-lg'
                color='europe-dark'
                className='mt-9'
                dangerouslySetInnerHTML={{ __html: description }}
              ></Typography>
            </div>
          </div>
        ))}
      </div>
      <div className='bg-basics-gray desktop:justify-start flex justify-center gap-6 p-6'>
        <button
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          className={buttonTypes({
            intent: 'secondary-light',
            type: 'icon',
          })}
        >
          <CaretLeftIcon size={32} />
        </button>
        <button
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          className={buttonTypes({
            intent: 'secondary-light',
            type: 'icon',
          })}
        >
          <CaretRightIcon size={32} />
        </button>
      </div>
    </div>
  )
}
