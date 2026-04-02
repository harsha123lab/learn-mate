/**
 * Card — Reusable glass-morphism card component
 */
export default function Card({ children, className = '', style = {}, onClick, hover = true }) {
  return (
    <div
      className={`glass-card ${hover ? '' : ''} ${className}`}
      style={{
        padding: '1.5rem',
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
