function berekeBaseUrl(config) {
  return String(config.berekePaymentUrl || '').replace(/\/$/, '')
}

function parseBerekeBody(rawText) {
  if (!rawText) return null
  try {
    return JSON.parse(rawText)
  } catch {
    return rawText
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = berekeBaseUrl(config)
  const body = await readBody(event)
  const orderId = body?.orderId

  if (!orderId) {
    setResponseStatus(event, 400)
    return null
  }

  const params = new URLSearchParams()
  params.append('userName', config.berekePaymentLogin || '')
  params.append('password', config.berekePaymentPassword || '')
  params.append('orderId', String(orderId))

  const res = await fetch(`${baseUrl}/getOrderStatusExtended.do`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  const rawText = await res.text()
  setResponseStatus(event, res.status)
  return parseBerekeBody(rawText)
})
