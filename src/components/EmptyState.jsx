import { Loader2 } from 'lucide-react'

/**
 * EmptyState — Friendly empty state placeholder
 */
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        textAlign: 'center',
        gap: '1rem',
      }}
    >
      {Icon && (
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background: 'rgba(99, 102, 241, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Icon size={32} color="var(--color-primary-light)" />
        </div>
      )}
      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '400px' }}>
        {description}
      </p>
      {action && action}
    </div>
  )
}

/**
 * LoadingSpinner — Centered spinning loader
 */
export function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        gap: '1rem',
      }}
    >
      <Loader2
        size={36}
        color="var(--color-primary-light)"
        style={{ animation: 'spin 1s linear infinite' }}
      />
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
        {text}
      </p>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
