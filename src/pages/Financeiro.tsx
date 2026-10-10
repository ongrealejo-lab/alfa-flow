import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Download, Plus, TrendingUp, TrendingDown, DollarSign, AlertCircle } from 'lucide-react'

const meses = [
  { mes: 'Mai', receita: 8200, despesa: 5100 },
  { mes: 'Jun', receita: 9400, despesa: 5800 },
  { mes: 'Jul', receita: 7800, despesa: 4900 },
  { mes: 'Ago', receita: 11200, despesa: 6200 },
  { mes: 'Set', receita: 10500, despesa: 5900 },
  { mes: 'Out', receita: 4200, despesa: 2800 },
]

const lancamentos = [
  { desc: 'Ferramentas Brasil', categoria: 'Fornecedores', tipo: 'A pagar', vencimento: '07/10/2026', valor: 1850.00, status: 'Vence hoje' },
  { desc: 'Mariana Costa', categoria: 'Vendas', tipo: 'A receber', vencimento: '08/10/2026', valor: 489.90, status: 'Em aberto' },
  { desc: 'Aluguel da loja', categoria: 'Despesas fixas', tipo: 'A pagar', vencimento: '10/10/2026', valor: 2500.00, status: 'Em aberto' },
  { desc: 'Roberto Almeida', categoria: 'Serviços', tipo: 'A receber', vencimento: '06/10/2026', valor: 780.00, status: 'Vencida' },
  { desc: 'Energia elétrica', categoria: 'Despesas fixas', tipo: 'A pagar', vencimento: '05/10/2026', valor: 348.50, status: 'Pago' },
  { desc: 'Carlos Eduardo Silva', categoria: 'Vendas', tipo: 'A receber', vencimento: '09/10/2026', valor: 389.90, status: 'Em aberto' },
]

const statusCfg: Record<string, string> = {
  'Vence hoje': 'bg-red-100 text-red-600',
  'Em aberto': 'bg-blue-100 text-blue-700',
  'Vencida': 'bg-orange-100 text-orange-700',
  'Pago': 'bg-green-100 text-green-700',
  'Liquidado': 'bg-green-100 text-green-700',
}

function fmt(v: number) { return v.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }

export default function Financeiro() {
  const [aba, setAba] = useState('Todas')
  const [status, setStatus] = useState('Todos os status')

  const filtrados = lancamentos.filter(l => {
    const passaAba = aba === 'Todas' || (aba === 'A receber' && l.tipo === 'A receber') || (aba === 'A pagar' && l.tipo === 'A pagar')
    const passaStatus = status === 'Todos os status' || l.status === status || (status === 'Pagas' && l.status === 'Pago')
    return passaAba && passaStatus
  })

  const total = filtrados.reduce((s, l) => s + l.valor, 0)
  const aReceber = lancamentos.filter(l => l.tipo === 'A receber').reduce((s, l) => s + l.valor, 0)
  const aPagar = lancamentos.filter(l => l.tipo === 'A pagar').reduce((s, l) => s + l.valor, 0)
  const saldo = aReceber - aPagar

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Financeiro</h2>
          <p className="text-sm text-gray-400 mt-0.5">Clareza para decidir. Controle para crescer.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={15} /> Fluxo de caixa
          </button>
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus size={16} /> Novo lançamento
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Contas a receber', value: `R$ ${fmt(aReceber)}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Contas a pagar', value: `R$ ${fmt(aPagar)}`, icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Recebido no período', value: 'R$ 0,00', icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Saldo previsto', value: `${saldo < 0 ? '-' : ''}R$ ${fmt(Math.abs(saldo))}`, icon: AlertCircle, color: saldo < 0 ? 'text-red-500' : 'text-green-600', bg: saldo < 0 ? 'bg-red-50' : 'bg-green-50' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500">{k.label}</p>
              <div className={`w-7 h-7 rounded-lg ${k.bg} flex items-center justify-center`}>
                <k.icon size={14} className={k.color} />
              </div>
            </div>
            <p className={`text-xl font-bold ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Gráfico */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p className="text-sm font-medium text-gray-700 mb-3">Receita vs Despesa — 6 meses</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={meses}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => `R$ ${Number(v).toLocaleString('pt-BR')}`} />
            <Bar dataKey="receita" name="Receita" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="despesa" name="Despesa" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela de lançamentos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
          {/* Abas */}
          <div className="flex gap-1">
            {['Todas', 'A receber', 'A pagar'].map(a => (
              <button key={a} onClick={() => setAba(a)}
                className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${aba === a ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                {a}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <select value={status} onChange={e => setStatus(e.target.value)}
              className="border border-gray-200 rounded-lg text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-600">
              {['Todos os status', 'Em aberto', 'Pagas', 'Vencida'].map(s => <option key={s}>{s}</option>)}
            </select>
            <button className="flex items-center gap-1 border border-gray-200 text-gray-600 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50">
              <Download size={14} /> Exportar
            </button>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Descrição', 'Categoria', 'Tipo', 'Vencimento', 'Valor', 'Status', 'Ação'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.map((l, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{l.desc}</td>
                <td className="px-4 py-3 text-gray-500">{l.categoria}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${l.tipo === 'A receber' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {l.tipo}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{l.vencimento}</td>
                <td className={`px-4 py-3 font-medium ${l.tipo === 'A receber' ? 'text-green-600' : 'text-red-500'}`}>
                  R$ {fmt(l.valor)}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusCfg[l.status] || 'bg-gray-100 text-gray-500'}`}>
                    {l.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className={`text-xs px-2 py-1 rounded border transition-colors ${l.status === 'Pago' ? 'border-green-200 text-green-600 bg-green-50' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                    {l.status === 'Pago' ? 'Liquidado' : 'Baixar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
          <span>{filtrados.length} lançamentos</span>
          <span>Total: R$ {fmt(total)}</span>
        </div>
      </div>
    </div>
  )
}
