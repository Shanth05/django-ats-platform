interface CardProps {
  children: React.ReactNode
  title?: string
  actions?: React.ReactNode
}

export default function Card({ children, title, actions }: CardProps) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
      marginBottom: '1.5rem',
    }}>
      {(title || actions) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #e2e8f0',
        }}>
          {title && <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{title}</h2>}
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  )
}
