export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body > div > nav,
        body > div > footer { display: none !important; }
        a[href="#main-content"] { display: none !important; }
        .grain { display: none !important; }
        #main-content { display: contents; }
        body { margin: 0; padding: 0; }
      `}</style>
      <div style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </>
  )
}
