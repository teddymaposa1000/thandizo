export default function AdminDashboard() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFCFA' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#123E35', marginBottom: '1rem' }}>
          Admin Dashboard
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#4A5B52', marginBottom: '2rem' }}>
          This page is working!
        </p>
        <a 
          href="/dashboard" 
          style={{ 
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: '#21865D',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.5rem'
          }}
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  )
}
