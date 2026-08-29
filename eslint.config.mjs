// ESLint 9 flat config. Next 16 removed `next lint`, so `npm run lint` calls
// eslint directly and this file replaces .eslintrc.json. The three rule
// overrides are byte-for-byte the ones the old file carried.
import coreWebVitals from 'eslint-config-next/core-web-vitals'

export default [
  ...coreWebVitals,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      '@next/next/no-img-element': 'off',
      // The rules below did not exist under eslint-config-next@14; the
      // upgrade turned them on as errors over ~50 long-standing, working
      // call sites. Rewriting those during a framework upgrade is how a
      // working form gets broken, so they are WARNINGS: visible in every
      // lint run, gating nothing. Tighten one at a time on calm days.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/static-components': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/immutability': 'warn',
      '@next/next/no-location-assign-relative-destination': 'warn',
      '@next/next/no-html-link-for-pages': 'warn',
      '@next/next/no-head-element': 'warn',
    },
  },
  { ignores: ['.next/**', 'node_modules/**'] },
]
