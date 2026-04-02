/**
 * Utility: Format a date string to a readable format
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Utility: Check if a given date string matches today's date
 */
export const isToday = (dateStr) => {
  if (!dateStr) return false
  const today = new Date()
  const date = new Date(dateStr)
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

/**
 * Utility: Get the day name from a date string
 */
export const getDayName = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}

/**
 * Utility: Get task type color mapping
 */
export const getTaskTypeColor = (type) => {
  const colors = {
    study: { bg: 'rgba(99, 102, 241, 0.15)', text: '#818cf8', label: 'Study' },
    practice: { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981', label: 'Practice' },
    project: { bg: 'rgba(14, 165, 233, 0.15)', text: '#0ea5e9', label: 'Project' },
    quiz: { bg: 'rgba(245, 158, 11, 0.15)', text: '#f59e0b', label: 'Quiz' },
    review: { bg: 'rgba(168, 85, 247, 0.15)', text: '#a855f7', label: 'Review' },
  }
  return colors[type] || colors.study
}

/**
 * Utility: Calculate days remaining from today to a deadline
 */
export const daysRemaining = (deadline) => {
  if (!deadline) return null
  const today = new Date()
  const end = new Date(deadline)
  const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24))
  return diff
}
