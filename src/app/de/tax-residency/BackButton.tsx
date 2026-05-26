'use client'

export default function BackButton() {
  return (
    <button
      onClick={() => {
        if (window.history.length > 1) {
          window.history.back()
        } else {
          window.location.href = '/de/tax-form'
        }
      }}
      className="inline-flex items-center justify-center font-semibold"
      style={{
        minHeight: '52px',
        padding: '0 36px',
        background: '#E9A020',
        color: '#1A2822',
        borderRadius: '100px',
        fontSize: '15px',
        maxWidth: '300px',
        width: '100%',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      ← Zurück zum Formular
    </button>
  )
}
