// // server/api/__sitemap__/wordpress.ts
// import { defineSitemapEventHandler } from '#imports'

// interface WPPost {
//     slug: string
//     modified: string
// }

// export default defineSitemapEventHandler(async () => {
//     const cars: WPPost[] = await $fetch('https://red-angels-server.ru/wp-json/wp/v2/cars?per_page=100')

//     return cars.map((post) => ({
//         loc: `https://red-angels.ru/autopark/${post.slug}`,       // локальный маршрут
//         lastmod: post.modified,                // дата последнего изменения
//         changefreq: 'weekly',
//         priority: 0.7
//     }))
// })