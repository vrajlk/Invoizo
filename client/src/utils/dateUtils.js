export function formatDate(date) {
  if (!date) return ""

  const d = new Date(date)
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function formatTime(date) {
  if (!date) return ""

  const d = new Date(date)
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatDateTime(date) {
  if (!date) return ""

  return `${formatDate(date)} at ${formatTime(date)}`
}
