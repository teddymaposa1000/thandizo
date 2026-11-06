export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold text-forest mb-4">
          Admin Dashboard
        </h1>
        <p className="text-ink-light text-lg mb-6">
          This page is working!
        </p>
        <a 
          href="/dashboard" 
          className="btn-secondary"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  )
}
