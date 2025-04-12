import SignalFeed from './components/SignalFeed'

function App() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white to-blue-50 text-gray-900">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">🚀 Elite Sniper Dashboard</h1>
        <div className="flex gap-4 text-sm">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full shadow">✅ Connected</span>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full shadow">Asia Session</span>
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full shadow">🔕 News Filter Active</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full shadow">🔐 Vault Locked</span>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Signals" value="1,594" />
        <StatCard label="Win Rate" value="85.2%" />
        <StatCard label="Killshot Accuracy" value="94.1%" />
        <StatCard label="Current Streak" value="6" />
      </div>

      <SignalFeed />
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}

export default App