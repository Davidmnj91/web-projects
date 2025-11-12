'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react/dist/ssr'
import { useTranslations } from 'next-intl'
import React, { Fragment, useState } from 'react'
import ReactPlayer from 'react-player'

import type { youtube_v3 } from 'googleapis'

import { buttonTypes } from '@/components/button/button'
import { usePagination } from '@/hooks/usePagination'
import { Contact } from '@/types/contact'

const VIDEOS_PER_PAGE = 4

interface VideoBlogProps {
  videos: youtube_v3.Schema$SearchListResponse
}
export const VideoBlog = ({ videos }: VideoBlogProps) => {
  const t = useTranslations('blog-page')
  const [selectedVideo, setSelectedVideo] = useState<youtube_v3.Schema$SearchResult>()
  const [isOpen, setIsOpen] = useState(false)

  const { currentItems, currentPage, totalPages, goToPage, canGoNextPage, canGoPrevPage, paginationLinks } =
    usePagination(videos.items ?? [], VIDEOS_PER_PAGE, 5)

  const selectVideo = (item: youtube_v3.Schema$SearchResult) => {
    setSelectedVideo(item)
    setIsOpen(true)
  }

  return (
    <div className='desktop:gap-9 desktop:px-12 flex flex-col gap-6 px-6'>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog aria-label='vieo player' as='div' className='relative z-10' onClose={() => setIsOpen(false)}>
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
                <DialogPanel className='transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <ReactPlayer
                    style={{
                      width: '90vw',
                      height: 'auto',
                      aspectRatio: '16/9',
                    }}
                    autoPlay
                    src={`https://www.youtube.com/watch?v=${selectedVideo?.id?.videoId}`}
                  />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className='desktop:grid-cols-2 desktop:gap-9 grid grid-cols-1 gap-6'>
        {currentItems()
          .filter((item) => item.id?.videoId !== undefined)
          .map((item) => (
            <div key={item.id?.videoId} className='flex h-[348px]'>
              <a
                aria-label={item.snippet?.title ?? 'youtube video'}
                href={`https://www.youtube.com/watch?v=${item.id?.videoId}`}
                target={'_blank'}
                className='desktop:hidden flex flex-auto items-center justify-center bg-cover bg-center bg-no-repeat'
                style={{
                  backgroundImage: `url(${item.snippet?.thumbnails?.high?.url ?? ''})`,
                }}
                rel='noreferrer'
              />
              <button
                onClick={() => selectVideo(item)}
                className='desktop:flex hidden flex-auto items-center justify-center bg-cover bg-center bg-no-repeat'
                style={{
                  backgroundImage: `url(${item.snippet?.thumbnails?.high?.url ?? ''})`,
                }}
              />
            </div>
          ))}
      </div>
      <div className='desktop:flex-row desktop:justify-between desktop:gap-0 flex flex-col items-center gap-6'>
        {totalPages() > 1 && (
          <nav className='flex gap-2.5'>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={!canGoPrevPage()}
              className={buttonTypes({
                type: 'icon',
                intent: 'secondary-light',
              })}
            >
              <CaretLeftIcon size={22} />
            </button>
            {paginationLinks().map((i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                disabled={currentPage === i}
                className={buttonTypes({
                  type: 'icon',
                  intent: 'secondary-light',
                })}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={!canGoNextPage()}
              className={buttonTypes({
                type: 'icon',
                intent: 'secondary-light',
              })}
            >
              <CaretRightIcon size={22} />
            </button>
          </nav>
        )}
        <a
          aria-label='lea4int youtube'
          href={Contact.youtube}
          target={'_blank'}
          className={buttonTypes({ intent: 'primary' })}
          rel='noreferrer'
        >
          {t('visit-chanel')}
        </a>
      </div>
    </div>
  )
}
