import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { LayoutDashboard, ShoppingCart, Package, Users, Wrench, DollarSign, BarChart2, Settings, UserCog, ChevronLeft, ChevronRight, Building2 } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import PDV from './pages/PDV'
import Estoque from './pages/Estoque'
import Clientes from './pages/Clientes'
import OrdensServico from './pages/OrdensServico'
import Financeiro from './pages/Financeiro'
import Relatorios from './pages/Relatorios'
import Configuracoes from './pages/Configuracoes'
import Usuarios from './pages/Usuarios'

const navPrincipal = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/pdv', icon: ShoppingCart, label: 'PDV / Frente de caixa' },
  { to: '/estoque', icon: Package, label: 'Produtos e estoque' },
  { to: '/clientes', icon: Users, label: 'Clientes' },
  { to: '/financeiro', icon: DollarSign, label: 'Financeiro' },
  { to: '/os', icon: Wrench, label: 'Ordens de serviço', badge: 3 },
]

const navGerenciamento = [
  { to: '/relatorios', icon: BarChart2, label: 'Histórico de atendimento' },
  { to: '/configuracoes', icon: Settings, label: 'Configurações' },
  { to: '/usuarios', icon: UserCog, label: 'Usuários' },
]

export default function App() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${collapsed ? 'w-16' : 'w-60'} bg-[#0f172a] flex flex-col transition-all duration-200 flex-shrink-0`}>
          {/* Logo */}
          <div className="px-4 pt-5 pb-4 border-b border-white/10">
            {!collapsed ? (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <span className="text-white font-bold text-lg">Alfa <span className="text-orange-400">Flow</span></span>
                </div>
                <p className="text-gray-500 text-[10px] font-medium tracking-widest pl-10">GESTÃO COMERCIAL</p>
              </div>
            ) : (
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-sm">A</span>
              </div>
            )}
          </div>

          {/* Empresa */}
          {!collapsed && (
            <div className="mx-3 mt-3 mb-1 bg-white/5 rounded-lg px-3 py-2.5 flex items-center gap-2 cursor-pointer hover:bg-white/10">
              <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center flex-shrink-0">
                <Building2 size={14} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-white text-xs font-medium truncate">Minha empresa</p>
                <p className="text-gray-400 text-[10px] truncate">Unidade principal</p>
              </div>
            </div>
          )}

          {/* Nav */}
          <nav className="flex-1 py-3 px-2 overflow-y-auto space-y-0.5">
            {!collapsed && <p className="text-gray-500 text-[10px] font-semibold tracking-wider px-3 pb-1">PRINCIPAL</p>}
            {navPrincipal.map(n => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive ? 'bg-orange-500/20 text-orange-400 border-l-2 border-orange-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`
                }>
                <n.icon size={17} className="flex-shrink-0" />
                {!collapsed && (
                  <span className="flex-1 truncate">{n.label}</span>
                )}
                {!collapsed && n.badge && (
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{n.badge}</span>
                )}
              </NavLink>
            ))}

            {!collapsed && <p className="text-gray-500 text-[10px] font-semibold tracking-wider px-3 pb-1 pt-4">GERENCIAMENTO</p>}
            {collapsed && <div className="my-2 border-t border-white/10" />}
            {navGerenciamento.map(n => (
              <NavLink key={n.to} to={n.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive ? 'bg-orange-500/20 text-orange-400 border-l-2 border-orange-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`
                }>
                <n.icon size={17} className="flex-shrink-0" />
                {!collapsed && <span className="truncate">{n.label}</span>}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-white/10 p-3">
            {!collapsed && (
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">GT</div>
                <div className="min-w-0">
                  <p className="text-white text-xs font-medium truncate">Gabriel Taveira</p>
                  <p className="text-gray-400 text-[10px]">Administrador</p>
                </div>
              </div>
            )}
            <button onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-white text-xs py-1.5 rounded hover:bg-white/5 transition-colors">
              {collapsed ? <ChevronRight size={14} /> : <><ChevronLeft size={14} /><span>Recolher menu</span></>}
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
            <input
              className="bg-gray-100 rounded-lg px-4 py-2 text-sm text-gray-500 w-72 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Buscar no Alfa Flow..."
            />
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">10 de outubro de 2026</span>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">GT</div>
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
