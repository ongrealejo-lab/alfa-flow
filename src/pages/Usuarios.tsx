import { useState } from 'react'
import { Plus, Shield, UserX, UserCheck, Search } from 'lucide-react'

const usuarios = [
  { id: 1, nome: 'Gabriel Taveira', email: 'gabriel@alfacelulares.com.br', perfil: 'Administrador', status: 'Ativo', ultimo: '10/10/2026 07:30', cor: 'bg-blue-600' },
  { id: 2, nome: 'Pedro Santos', email: 'pedro@alfacelulares.com.br', perfil: 'Técnico', status: 'Ativo', ultimo: '10/10/2026 07:15', cor: 'bg-purple-600' },
  { id: 3, nome: 'Lucas Oliveira', email: 'lucas@alfacelulares.com.br', perfil: 'Técnico', status: 'Ativo', ultimo: '09/10/2026 18:00', cor: 'bg-green-600' },
  { id: 4, nome: 'Carla Mendes', email: 'carla@alfacelulares.com.br', perfil: 'Caixa', status: 'Inativo', ultimo: '01/10/2026 09:00', cor: 'bg-pink-500' },
]

const perfilColor: Record<string, string> = {
  'Administrador': 'text-purple-600 bg-purple-50',
  'Técnico': 'text-blue-600 bg-blue-50',
  'Caixa': 'text-orange-600 bg-orange-50',
}

function iniciais(nome: string) {
  return nome.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

export default function Usuarios() {
  const [busca, setBusca] = useState('')

  const filtrados = usuarios.filter(u =>
    !busca || u.nome.toLowerCase().includes(busca.toLowerCase()) || u.email.toLowerCase().includes(busca.toLowerCase())
  )

  const ativos = usuarios.filter(u => u.status === 'Ativo').length

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Usuários</h2>
          <p className="text-sm text-gray-400 mt-0.5">{ativos} usuários ativos · {usuarios.length} no total</p>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus size={16} /> Novo usuário
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Administradores', value: usuarios.filter(u => u.perfil === 'Administrador').length, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Técnicos', value: usuarios.filter(u => u.perfil === 'Técnico').length, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Caixa', value: usuarios.filter(u => u.perfil === 'Caixa').length, color: 'text-orange-500', bg: 'bg-orange-50' },
        ].map(k => (
          <div key={k.label} className={`${k.bg} rounded-xl p-4 border border-transparent`}>
            <p className="text-xs text-gray-500">{k.label}</p>
            <p className={`text-2xl font-bold mt-1 ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Busca */}
      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={busca} onChange={e => setBusca(e.target.value)}
          placeholder="Buscar usuário..."
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Usuário', 'E-mail', 'Perfil', 'Status', 'Último acesso', 'Ações'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.map(u => (
              <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full ${u.cor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {iniciais(u.nome)}
                    </div>
                    <span className="font-medium text-gray-800">{u.nome}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full w-fit ${perfilColor[u.perfil]}`}>
                    <Shield size={11} />
                    {u.perfil}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full w-fit ${u.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {u.status === 'Ativo' ? <UserCheck size={11} /> : <UserX size={11} />}
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">{u.ultimo}</td>
                <td className="px-4 py-3">
                  <button className="text-xs text-gray-500 border border-gray-200 rounded px-2.5 py-1 hover:bg-gray-50 transition-colors">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
          {filtrados.length} usuários
        </div>
      </div>
    </div>
  )
}
