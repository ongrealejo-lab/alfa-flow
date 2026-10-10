import { Plus, Shield, User } from 'lucide-react'

const usuarios = [
  { id: 1, nome: 'Gabriel Taveira', email: 'gabriel@alfaflow.com', perfil: 'Administrador', status: 'Ativo', ultimo: '10/10/2026 07:30' },
  { id: 2, nome: 'Pedro Santos', email: 'pedro@alfaflow.com', perfil: 'Técnico', status: 'Ativo', ultimo: '10/10/2026 07:15' },
  { id: 3, nome: 'Lucas Oliveira', email: 'lucas@alfaflow.com', perfil: 'Técnico', status: 'Ativo', ultimo: '09/10/2026 18:00' },
  { id: 4, nome: 'Carla Mendes', email: 'carla@alfaflow.com', perfil: 'Caixa', status: 'Inativo', ultimo: '01/10/2026 09:00' },
]

export default function Usuarios() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Usuários</h2>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg">
          <Plus size={16} /> Novo Usuário
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['Usuário', 'E-mail', 'Perfil', 'Status', 'Último acesso'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                      <User size={14} className="text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-800">{u.nome}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{u.email}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 text-xs">
                    <Shield size={12} className={u.perfil === 'Administrador' ? 'text-purple-500' : 'text-gray-400'} />
                    {u.perfil}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${u.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">{u.ultimo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
