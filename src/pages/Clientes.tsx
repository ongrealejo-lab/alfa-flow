import { useState } from 'react'
import { Search, Plus, Phone } from 'lucide-react'

const clientes = [
  { id: 1, nome: 'Maria Silva', telefone: '(11) 99999-1111', cidade: 'Santo André', compras: 8, total: 'R$ 1.240,00', ultima: '09/10/2026' },
  { id: 2, nome: 'João Pereira', telefone: '(11) 99999-2222', cidade: 'São Bernardo', compras: 3, total: 'R$ 375,00', ultima: '07/10/2026' },
  { id: 3, nome: 'Ana Costa', telefone: '(11) 99999-3333', cidade: 'São Paulo', compras: 12, total: 'R$ 2.890,00', ultima: '10/10/2026' },
  { id: 4, nome: 'Carlos Lima', telefone: '(11) 99999-4444', cidade: 'Diadema', compras: 5, total: 'R$ 650,00', ultima: '05/10/2026' },
  { id: 5, nome: 'Fernanda Reis', telefone: '(11) 99999-5555', cidade: 'Mauá', compras: 7, total: 'R$ 980,00', ultima: '08/10/2026' },
]

export default function Clientes() {
  const [busca, setBusca] = useState('')
  const filtrados = clientes.filter(c => c.nome.toLowerCase().includes(busca.toLowerCase()) || c.telefone.includes(busca))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Clientes</h2>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg">
          <Plus size={16} /> Novo Cliente
        </button>
      </div>
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-3 text-gray-400" />
        <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar cliente..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['Nome', 'Telefone', 'Cidade', 'Compras', 'Total Gasto', 'Última Compra'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.map(c => (
              <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{c.nome}</td>
                <td className="px-4 py-3">
                  <a href={`https://wa.me/55${c.telefone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1 text-green-600 hover:underline">
                    <Phone size={12} />{c.telefone}
                  </a>
                </td>
                <td className="px-4 py-3 text-gray-500">{c.cidade}</td>
                <td className="px-4 py-3">{c.compras}</td>
                <td className="px-4 py-3 font-medium text-blue-600">{c.total}</td>
                <td className="px-4 py-3 text-gray-400">{c.ultima}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
