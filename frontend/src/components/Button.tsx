interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  children: React.ReactNode
}

export default function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s',
  }

  const variants = {
    primary: {
      backgroundColor: '#3b82f6',
      color: 'white',
    },
    secondary: {
      backgroundColor: '#e2e8f0',
      color: '#1e293b',
    },
    danger: {
      backgroundColor: '#ef4444',
      color: 'white',
    },
  }

  return (
    <button
      style={{
        ...baseStyle,
        ...variants[variant],
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.opacity = '0.9'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.opacity = '1'
      }}
      {...props}
    >
      {children}
    </button>
  )
}
