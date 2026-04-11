export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body > div > nav,
        body > div > footer { display: none !important; }
        a[href="#main-content"] { display: none !important; }
        .grain { display: none !important; }
        #main-content { margin: 0 !important; padding: 0 !important; display: block !important; }
        body { margin: 0 !important; padding: 0 !important; }
      `}</style>
      {children}
    </>
  )
}
