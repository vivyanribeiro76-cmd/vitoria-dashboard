import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts'
import { RetellCall } from '@/lib/database.types'

interface ChartsProps {
  calls: RetellCall[]
}

const COLORS = {
  completed: '#10b981',
  incomplete: '#f59e0b',
  voicemail: '#ef4444',
  answered: '#3b82f6'
}

export function Charts({ calls }: ChartsProps) {
  const statusData = [
    {
      name: 'Completas',
      value: calls.filter(c => c.voicemail === false && c.status?.toLowerCase() !== 'no-answer').length,
      color: COLORS.completed
    },
    {
      name: 'Incompletas',
      value: calls.filter(c => c.voicemail === true || c.status?.toLowerCase() === 'no-answer').length,
      color: COLORS.incomplete
    }
  ]

  const voicemailData = [
    {
      name: 'Atendidas',
      value: calls.filter(c => c.voicemail === false).length,
      color: COLORS.answered
    },
    {
      name: 'Caixa Postal',
      value: calls.filter(c => c.voicemail === true).length,
      color: COLORS.voicemail
    }
  ]

  const outcomeData = calls.reduce((acc, call) => {
    const outcome = call.outcome || 'Não definido'
    const existing = acc.find(item => item.name === outcome)
    if (existing) {
      existing.value++
    } else {
      acc.push({ name: outcome, value: 1 })
    }
    return acc
  }, [] as { name: string; value: number }[])
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)

  const dailyCallsData = calls.reduce((acc, call) => {
    if (!call.created_at) return acc
    const date = new Date(call.created_at).toLocaleDateString('pt-BR')
    const existing = acc.find(item => item.date === date)
    if (existing) {
      existing.calls++
    } else {
      acc.push({ date, calls: 1 })
    }
    return acc
  }, [] as { date: string; calls: number }[])
    .sort((a, b) => {
      const dateA = a.date.split('/').reverse().join('-')
      const dateB = b.date.split('/').reverse().join('-')
      return dateA.localeCompare(dateB)
    })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status das Chamadas</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Voicemail vs Atendidas</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={voicemailData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {voicemailData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Chamadas por Dia</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyCallsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={2} name="Chamadas" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {outcomeData.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 10 Outcomes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={outcomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8b5cf6" name="Quantidade" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
