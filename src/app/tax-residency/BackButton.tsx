'use client'
export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        height: '52px',
        padding: '0 36px',
        fontSize: '15px',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        color: '#1A2822',
        background: '#E9A020',
        border: 'none',
        borderRadius: '100px',
        cursor: 'pointer',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
        width: '100%',
        maxWidth: '300px',
        boxShadow: '0 1px 2px rgba(0,0,0,.06), 0 3px 12px rgba(233,160,32,.22)',
        transition: 'all 0.2s',
      }}
    >
      ← Back to my Tax Return
    </button>
  )
}
