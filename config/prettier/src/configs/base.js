/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
export const base = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  jsxSingleQuote: true,
  printWidth: 120,
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
