export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 via-mint/20 to-cream flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-th to-forest rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl">🌿</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-forest">THANDIZO</h1>
          <p className="text-sm text-ink-light mt-1">Verified Care. Shared Hope.</p>
        </div>

        <div className="card p-8">
          <h2 className="font-display text-2xl font-bold text-forest mb-2">Welcome Back</h2>
          <p className="text-ink-light mb-6">Sign in to your account</p>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-green-800 font-medium">✅ Login page is working!</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                className="input-field"
                placeholder="admin@thandizo.org"
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <button className="btn-primary w-full">
              Sign In
            </button>
          </div>
        </div>

        <div className="mt-6 card p-6 bg-mint/30">
          <h3 className="font-medium text-forest mb-3">Demo Credentials</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-light">Email:</span>
              <span className="font-mono text-forest">admin@thandizo.org</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-light">Password:</span>
              <span className="font-mono text-forest">AdminPass123!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
