const REGISTER_FIELDS = [
  'orderNumber',
  'amount',
  'returnUrl',
  'failUrl',
  'currency',
  'language',
  'sessionTimeoutSecs',
  'description',
  'email',
]

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

  const params = new URLSearchParams()
  params.append('userName', config.berekePaymentLogin || '')
  params.append('password', config.berekePaymentPassword || '')

  for (const key of REGISTER_FIELDS) {
    const value = body[key]
    if (value !== '' && value != null && value !== undefined) {
      params.append(key, String(value))
    }
  }

  const res = await fetch(`${baseUrl}/register.do`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  const rawText = await res.text()
  let result = {
    baseUrl: baseUrl,
    login: config.berekePaymentLogin,
    password: config.berekePaymentPassword,
    params: params.toString(),
    requestData: res,
    responseData: rawText,
  }

  console.log('result:', result)
  setResponseStatus(event, res.status)
  return result
})
