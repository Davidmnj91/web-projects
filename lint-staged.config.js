/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*': ['prettier --write --list-different', 'pnpm --filter ./... turbo run lint --parallel'],
  '**/*.{md,mdx}': ['markdownlint'],
}
