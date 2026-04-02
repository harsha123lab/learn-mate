/**
 * ProgressBar — Visual progress indicator with percentage label
 */
export default function ProgressBar({ value = 0, label = '', showPercentage = true }) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div>
      {(label || showPercentage) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem',
        }}>
          {label && (
            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
              {label}
            </span>
          )}
          {showPercentage && (
            <span style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {clampedValue}%
            </span>
          )}
        </div>
      )}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}
