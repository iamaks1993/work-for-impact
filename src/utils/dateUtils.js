export const calculateAge = (birthDate) => {
  const date = new Date(birthDate)
  if (Number.isNaN(date.getTime())) return 0
  const today = new Date()
  let age = today.getFullYear() - date.getFullYear()
  const monthDiff = today.getMonth() - date.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age -= 1
  }
  return Math.max(age, 0)
}

export const normalizeDate = (value) => {
  if (!value) return ''
  if (typeof value === 'string' && value.includes('-')) {
    const parts = value.split('-')
    if (parts.length === 3) {
      const [year, month, day] = parts
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    }
  }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}
