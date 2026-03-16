/**
 * Список городов CDEK в Казахстане с кодами API CDEK (city_code)
 * Актуальные коды из API CDEK
 */

export interface CdekCity {
  name: string
  code: number
}

export const CDEK_KAZAKHSTAN_CITIES: CdekCity[] = [
  { name: 'Алматы', code: 4756 },
  { name: 'Астана', code: 4965 },
  { name: 'Шымкент', code: 5204 },
  { name: 'Караганда', code: 5082 },
  { name: 'Актобе', code: 5012 },
  { name: 'Атырау', code: 5021 },
  { name: 'Павлодар', code: 5135 },
  { name: 'Усть-Каменогорск', code: 5180 },
  { name: 'Тараз', code: 5175 },
  { name: 'Костанай', code: 5077 },
]
