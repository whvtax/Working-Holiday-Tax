export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body > div > nav,
        body > div > footer { display: none !important; }
        a[href="#main-content"] { display: none !important; }
        .grain { display: none !important; }
      `}</style>
      <div style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </>
  )
}
