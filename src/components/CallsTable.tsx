import { ExternalLink } from 'lucide-react'
import { RetellCall } from '@/lib/database.types'
import { formatDuration, formatPhoneNumber, cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState, useMemo } from 'react'

interface CallsTableProps {
  calls: RetellCall[]
}

export function CallsTable({ calls }: CallsTableProps) {
  const [filters, setFilters] = useState({
    nome: '',
    telefone: '',
    status: '',
    voicemail: '',
    outcome: ''
  })

  // Extrair valores únicos para os dropdowns
  const uniqueNomes = useMemo(() => {
    const nomes = calls.map(c => c.nome).filter(Boolean) as string[]
    return Array.from(new Set(nomes)).sort()
  }, [calls])

  const uniqueTelefones = useMemo(() => {
    const telefones = calls.map(c => c.telefone).filter(Boolean) as string[]
    return Array.from(new Set(telefones)).sort()
  }, [calls])

  const uniqueStatus = useMemo(() => {
    const statuses = calls.map(c => c.status).filter(Boolean) as string[]
    return Array.from(new Set(statuses)).sort()
  }, [calls])

  const uniqueOutcomes = useMemo(() => {
    const outcomes = calls.map(c => c.outcome).filter(Boolean) as string[]
    return Array.from(new Set(outcomes)).sort()
  }, [calls])

  const filteredCalls = useMemo(() => {
    return calls.filter(call => {
      const matchNome = !filters.nome || call.nome === filters.nome
      const matchTelefone = !filters.telefone || call.telefone === filters.telefone
      const matchStatus = !filters.status || call.status === filters.status
      const matchVoicemail = !filters.voicemail || 
        (filters.voicemail === 'sim' && call.voicemail === true) ||
        (filters.voicemail === 'nao' && call.voicemail === false)
      const matchOutcome = !filters.outcome || call.outcome === filters.outcome
      
      return matchNome && matchTelefone && matchStatus && matchVoicemail && matchOutcome
    })
  }, [calls, filters])

  const getStatusBadge = (status: string | null) => {
    const isComplete = status?.toLowerCase() === 'completed'
    return (
      <span className={cn(
        'px-2 py-1 rounded-full text-xs font-medium',
        isComplete 
          ? 'bg-green-100 text-green-800' 
          : 'bg-yellow-100 text-yellow-800'
      )}>
        {status || 'N/A'}
      </span>
    )
  }

  const getVoicemailBadge = (voicemail: boolean | null) => {
    if (voicemail === null) return <span className="text-gray-400">-</span>
    return (
      <span className={cn(
        'px-2 py-1 rounded-full text-xs font-medium',
        voicemail 
          ? 'bg-orange-100 text-orange-800' 
          : 'bg-blue-100 text-blue-800'
      )}>
        {voicemail ? 'Sim' : 'Não'}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Voicemail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Outcome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duração
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Áudio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resumo
              </th>
            </tr>
            <tr className="bg-white">
              <th className="px-6 py-2">
                <select
                  value={filters.nome}
                  onChange={(e) => setFilters({...filters, nome: e.target.value})}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos</option>
                  {uniqueNomes.map(nome => (
                    <option key={nome} value={nome}>{nome}</option>
                  ))}
                </select>
              </th>
              <th className="px-6 py-2">
                <select
                  value={filters.telefone}
                  onChange={(e) => setFilters({...filters, telefone: e.target.value})}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos</option>
                  {uniqueTelefones.map(tel => (
                    <option key={tel} value={tel}>{tel}</option>
                  ))}
                </select>
              </th>
              <th className="px-6 py-2">
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos</option>
                  {uniqueStatus.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </th>
              <th className="px-6 py-2">
                <select
                  value={filters.voicemail}
                  onChange={(e) => setFilters({...filters, voicemail: e.target.value})}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </th>
              <th className="px-6 py-2">
                <select
                  value={filters.outcome}
                  onChange={(e) => setFilters({...filters, outcome: e.target.value})}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos</option>
                  {uniqueOutcomes.map(outcome => (
                    <option key={outcome} value={outcome}>{outcome}</option>
                  ))}
                </select>
              </th>
              <th className="px-6 py-2"></th>
              <th className="px-6 py-2"></th>
              <th className="px-6 py-2"></th>
              <th className="px-6 py-2"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCalls.map((call, index) => (
              <tr key={call.call_id || index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {call.nome || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatPhoneNumber(call.telefone)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {getStatusBadge(call.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {getVoicemailBadge(call.voicemail)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {call.outcome || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDuration(call.duration)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {call.created_at 
                    ? format(new Date(call.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })
                    : '-'
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {call.recording_url ? (
                    <a
                      href={call.recording_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                      title="Abrir áudio"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                  <div className="truncate" title={call.resumo || ''}>
                    {call.resumo || '-'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredCalls.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Nenhuma chamada encontrada
        </div>
      )}
    </div>
  )
}
