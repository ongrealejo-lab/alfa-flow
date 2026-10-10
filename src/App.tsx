import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { LayoutDashboard, ShoppingCart, Package, Users, Wrench, DollarSign, BarChart2, Settings, UserCog, Zap, Menu, X } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import PDV from './pages/PDV'
import Estoque from './pages/Estoque'
import Clientes from './pages/Clientes'
import OrdensServico from './pages/OrdensServico'
import Financeiro from './pages/Financeiro'
import Relatorios from './pages/Relatorios'
import Configuracoes from './pages/Configuracoes'
import Usuarios from './pages/Usuarios'

const nav = [
  { to: '/', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { to: '/pdv', icon: <ShoppingCart size={18} />, label: 'PDV' },
  { to: '/estoque', icon: <Package size={18} />, label: 'Estoque' },
  { to: '/clientes', icon: <Users size={18} />, label: 'Clientes' },
  { to: '/os', icon: <Wrench size={18} />, label: 'Ordens de Serviço' },
  { to: '/financeiro', icon: <DollarSign size={18} />, label: 'Financeiro' },
  { to: '/relatorios', icon: <BarChart2 size={18} />, label: 'Relatórios' },
  { to: '/configuracoes', icon: <Settings size={18} />, label: 'Configurações' },
  { to: '/usuarios', icon: <UserCog size={18} />, label: 'Usuários' },
]

export default function App() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${collapsed ? 'w-16' : 'w-56'} bg-[#1e293b] flex flex-col transition-all duration-200 flex-shrink-0`}>
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-blue-400" />
                <span className="text-white font-bold text-sm">Alfa Flow</span>
              </div>
            )}
            <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-white p-1 rounded">
              {collapsed ? <Menu size={18} /> : <X size={18} />}
            </button>
          </div>
          <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
            {nav.map(n => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive ? 'bg-[#1a56db] text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`
                }>
                {n.icon}
                {!collapsed && <span className="truncate">{n.label}</span>}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
            <h1 className="text-sm text-gray-500">Sistema de Gestão</h1>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">GT</div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pdv" element={<PDV />} />
              <Route path="/estoque" element={<Estoque />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/os" element={<OrdensServico />} />
              <Route path="/financeiro" element={<Financeiro />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
              <Route path="/usuarios" element={<Usuarios />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}