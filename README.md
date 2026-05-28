# Dashboard Retell AI - Análise de Chamadas

Dashboard moderno e sofisticado para análise de chamadas de IA usando Retell.

## 🚀 Funcionalidades

- **KPIs em Tempo Real**: Total de chamadas, taxa de atendimento, duração média e voicemail
- **Gráficos Interativos**: 
  - Status das chamadas (completas vs incompletas)
  - Voicemail vs atendidas
  - Chamadas por dia (linha temporal)
  - Top 10 outcomes
- **Tabela Detalhada**: Lista completa com filtros, links de áudio e resumos
- **Filtros de Data**: Selecione o período desejado para análise
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase com a tabela `Retell_Lancamentos` configurada

## 🔧 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
   - As credenciais já estão no arquivo `.env`
   - **IMPORTANTE**: Não commite o arquivo `.env` no git

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse: `http://localhost:5173`

## 🔐 Configuração RLS no Supabase

Para configurar as políticas de segurança (RLS) no Supabase:

1. Acesse o painel do Supabase
2. Vá em **Authentication** > **Policies**
3. Selecione a tabela `Retell_Lancamentos`
4. Clique em **New Policy**
5. Escolha **Enable read access for all users** (para leitura pública)
6. Ou crie uma política customizada:

```sql
-- Política para leitura pública
CREATE POLICY "Enable read access for all users" 
ON "public"."Retell_Lancamentos"
FOR SELECT
USING (true);
```

Se você quiser restringir o acesso apenas para usuários autenticados:

```sql
-- Política para usuários autenticados
CREATE POLICY "Enable read access for authenticated users only" 
ON "public"."Retell_Lancamentos"
FOR SELECT
USING (auth.role() = 'authenticated');
```

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

## 🎨 Tecnologias

- **React 18** + **TypeScript**
- **Vite** - Build tool ultra-rápido
- **TailwindCSS** - Estilização moderna
- **Recharts** - Gráficos interativos
- **Supabase** - Backend e banco de dados
- **Lucide React** - Ícones modernos
- **date-fns** - Manipulação de datas

## 📊 Estrutura de Dados

O dashboard consome a tabela `Retell_Lancamentos` com os seguintes campos:

- `nome` - Nome do contato
- `telefone` - Telefone do contato
- `status` - Status da chamada (completed, etc)
- `voicemail` - Se foi para caixa postal
- `outcome` - Resultado da chamada
- `resumo` - Resumo da conversa
- `duration` - Duração em segundos
- `created_at` - Data/hora da chamada
- `ended_at` - Data/hora de término
- `disconnect_reason` - Motivo da desconexão
- `recording_url` - Link do áudio
- `recording_multi_channel_url` - Link do áudio multi-canal

## 🤝 Suporte

Para dúvidas ou problemas, verifique:
- Credenciais do Supabase no arquivo `.env`
- Políticas RLS configuradas corretamente
- Console do navegador para erros
