export type Database = {
  public: {
    Tables: {
      Retell_Lancamentos: {
        Row: {
          nome: string | null
          telefone: string | null
          status: string | null
          outcome: string | null
          voicemail: boolean | null
          resumo: string | null
          duration: number | null
          call_id: string | null
          created_at: string | null
          ended_at: string | null
          disconnect_reason: string | null
          transcript: string | null
          recording_url: string | null
          recording_multi_channel_url: string | null
          public_log_url: string | null
          total_cost: number | null
          llm_tokens: number | null
          smel_url: string | null
          agent_name: string | null
          batch_call_id: string | null
          retry_count: number | null
          next_retry: string | null
          canal_preferido: string | null
          technical_outcome: string | null
        }
        Insert: {
          nome?: string | null
          telefone?: string | null
          status?: string | null
          outcome?: string | null
          voicemail?: boolean | null
          resumo?: string | null
          duration?: number | null
          call_id?: string | null
          created_at?: string | null
          ended_at?: string | null
          disconnect_reason?: string | null
          transcript?: string | null
          recording_url?: string | null
          recording_multi_channel_url?: string | null
          public_log_url?: string | null
          total_cost?: number | null
          llm_tokens?: number | null
          smel_url?: string | null
          agent_name?: string | null
          batch_call_id?: string | null
          retry_count?: number | null
          next_retry?: string | null
          canal_preferido?: string | null
          technical_outcome?: string | null
        }
        Update: {
          nome?: string | null
          telefone?: string | null
          status?: string | null
          outcome?: string | null
          voicemail?: boolean | null
          resumo?: string | null
          duration?: number | null
          call_id?: string | null
          created_at?: string | null
          ended_at?: string | null
          disconnect_reason?: string | null
          transcript?: string | null
          recording_url?: string | null
          recording_multi_channel_url?: string | null
          public_log_url?: string | null
          total_cost?: number | null
          llm_tokens?: number | null
          smel_url?: string | null
          agent_name?: string | null
          batch_call_id?: string | null
          retry_count?: number | null
          next_retry?: string | null
          canal_preferido?: string | null
          technical_outcome?: string | null
        }
      }
    }
  }
}

export type RetellCall = Database['public']['Tables']['Retell_Lancamentos']['Row']
