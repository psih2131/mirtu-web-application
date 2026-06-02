export function convertProductCard(product) {
  return {
    spu: product.basicInfo?.spuPoizon || '',
    slug: product.displayInfo?.slug || '',
    article: product.basicInfo?.articlePoizon || '',
    title: product.displayInfo?.display_title || '',
    subtitle: product.basicInfo?.title || '',
    price:
      product.displayInfo?.displayPriceAmount +
      ' ' +
      (product.displayInfo?.displayPriceCurrencySymbol || ''),
    price_amount: product.displayInfo?.displayPriceAmount || '',
    currency_code: product.displayInfo?.displayPriceCurrency || '',
    img: product.displayInfo?.display_image,
    category: product.basicInfo?.category?.category_ru || '',
    style: product.displayInfo?.display_style || '',
  }
}

function buildCardsRequestBody({
  categoryIds = [],
  brandIds = [],
  seriesIds = [],
  genders = [],
  sortBy = null,
  sortOrder = null,
  minPrice,
  maxPrice,
} = {}) {
  const body = {}
  if (categoryIds.length) body.category_ids = categoryIds
  if (brandIds.length) body.brand_ids = brandIds
  if (seriesIds.length) body.series_ids = seriesIds
  if (genders.length) body.genders = genders
  if (sortBy) {
    body.sort_by = sortBy
    body.sort_order = sortOrder
  }
  if (minPrice > 0) body.min_price = minPrice
  if (maxPrice != null && maxPrice < 1000000) body.max_price = maxPrice
  return body
}

export async function useCardsProducts(options = {}) {
  const {
    categoryIds = [],
    brandIds = [],
    seriesIds = [],
    genders = [],
    limit = 12,
    offset = 0,
    sortBy = null,
    sortOrder = null,
    minPrice,
    maxPrice,
    key,
  } = options

  const apiUrlDomain = useRuntimeConfig().public.apiUrl
  const apiBase = apiUrlDomain.endsWith('/api')
    ? apiUrlDomain
    : apiUrlDomain.replace(/\/?$/, '') + '/api'

  const body = buildCardsRequestBody({
    categoryIds,
    brandIds,
    seriesIds,
    genders,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
  })

  const fetchKey =
    key ??
    `cards-${categoryIds.join('-')}-${brandIds.join('-')}-${seriesIds.join('-')}-${limit}-${offset}`

  const { data } = await useFetch(`${apiBase}/cards`, {
    method: 'POST',
    body,
    query: { limit, offset },
    key: fetchKey,
  })

  const products = computed(() =>
    (data.value?.cards ?? []).map(convertProductCard)
  )

  const totalCount = computed(() => data.value?.total_count ?? 0)

  return { products, data, totalCount }
}
