import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Steuerrückerstattung Australien Working Holiday Maker'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0B5240',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle background circle */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '340px',
            height: '340px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(233,160,32,0.15)',
            border: '1px solid rgba(233,160,32,0.4)',
            borderRadius: '100px',
            padding: '8px 20px',
            marginBottom: '28px',
          }}
        >
          <span style={{ color: '#E9A020', fontSize: '14px', fontFamily: 'sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Working Holiday Tax · Australien
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: '58px',
            fontWeight: '900',
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            maxWidth: '900px',
            marginBottom: '20px',
          }}
        >
          Steuerrückerstattung
          <br />
          <span style={{ color: '#E9A020' }}>Australien</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'sans-serif',
            fontWeight: '300',
            textAlign: 'center',
            maxWidth: '700px',
            marginBottom: '40px',
            lineHeight: 1.4,
          }}
        >
          Unter Aufsicht eines registrierten Steueragenten für Working Holiday Maker auf 417 &amp; 462 Visum
        </div>

        {/* Trust pills */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['TFN Antrag', 'Steuererklärung', 'Super (DASP)', 'ABN'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '8px 16px',
                color: 'rgba(255,255,255,0.85)',
                fontSize: '15px',
                fontFamily: 'sans-serif',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Domain watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            color: 'rgba(255,255,255,0.35)',
            fontSize: '14px',
            fontFamily: 'sans-serif',
          }}
        >
          workingholidaytax.com.au
        </div>
      </div>
    ),
    { ...size }
  )
}
