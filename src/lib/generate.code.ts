export function generateCode(date: Date) {
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  const uniqueNumber = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')

  return `${year}${month}${day}${uniqueNumber}`
}
