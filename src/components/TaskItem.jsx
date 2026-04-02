import { Check } from 'lucide-react'
import { getTaskTypeColor } from '../utils/helpers'

/**
 * TaskItem — Individual task card with completion toggle
 */
export default function TaskItem({ task, taskKey, isCompleted, onToggle }) {
  const typeColor = getTaskTypeColor(task.type)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        padding: '1rem',
        borderRadius: '10px',
        background: isCompleted ? 'rgba(16, 185, 129, 0.05)' : 'rgba(15, 23, 42, 0.5)',
        border: `1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.2)' : 'var(--border-color)'}`,
        transition: 'all 0.3s ease',
        opacity: isCompleted ? 0.7 : 1,
        cursor: 'pointer',
      }}
      onClick={() => onToggle(taskKey)}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = isCompleted ? 'rgba(16, 185, 129, 0.4)' : 'rgba(99, 102, 241, 0.3)'
        e.currentTarget.style.transform = 'translateX(4px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isCompleted ? 'rgba(16, 185, 129, 0.2)' : 'var(--border-color)'
        e.currentTarget.style.transform = 'translateX(0)'
      }}
    >
      {/* Checkbox */}
      <div
        style={{
          width: '22px',
          height: '22px',
          minWidth: '22px',
          borderRadius: '6px',
          border: `2px solid ${isCompleted ? 'var(--color-success)' : 'var(--border-color)'}`,
          background: isCompleted ? 'var(--color-success)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          marginTop: '2px',
        }}
      >
        {isCompleted && <Check size={14} color="white" strokeWidth={3} />}
      </div>

      {/* Task Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
          <span style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            textDecoration: isCompleted ? 'line-through' : 'none',
          }}>
            {task.title}
          </span>
          <span
            className="badge"
            style={{
              background: typeColor.bg,
              color: typeColor.text,
              fontSize: '0.65rem',
              padding: '0.15rem 0.5rem',
            }}
          >
            {typeColor.label}
          </span>
        </div>
        {task.description && (
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            marginBottom: '0.25rem',
            lineHeight: 1.4,
          }}>
            {task.description}
          </p>
        )}
        <span style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          fontWeight: 500,
        }}>
          ⏱ {task.duration}
        </span>
      </div>
    </div>
  )
}
