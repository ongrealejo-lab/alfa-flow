import { useState } from 'react'
import { Search, Plus, Download, Users, RefreshCw, ShoppingBag, TrendingUp } from 'lucide-react'

const clientes = [
  { id: 1, nome: 'Mariana Costa', email: 'mariana@email.com', telefone: '(11) 99801-2345', compras: 12, total: 3480.80, ticket: 290.07, ultima: '07/10/2026' },
  { id: 2, nome: 'Carlos Eduardo Silva', email: 'carlos@email.com', telefone: '(11) 99802-3456', compras: 8, total: 2150.50, ticket: 268.81, ultima: '06/10/2026' },
  { id: 3, nome: 'Ana Paula Santos', email: 'ana@email.com', telefone: '(11) 99803-4567', compras: 6, total: 1899.90, ticket: 316.65, ultima: '05/10/2026' },
  { id: 4, nome: 'Roberto Almeida', email: 'roberto@email.com', telefone: '(11) 99804-5678', compras: 18, total: 5720.00, ticket: 317.78, ultima: '07/10/2026' },
  { id: 5, nome: 'Juliana Ferreira', email: 'juliana@email.com', telefone: '(11) 99805-6789', compras: 3, total: 780.50, ticket: 260.17, ultima: '03/10/2026' },
]

function fmt(v: number) { return v.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }

function iniciais(nome: string) {
  return nome.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

const cores = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500']

export default function Clientes() {
  const [busca, setBusca] = useState('')

  const filtrados = clientes.filter(c =>
    !busca || c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.email.toLowerCase().includes(busca.toLowerCase()) ||
    c.telefone.includes(busca)
  )

  const totalCompras = clientes.reduce((s, c) => s + c.compras, 0)
  const ticketMedio = clientes.reduce((s, c) => s + c.total, 0) / totalCompras

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Clientes</h2>
          <p className="text-sm text-gray-400 mt-0.5">Boas relações fazem grandes negócios.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={15} /> Exportar
          </button>
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus size={16} /> Novo cliente
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Clientes cadastrados', value: clientes.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Clientes recorrentes', value: clientes.length, icon: RefreshCw, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Compras realizadas', value: totalCompras, icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Ticket médio', value: `R$ ${fmt(ticketMedio)}`, icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
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

      {/* Busca */}
      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={busca} onChange={e => setBusca(e.target.value)}
          placeholder="Buscar cliente..."
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
      </div>

      <p className="text-sm text-gray-400">{filtrados.length} clientes encontrados</p>

      {/* Cards de clientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtrados.map((c, idx) => (
          <div key={c.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full ${cores[idx % cores.length]} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                {iniciais(c.nome)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 truncate">{c.nome}</p>
                <p className="text-xs text-gray-400 truncate">{c.email}</p>
                <p className="text-xs text-gray-400">{c.telefone}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-50">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-800">R$ {fmt(c.total)}</p>
                <p className="text-xs text-gray-400 mt-0.5">Total em compras</p>
              </div>
              <div className="text-center border-x border-gray-100">
                <p className="text-lg font-bold text-gray-800">R$ {fmt(c.ticket)}</p>
                <p className="text-xs text-gray-400 mt-0.5">Ticket médio</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-800">{c.compras}</p>
                <p className="text-xs text-gray-400 mt-0.5">Compras</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">Última compra: {c.ultima}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
