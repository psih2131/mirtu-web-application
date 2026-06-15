export function buildTelegramLink(value) {
  if (!value) return ''
  const raw = String(value).trim()
  if (/^https?:\/\//i.test(raw)) return raw
  if (raw.includes('t.me/')) return raw.startsWith('http') ? raw : `https://${raw.replace(/^\/\//, '')}`
  const username = raw.replace(/^@/, '').trim()
  return username ? `https://t.me/${username}` : ''
}

export function buildWhatsappLink(value) {
  if (!value) return ''
  const raw = String(value).trim()
  if (/^https?:\/\//i.test(raw) || raw.includes('wa.me') || raw.includes('whatsapp.com')) {
    return raw.startsWith('http') ? raw : `https://${raw}`
  }
  const digits = raw.replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}` : ''
}
