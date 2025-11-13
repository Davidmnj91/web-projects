import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      screens: {
        mobile: '375px',
        desktop: '1080px',
      },
      colors: {
        europe: {
          light: '#45586A',
          DEFAULT: '#2E3B48',
          dark: '#030822',
        },
        gold: {
          light: '#FFCD004C',
          DEFAULT: '#FFCD00',
          dark: '#EBBD00',
        },
        star: {
          light: '#FCFDD6',
          DEFAULT: '#FCFF7D',
          dark: '#FBFF49',
        },
        basics: {
          white: '#FCFCFC',
          gray: '#F3F5F6',
          disabled: '#b5b5b566',
        },
        status: {
          success: '#8BC34A',
          warning: '#FBC16A',
          error: '#D65442',
        },
        overlay: '#0308227F',
      },
      fontFamily: {
        title: ['var(--font-cormorant)'],
        body: ['var(--font-ubuntu)'],
      },
      fontSize: {
        // Desktop heading font sizes
        'desktop-h-4xl': ['136px', '144px'],
        'desktop-h-3xl': ['100px', '108px'],
        'desktop-h-2xl': ['72px', '80px'],
        'desktop-h-xl': ['64px', '72px'],
        'desktop-h-lg': ['36px', '44px'],
        'desktop-h-md': ['32px', '40px'],
        'desktop-h-sm': ['16px', '24px'],
        // Tablet & mobile heading font sizes
        'mobile-h-4xl': ['72px', '80px'],
        'mobile-h-3xl': ['54px', '62px'],
        'mobile-h-2xl': ['48px', '56px'],
        'mobile-h-xl': ['32px', '40px'],
        'mobile-h-lg': ['24px', '32px'],
        'mobile-h-md': ['18px', '26px'],
        'mobile-h-sm': ['16px', '16px'],
        // Desktop body font sizes
        'desktop-b-2xl': ['34px', '42px'],
        'desktop-b-xl': ['24px', '32px'],
        'desktop-b-lg': ['20px', '28px'],
        'desktop-b-md': ['16px', '24px'],
        'desktop-b-sm': ['14px', '20px'],
        'desktop-b-xs': ['12px', '16px'],
        // Mobile body font sizes
        'mobile-b-2xl': ['24px', '32px'],
        'mobile-b-xl': ['20px', '28px'],
        'mobile-b-lg': ['16px', '24px'],
        'mobile-b-md': ['14px', '20px'],
        'mobile-b-sm': ['12px', '16px'],
        'mobile-b-xs': ['10px', '12px'],
      },
    },
  },
}
export default config
