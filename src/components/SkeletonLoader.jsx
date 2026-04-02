/**
 * SkeletonLoader — Shimmer placeholders for loading states
 */
export function SkeletonCard() {
  return (
    <div className="skeleton" style={{ height: '160px', marginBottom: '1rem' }} />
  )
}

export function SkeletonLine({ width = '100%', height = '16px', style = {} }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, marginBottom: '0.75rem', ...style }}
    />
  )
}

export function SkeletonPlanView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <SkeletonLine width="40%" height="32px" />
      <SkeletonLine width="60%" height="20px" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}

export function SkeletonDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <SkeletonLine width="50%" height="32px" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <SkeletonLine width="30%" height="24px" />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}
