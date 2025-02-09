import type { UserDefinedOptions } from '@fullhuman/postcss-purgecss'

export interface ModuleOptions extends UserDefinedOptions {
  enabled?: boolean,
}

export const DEFAULTS: ModuleOptions = {
  content: [
    'components/**/*.{vue,jsx?,tsx?}',
    'layouts/**/*.{vue,jsx?,tsx?}',
    'pages/**/*.{vue,jsx?,tsx?}',
    'composables/**/*.{vue,jsx?,tsx?}',
    'App.{vue,jsx?,tsx?}',
    'app.{vue,jsx?,tsx?}',
    'plugins/**/*.{js,ts}',
    'nuxt.config.{js,ts}'
  ],
  defaultExtractor: (content) => {
    const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '') // Remove inline vue styles
    return contentWithoutStyleBlocks.match(/[\w-.:/]+(?<!:)/g) || [] // Default extractor
  },
  // Adapted from https://purgecss.com/guides/vue.html#usage
  safelist: [
    'body',
    'html',
    'nuxt-progress',
    '__nuxt',
    /-(leave|enter|appear)(|-(to|from|active))$/, // Normal transitions
    /^nuxt-link(|-exact)-active$/, // Nuxt link classes
    /^(?!cursor-move).+-move$/, // Move transitions
    /.*data-v-.*/, // Keep scoped styles
    // New Vue3 selectors
    /:slotted/,
    /:deep/,
    /:global/
  ]
}
