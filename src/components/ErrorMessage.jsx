import { AlertTriangle, RefreshCw } from 'lucide-react'

/**
 * ErrorMessage — Styled error display with optional retry action
 */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem',
        textAlign: 'center',
        gap: '1rem',
      }}
    >
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'rgba(239, 68, 68, 0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <AlertTriangle size={28} color="var(--color-danger)" />
      </div>
      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          Something went wrong
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '400px' }}>
          {message || 'An unexpected error occurred. Please try again.'}
        </p>
      </div>
      {onRetry && (
        <button className="btn-secondary" onClick={onRetry} style={{ marginTop: '0.5rem' }}>
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  )
}
