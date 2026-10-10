import { useState } from 'react'
import { Search, Plus } from 'lucide-react'

const itens = [
  { id: 1, nome: 'Cabo USB-C 1m', codigo: 'CAB001', categoria: 'Acessórios', estoque: 2, minimo: 5, custo: 12, preco: 29.9 },
  { id: 2, nome: 'Película iPhone 15', codigo: 'PEL015', categoria: 'Proteção', estoque: 1, minimo: 10, custo: 5, preco: 19.9 },
  { id: 3, nome: 'Capinha Samsung A54', codigo: 'CAP054', categoria: 'Proteção', estoque: 14, minimo: 8, custo: 15, preco: 39.9 },
  { id: 4, nome: 'Carregador 20W', codigo: 'CAR020', categoria: 'Energia', estoque: 8, minimo: 5, custo: 25, preco: 59.9 },
  { id: 5, nome: 'Fone Bluetooth', codigo: 'FON001', categoria: 'Áudio', estoque: 5, minimo: 3, custo: 40, preco: 89.9 },
  { id: 6, nome: 'Suporte Veicular', codigo: 'SUP001', categoria: 'Acessórios', estoque: 3, minimo: 4, custo: 18, preco: 34.9 },
]

export default function Estoque() {
  const [busca, setBusca] = useState('')
  const filtrados = itens.filter(i => i.nome.toLowerCase().includes(busca.toLowerCase()) || i.codigo.includes(busca))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Estoque</h2>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg">
          <Plus size={16} /> Novo Produto
        </button>
      </div>
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-3 text-gray-400" />
        <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Código', 'Produto', 'Categoria', 'Estoque', 'Mínimo', 'Custo', 'Preço', 'Status'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.map(i => (
              <tr key={i.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-gray-500 text-xs">{i.codigo}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{i.nome}</td>
                <td className="px-4 py-3 text-gray-500">{i.categoria}</td>
                <td className="px-4 py-3 font-bold">{i.estoque}</td>
                <td className="px-4 py-3 text-gray-400">{i.minimo}</td>
                <td className="px-4 py-3 text-gray-500">R$ {i.custo.toFixed(2).replace('.', ',')}</td>
                <td className="px-4 py-3 font-medium text-blue-600">R$ {i.preco.toFixed(2).replace('.', ',')}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${i.estoque <= i.minimo ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {i.estoque <= i.minimo ? 'Baixo' : 'OK'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
