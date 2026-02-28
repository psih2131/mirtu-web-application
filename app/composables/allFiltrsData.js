export default async function useAllFiltrsData() {
  const config = useRuntimeConfig()
  let baseUrl = config.public.apiUrl

  const { data: allFiltrsData } = await useFetch(`${baseUrl}/api/filters`)

  return {
    allFiltrsData,
  }
}