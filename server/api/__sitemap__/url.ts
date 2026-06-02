import { defineSitemapEventHandler } from '#imports'
import type { SitemapUrlInput } from '#sitemap/types'

export default defineSitemapEventHandler(() => {
    return [
        { loc: 'https://mirtu.kz', _sitemap: 'pages' },

        { loc: 'https://mirtu.kz/products/categories/1', _sitemap: 'pages' },
        { loc: 'https://mirtu.kz/products/categories/2', _sitemap: 'pages' },
        { loc: 'https://mirtu.kz/products/categories/3', _sitemap: 'pages' },
        { loc: 'https://mirtu.kz/products/categories/4', _sitemap: 'pages' },
        { loc: 'https://mirtu.kz/products/categories/5', _sitemap: 'pages' },
        { loc: 'https://mirtu.kz/products/categories/6', _sitemap: 'pages' },

        { loc: 'https://mirtu.kz/supports/return-order', _sitemap: 'pages' },
        { loc: 'https://mirtu.kz/supports/private-policy', _sitemap: 'pages' },

    ] satisfies SitemapUrlInput[]
})