import { ExternalLink } from 'lucide-react'
import { RetellCall } from '@/lib/database.types'
import { formatDuration, formatPhoneNumber, cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface CallsTableProps {
  calls: RetellCall[]
}

export function CallsTable({ calls }: CallsTableProps) {

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
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {calls.map((call, index) => (
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
      {calls.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Nenhuma chamada encontrada
        </div>
      )}
    </div>
  )
}
