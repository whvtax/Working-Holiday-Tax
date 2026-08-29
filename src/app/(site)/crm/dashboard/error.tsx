'use client'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100vh', fontFamily: 'system-ui,sans-serif', padding: 24, textAlign: 'center',
    }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#0a1410', marginBottom: 8 }}>
        Something went wrong loading the dashboard
      </div>
      <div style={{ fontSize: 13, color: '#7a8a82', marginBottom: 4, maxWidth: 480 }}>
        {error?.message || 'Unknown error'}
      </div>
      {error?.digest && (
        <div style={{ fontSize: 11, color: '#aabab2', marginBottom: 16 }}>Error ID: {error.digest}</div>
      )}
      <button
        onClick={reset}
        style={{
          padding: '10px 20px', background: '#0E5C42', border: 'none', borderRadius: 9,
          fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', marginTop: 12,
        }}
      >
        Try again
      </button>
    </div>
  )
}
