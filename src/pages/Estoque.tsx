import { useState } from 'react'
import { Search, Plus, Download, Package, AlertTriangle, DollarSign, BarChart2 } from 'lucide-react'

const produtos = [
  { id: 1, nome: 'Parafusadeira a bateria 20V', sku: 'FER-001', categoria: 'Ferramentas', fornecedor: 'FerraMais', custo: 189.90, preco: 349.90, estoque: 18, minimo: 5 },
  { id: 2, nome: 'Trena profissional 5 metros', sku: 'FER-002', categoria: 'Ferramentas', fornecedor: 'FerraMais', custo: 28.50, preco: 59.90, estoque: 4, minimo: 10 },
  { id: 3, nome: 'Óleo de motor sintético 5W30', sku: 'AUT-001', categoria: 'Automotivo', fornecedor: 'AutoPeças SP', custo: 42.00, preco: 89.90, estoque: 3, minimo: 8 },
  { id: 4, nome: 'Jogo de chaves de fenda · 6 peças', sku: 'FER-003', categoria: 'Ferramentas', fornecedor: 'FerraMais', custo: 35.00, preco: 79.90, estoque: 24, minimo: 6 },
  { id: 5, nome: 'Kit de brocas multiuso · 10 peças', sku: 'FER-004', categoria: 'Ferramentas', fornecedor: 'FerraMais', custo: 22.00, preco: 49.90, estoque: 6, minimo: 10 },
  { id: 6, nome: 'Filtro de óleo automotivo', sku: 'AUT-002', categoria: 'Automotivo', fornecedor: 'AutoPeças SP', custo: 18.00, preco: 39.90, estoque: 32, minimo: 8 },
]

const categorias = ['Todas as categorias', 'Ferramentas', 'Automotivo']

function fmt(v: number) { return v.toFixed(2).replace('.', ',') }

export default function Estoque() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todas as categorias')
  const [statusFiltro, setStatusFiltro] = useState('Todos')

  const filtrados = produtos.filter(p => {
    const passaBusca = !busca || p.nome.toLowerCase().includes(busca.toLowerCase()) || p.sku.toLowerCase().includes(busca.toLowerCase())
    const passaCat = categoria === 'Todas as categorias' || p.categoria === categoria
    const baixo = p.estoque <= p.minimo
    const passaStatus = statusFiltro === 'Todos' || (statusFiltro === 'Estoque baixo' && baixo)
    return passaBusca && passaCat && passaStatus
  })

  const totalProdutos = produtos.length
  const totalUnidades = produtos.reduce((s, p) => s + p.estoque, 0)
  const totalBaixo = produtos.filter(p => p.estoque <= p.minimo).length
  const valorEstoque = produtos.reduce((s, p) => s + p.custo * p.estoque, 0)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Produtos e estoque</h2>
          <p className="text-sm text-gray-400 mt-0.5">Clareza para decidir. Controle para crescer.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={15} /> Exportar
          </button>
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus size={16} /> Novo produto
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Produtos cadastrados', value: totalProdutos, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Unidades em estoque', value: totalUnidades, icon: BarChart2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Estoque baixo', value: totalBaixo, icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Valor em estoque', value: `R$ ${fmt(valorEstoque)}`, icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50' },
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

      {/* Filtros */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={busca} onChange={e => setBusca(e.target.value)}
            placeholder="Buscar produto ou código..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>
        <select value={categoria} onChange={e => setCategoria(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-600">
          {categorias.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={statusFiltro} onChange={e => setStatusFiltro(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-600">
          <option>Todos</option>
          <option>Estoque baixo</option>
        </select>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Produto', 'Categoria', 'Custo', 'Preço de venda', 'Estoque', 'Status', 'Ações'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.map(p => {
              const baixo = p.estoque <= p.minimo
              return (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{p.nome}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{p.sku} · {p.fornecedor}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{p.categoria}</td>
                  <td className="px-4 py-3 text-gray-500">R$ {fmt(p.custo)}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">R$ {fmt(p.preco)}</td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-gray-800">{p.estoque} un.</p>
                    <p className="text-xs text-gray-400">Mínimo: {p.minimo}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${baixo ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {baixo ? 'Estoque baixo' : 'Disponível'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-gray-500 border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">Editar</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
          {filtrados.length} de {produtos.length} produtos
        </div>
      </div>
    </div>
  )
}
