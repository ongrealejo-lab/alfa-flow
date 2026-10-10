import { useState } from 'react'
import { Plus } from 'lucide-react'

const ordens = [
  { id: 'OS-0024', cliente: 'Maria Silva', servico: 'Troca de tela iPhone 13', status: 'Em andamento', tecnico: 'Pedro', abertura: '09/10', prazo: '11/10', valor: 'R$ 280,00' },
  { id: 'OS-0023', cliente: 'João Pereira', servico: 'Reparo de carregador', status: 'Aguardando peça', tecnico: 'Lucas', abertura: '08/10', prazo: '12/10', valor: 'R$ 80,00' },
  { id: 'OS-0022', cliente: 'Ana Costa', servico: 'Troca de bateria Samsung', status: 'Concluída', tecnico: 'Pedro', abertura: '07/10', prazo: '09/10', valor: 'R$ 150,00' },
  { id: 'OS-0021', cliente: 'Carlos Lima', servico: 'Limpeza de conector', status: 'Aberta', tecnico: '-', abertura: '10/10', prazo: '13/10', valor: 'R$ 50,00' },
  { id: 'OS-0020', cliente: 'Fernanda Reis', servico: 'Troca de vidro traseiro', status: 'Concluída', tecnico: 'Lucas', abertura: '06/10', prazo: '08/10', valor: 'R$ 200,00' },
]

const cores: Record<string, string> = {
  'Em andamento': 'bg-blue-100 text-blue-700',
  'Aguardando peça': 'bg-yellow-100 text-yellow-700',
  'Concluída': 'bg-green-100 text-green-700',
  'Aberta': 'bg-gray-100 text-gray-600',
}

export default function OrdensServico() {
  const [filtro, setFiltro] = useState('Todas')
  const statusList = ['Todas', 'Aberta', 'Em andamento', 'Aguardando peça', 'Concluída']
  const filtradas = filtro === 'Todas' ? ordens : ordens.filter(o => o.status === filtro)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Ordens de Serviço</h2>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg">
          <Plus size={16} /> Nova OS
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {statusList.map(s => (
          <button key={s} onClick={() => setFiltro(s)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${filtro === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>
            {s}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['OS', 'Cliente', 'Serviço', 'Status', 'Técnico', 'Abertura', 'Prazo', 'Valor'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtradas.map(o => (
              <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-blue-600 text-xs">{o.id}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{o.cliente}</td>
                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{o.servico}</td>
                <td className="px-4 py-3"><span className={`text-xs font-medium px-2 py-1 rounded-full ${cores[o.status]}`}>{o.status}</span></td>
                <td className="px-4 py-3 text-gray-500">{o.tecnico}</td>
                <td className="px-4 py-3 text-gray-400">{o.abertura}</td>
                <td className="px-4 py-3 text-gray-400">{o.prazo}</td>
                <td className="px-4 py-3 font-medium">{o.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
