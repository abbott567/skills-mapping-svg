import { format } from 'date-fns'

export function getTodayDate () {
  const today = new Date()
  const prettyDate = format(today, 'dd MMMM yyyy')
  return prettyDate
}

export default getTodayDate
