import { useState, useEffect } from 'react'
import { Phone, Clock, CheckCircle, Voicemail as VoicemailIcon } from 'lucide-react'
import { supabase } from './lib/supabase'
import { RetellCall } from './lib/database.types'
import { KPICard } from './components/KPICard'
import { CallsTable } from './components/CallsTable'
import { Charts } from './components/Charts'
import { DateFilter } from './components/DateFilter'
import { formatDuration } from './lib/utils'
import { subDays, startOfDay, endOfDay } from 'date-fns'

function App() {
  const [calls, setCalls] = useState<RetellCall[]>([])
  const [filteredCalls, setFilteredCalls] = useState<RetellCall[]>([])
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState(
    startOfDay(subDays(new Date(), 30)).toISOString().split('T')[0]
  )
  const [endDate, setEndDate] = useState(
    endOfDay(new Date()).toISOString().split('T')[0]
  )

  useEffect(() => {
    fetchCalls()
  }, [])

  useEffect(() => {
    filterCallsByDate()
  }, [calls, startDate, endDate])

  async function fetchCalls() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('Retell_Lancamentos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCalls(data || [])
    } catch (error) {
      console.error('Erro ao buscar chamadas:', error)
    } finally {
      setLoading(false)
    }
  }

  function filterCallsByDate() {
    if (!startDate || !endDate) {
      setFilteredCalls(calls)
      return
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    end.setHours(23, 59, 59, 999)

    const filtered = calls.filter(call => {
      if (!call.created_at) return false
      const callDate = new Date(call.created_at)
      return callDate >= start && callDate <= end
    })

    setFilteredCalls(filtered)
  }

  const totalCalls = filteredCalls.length
  const answeredCalls = filteredCalls.filter(c => c.voicemail === false).length
  const voicemailCalls = filteredCalls.filter(c => c.voicemail === true).length
  const totalDurationMs = filteredCalls.reduce((acc, call) => acc + (call.duration || 0), 0)
  const averageDuration = totalDurationMs / (filteredCalls.length || 1)
  const answerRate = totalCalls > 0 ? ((answeredCalls / totalCalls) * 100).toFixed(1) : '0'

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Vitória AI</h1>
          <p className="text-gray-600">Análise de chamadas e performance da IA</p>
        </div>

        <div className="mb-6">
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total de Chamadas"
            value={totalCalls}
            icon={Phone}
          />
          <KPICard
            title="Taxa de Atendimento"
            value={`${answerRate}%`}
            icon={CheckCircle}
          />
          <KPICard
            title="Duração Média"
            value={formatDuration(averageDuration)}
            icon={Clock}
          />
          <KPICard
            title="Voicemail"
            value={voicemailCalls}
            icon={VoicemailIcon}
          />
        </div>

        <div className="mb-8">
          <Charts calls={filteredCalls} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Histórico de Chamadas</h2>
          <CallsTable calls={filteredCalls} />
        </div>
      </div>
    </div>
  )
}

export default App
