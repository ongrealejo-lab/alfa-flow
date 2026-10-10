import { useState } from 'react'
import { Plus, Search, User, ArrowUpRight } from 'lucide-react'

const ordens = [
  { id: 'OS #1048', cliente: 'Roberto Almeida', servico: 'Revisão preventiva e troca de óleo', equipamento: 'Honda Civic 2.0 · 2020 · ABC-1D23', status: 'Em andamento', tecnico: 'Lucas Mendes', prazo: '08/10/2026', valor: 'R$ 780,00' },
  { id: 'OS #1047', cliente: 'Mariana Costa', servico: 'Manutenção e troca de bateria', equipamento: 'Parafusadeira 20V · FER-001', status: 'Aguardando peças', tecnico: 'Pedro Santos', prazo: '09/10/2026', valor: 'R$ 249,90' },
  { id: 'OS #1046', cliente: 'Carlos Eduardo Silva', servico: 'Alinhamento e balanceamento', equipamento: 'Volkswagen Polo · 2022 · DEF-4G56', status: 'Concluída', tecnico: 'Lucas Mendes', prazo: '07/10/2026', valor: 'R$ 180,00' },
  { id: 'OS #1045', cliente: 'Ana Paula Santos', servico: 'Avaliação técnica', equipamento: 'Furadeira de impacto · FER-023', status: 'Aberta', tecnico: 'Pedro Santos', prazo: '10/10/2026', valor: 'R$ 89,90' },
  { id: 'OS #1044', cliente: 'João Mendes', servico: 'Troca de pneus dianteiros', equipamento: 'Toyota Corolla · 2021 · GHI-7K89', status: 'Em andamento', tecnico: 'Lucas Mendes', prazo: '11/10/2026', valor: 'R$ 520,00' },
  { id: 'OS #1043', cliente: 'Fernanda Lima', servico: 'Reparo do sistema elétrico', equipamento: 'Ford Ka · 2019 · JKL-2M34', status: 'Concluída', tecnico: 'Pedro Santos', prazo: '06/10/2026', valor: 'R$ 340,00' },
]

const statusConfig: Record<string, { dot: string; badge: string; label: string }> = {
  'Em andamento': { dot: 'bg-blue-500', badge: 'bg-blue-100 text-blue-700', label: 'Em andamento' },
  'Aguardando peças': { dot: 'bg-orange-400', badge: 'bg-orange-100 text-orange-700', label: 'Aguardando peças' },
  'Concluída': { dot: 'bg-green-500', badge: 'bg-green-100 text-green-700', label: 'Concluída' },
  'Aberta': { dot: 'bg-blue-400', badge: 'bg-blue-50 text-blue-600', label: 'Aberta' },
}

const statusList = ['Todos os status', 'Aberta', 'Em andamento', 'Aguardando peças', 'Concluída']

export default function OrdensServico() {
  const [filtro, setFiltro] = useState('Todos os status')
  const [busca, setBusca] = useState('')

  const filtradas = ordens.filter(o => {
    const passaStatus = filtro === 'Todos os status' || o.status === filtro
    const passBusca = !busca || o.cliente.toLowerCase().includes(busca.toLowerCase()) || o.servico.toLowerCase().includes(busca.toLowerCase()) || o.id.toLowerCase().includes(busca.toLowerCase())
    return passaStatus && passBusca
  })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Ordens de serviço</h2>
          <p className="text-sm text-gray-400 mt-0.5">{ordens.length} ordens no total</p>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus size={16} /> Nova OS
        </button>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar cliente, veículo, placa ou OS..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <select
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-600"
        >
          {statusList.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtradas.map(o => {
          const cfg = statusConfig[o.status]
          return (
            <div key={o.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-blue-600 text-sm font-semibold">{o.id}</span>
                <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cfg.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </span>
              </div>

              {/* Serviço */}
              <h3 className="font-semibold text-gray-800 text-base mb-1">{o.servico}</h3>
              <p className="text-blue-500 text-xs mb-3">{o.equipamento}</p>

              {/* Cliente */}
              <div className="flex items-center gap-1.5 mb-4">
                <User size={13} className="text-gray-400" />
                <span className="text-sm text-gray-500">{o.cliente}</span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <div>
                  <p className="text-xl font-bold text-gray-800">{o.valor}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{o.tecnico} · Prazo: {o.prazo}</p>
                </div>
                <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                  Ver ordem <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {filtradas.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">Nenhuma OS encontrada</p>
        </div>
      )}
    </div>
  )
}
