import { useState } from 'react'
import { TrendingUp, TrendingDown, ShoppingCart, DollarSign, Package, CreditCard } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const mesAtual = [
  { dia: '01', atual: 1200, anterior: 980 },
  { dia: '03', atual: 1800, anterior: 1400 },
  { dia: '05', atual: 1500, anterior: 1600 },
  { dia: '07', atual: 2100, anterior: 1200 },
  { dia: '09', atual: 2400, anterior: 1800 },
  { dia: '10', atual: 4200, anterior: 3800 },
]

const pagamentos = [
  { name: 'PIX', value: 45, color: '#22c55e', valor: 'R$ 21.861,45' },
  { name: 'Crédito', value: 30, color: '#3b82f6', valor: 'R$ 14.574,30' },
  { name: 'Dinheiro', value: 15, color: '#f59e0b', valor: 'R$ 7.287,15' },
  { name: 'Débito', value: 10, color: '#8b5cf6', valor: 'R$ 4.858,10' },
]

const ultimasVendas = [
  { id: '#0042', cliente: 'Maria Silva', forma: 'PIX', valor: 'R$ 320,00', status: 'Concluída', hora: '09:14' },
  { id: '#0041', cliente: 'João Pereira', forma: 'Débito', valor: 'R$ 85,00', status: 'Concluída', hora: '08:52' },
  { id: '#0040', cliente: 'Ana Costa', forma: 'Crédito', valor: 'R$ 210,00', status: 'Concluída', hora: '08:30' },
  { id: '#0039', cliente: 'Carlos Lima', forma: 'Dinheiro', valor: 'R$ 145,00', status: 'Concluída', hora: '08:01' },
]

const estoqueBaixo = [
  { nome: 'Cabo USB-C 1m', sku: 'CBL-001', estoque: 2, minimo: 10 },
  { nome: 'Película iPhone 15', sku: 'PEL-015', estoque: 3, minimo: 8 },
  { nome: 'Capinha Samsung A54', sku: 'CAP-A54', estoque: 6, minimo: 10 },
]

const vencimentos = [
  { tipo: 'pagar', desc: 'Fornecedor ABC', valor: 'R$ 1.850,00', data: 'Vence hoje', urgente: true },
  { tipo: 'pagar', desc: 'Aluguel da loja', valor: 'R$ 2.500,00', data: '10/10' },
  { tipo: 'receber', desc: 'João Pereira', valor: 'R$ 480,00', data: '12/10' },
  { tipo: 'receber', desc: 'Ana Costa', valor: 'R$ 1.179,80', data: '15/10' },
]

const kpis = [
  { label: 'Faturamento', value: 'R$ 48.581', sub: '↗ 12,8% vs. mês anterior', up: true, icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Vendas realizadas', value: '248', sub: '↗ 8,3% vs. mês anterior', up: true, icon: ShoppingCart, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Lucro estimado', value: 'R$ 14.692', sub: '↗ 15,2% vs. mês anterior', up: true, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Ticket médio', value: 'R$ 195,89', sub: 'Por venda', up: null, icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Contas a receber', value: 'R$ 1.659,80', sub: '↗ 6,4% vs. mês anterior', up: true, icon: TrendingUp, color: 'text-teal-600', bg: 'bg-teal-50' },
  { label: 'Contas a pagar', value: 'R$ 4.350,00', sub: 'Próximos 30 dias', up: null, icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-50' },
  { label: 'Produtos em estoque', value: '87 un', sub: '6 produtos com estoque baixo', up: null, icon: Package, color: 'text-orange-500', bg: 'bg-orange-50' },
]

export default function Dashboard() {
  const [periodo, setPeriodo] = useState('Este mês')

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Bom dia, Gabriel! 👋</h2>
          <p className="text-sm text-gray-400 mt-0.5">Hoje · 10 de outubro de 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
            {['Hoje', 'Esta semana', 'Este mês'].map(p => (
              <button key={p} onClick={() => setPeriodo(p)}
                className={`text-xs px-3 py-2 font-medium transition-colors ${periodo === p ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                {p}
              </button>
            ))}
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors">
            Nova venda
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.slice(0, 4).map(k => (
          <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500">{k.label}</p>
              <div className={`w-7 h-7 rounded-lg ${k.bg} flex items-center justify-center`}>
                <k.icon size={14} className={k.color} />
              </div>
            </div>
            <p className={`text-xl font-bold ${k.color}`}>{k.value}</p>
            <p className="text-xs text-gray-400 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {kpis.slice(4).map(k => (
          <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500">{k.label}</p>
              <div className={`w-7 h-7 rounded-lg ${k.bg} flex items-center justify-center`}>
                <k.icon size={14} className={k.color} />
              </div>
            </div>
            <p className={`text-xl font-bold ${k.color}`}>{k.value}</p>
            <p className="text-xs text-gray-400 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-700">Evolução do faturamento</p>
            <div className="flex gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-600 inline-block" /> Mês atual</span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-gray-300 inline-block" /> Mês anterior</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mesAtual}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="dia" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [`R$ ${Number(v).toLocaleString('pt-BR')}`, '']} />
              <Line type="monotone" dataKey="atual" stroke="#1a56db" strokeWidth={2} dot={false} name="Mês atual" />
              <Line type="monotone" dataKey="anterior" stroke="#d1d5db" strokeWidth={2} dot={false} strokeDasharray="4 4" name="Mês anterior" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-1">Formas de pagamento</p>
          <p className="text-xs text-gray-400 mb-3">248 vendas</p>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={pagamentos} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value">
                {pagamentos.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {pagamentos.map(p => (
              <div key={p.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                  <span className="text-gray-600">{p.name}</span>
                </span>
                <span className="font-medium text-gray-700">{p.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Últimas vendas */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">Últimas vendas</p>
            <span className="text-xs text-blue-600 cursor-pointer hover:underline">Ver todas</span>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-xs text-gray-400">
                {['Venda', 'Cliente', 'Pagamento', 'Valor', 'Status', 'Hora'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ultimasVendas.map(v => (
                <tr key={v.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-2.5 font-mono text-blue-600 text-xs">{v.id}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">{v.cliente[0]}</div>
                      <span className="text-gray-700">{v.cliente}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-gray-500">{v.forma}</td>
                  <td className="px-4 py-2.5 font-medium text-gray-800">{v.valor}</td>
                  <td className="px-4 py-2.5"><span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">{v.status}</span></td>
                  <td className="px-4 py-2.5 text-gray-400 text-xs">{v.hora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Lateral direita */}
        <div className="space-y-4">
          {/* Estoque baixo */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-3">⚠️ Estoque baixo</p>
            <div className="space-y-3">
              {estoqueBaixo.map(p => (
                <div key={p.nome} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-700">{p.nome}</p>
                    <p className="text-xs text-gray-400">{p.sku} · Mín: {p.minimo}</p>
                  </div>
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{p.estoque} un</span>
                </div>
              ))}
            </div>
          </div>
          {/* Próximos vencimentos */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-3">📅 Próximos vencimentos</p>
            <div className="space-y-2.5">
              {vencimentos.map((v, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-700">{v.desc}</p>
                    <p className={`text-xs ${v.urgente ? 'text-red-500 font-medium' : 'text-gray-400'}`}>{v.data}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${v.tipo === 'pagar' ? 'text-red-500' : 'text-green-600'}`}>{v.valor}</p>
                    <p className="text-xs text-gray-400">{v.tipo === 'pagar' ? 'a pagar' : 'a receber'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
