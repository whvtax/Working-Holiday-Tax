export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Hide the public Nav + Footer server-side on all /crm/* routes
          so they never flash during hydration before PublicShellClient kicks in */}
      <style>{`
        body > div > nav,
        body > div > footer { display: none !important; }
      `}</style>
      <div style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </>
  )
}
