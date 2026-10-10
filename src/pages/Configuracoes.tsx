import { useState } from 'react'
import { Building2, Bell, Printer, Lock, ChevronRight } from 'lucide-react'

export default function Configuracoes() {
  const [aba, setAba] = useState('empresa')
  const [notif, setNotif] = useState({ estoque: true, os: true, email: false, pagamentos: true })

  const abas = [
    { id: 'empresa', icon: Building2, label: 'Dados da empresa' },
    { id: 'notificacoes', icon: Bell, label: 'Notificações' },
    { id: 'impressao', icon: Printer, label: 'Impressão' },
    { id: 'seguranca', icon: Lock, label: 'Segurança' },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Configurações</h2>
        <p className="text-sm text-gray-400 mt-0.5">Gerencie as preferências do sistema.</p>
      </div>

      <div className="flex gap-5">
        {/* Menu lateral */}
        <div className="w-56 flex-shrink-0 space-y-1">
          {abas.map(a => (
            <button key={a.id} onClick={() => setAba(a.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${aba === a.id ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
              <span className="flex items-center gap-2.5">
                <a.icon size={15} />
                {a.label}
              </span>
              <ChevronRight size={14} className="text-gray-300" />
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="flex-1">
          {aba === 'empresa' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-5">Dados da empresa</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[
                  ['Nome da empresa', 'Alfa Celulares'],
                  ['CNPJ', '00.000.000/0001-00'],
                  ['Telefone', '(11) 3333-4444'],
                  ['E-mail', 'contato@alfacelulares.com.br'],
                  ['Endereço', 'Rua das Flores, 123'],
                  ['Cidade / Estado', 'Santo André - SP'],
                  ['CEP', '09000-000'],
                  ['Site', 'www.alfacelulares.com.br'],
                ].map(([l, v]) => (
                  <div key={l}>
                    <label className="text-xs font-medium text-gray-500">{l}</label>
                    <input defaultValue={v}
                      className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-gray-100 flex justify-end">
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-5 py-2 rounded-lg font-medium transition-colors">
                  Salvar alterações
                </button>
              </div>
            </div>
          )}

          {aba === 'notificacoes' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-5">Notificações</h3>
              <div className="space-y-5">
                {[
                  { key: 'estoque', label: 'Alertas de estoque baixo', desc: 'Avisa quando um produto atingir o estoque mínimo.' },
                  { key: 'os', label: 'OS próximas do prazo', desc: 'Notifica ordens de serviço com prazo nos próximos 2 dias.' },
                  { key: 'pagamentos', label: 'Vencimentos do financeiro', desc: 'Lembra contas a pagar ou receber nos próximos 3 dias.' },
                  { key: 'email', label: 'Relatório diário por e-mail', desc: 'Envia um resumo do dia para o e-mail do administrador.' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <button onClick={() => setNotif(n => ({ ...n, [item.key]: !n[item.key as keyof typeof n] }))}
                      className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${notif[item.key as keyof typeof notif] ? 'bg-orange-500' : 'bg-gray-200'}`}>
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${notif[item.key as keyof typeof notif] ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {aba === 'impressao' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-5">Configurações de impressão</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500">Largura do cupom</label>
                  <select className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400">
                    <option>80mm (padrão)</option>
                    <option>58mm</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Rodapé do cupom</label>
                  <textarea defaultValue="Obrigado pela preferência! Volte sempre." rows={3}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
                </div>
                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Imprimir logo no cupom</p>
                    <p className="text-xs text-gray-400 mt-0.5">Exibe o nome da empresa no topo do cupom fiscal.</p>
                  </div>
                  <div className="w-11 h-6 rounded-full bg-orange-500 relative flex-shrink-0">
                    <span className="absolute top-1 translate-x-6 w-4 h-4 bg-white rounded-full shadow" />
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t border-gray-100 flex justify-end">
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-5 py-2 rounded-lg font-medium transition-colors">
                  Salvar alterações
                </button>
              </div>
            </div>
          )}

          {aba === 'seguranca' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-5">Segurança</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500">Senha atual</label>
                  <input type="password" placeholder="••••••••"
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Nova senha</label>
                  <input type="password" placeholder="••••••••"
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Confirmar nova senha</label>
                  <input type="password" placeholder="••••••••"
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              </div>
              <div className="mt-6 pt-5 border-t border-gray-100 flex justify-end">
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-5 py-2 rounded-lg font-medium transition-colors">
                  Alterar senha
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
