export default function Configuracoes() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Configurações</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-medium text-gray-800 mb-4">Dados da Empresa</h3>
          <div className="space-y-3">
            {[
              ['Nome da empresa', 'Alfa Celulares'],
              ['CNPJ', '00.000.000/0001-00'],
              ['Telefone', '(11) 3333-4444'],
              ['Endereço', 'Rua das Flores, 123 - Santo André'],
            ].map(([l, v]) => (
              <div key={l}>
                <label className="text-xs text-gray-500">{l}</label>
                <input defaultValue={v}
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            ))}
            <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg">
              Salvar
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-medium text-gray-800 mb-4">Notificações</h3>
          <div className="space-y-4">
            {[
              { label: 'Alertas de estoque baixo', on: true },
              { label: 'OS vencidas', on: true },
              { label: 'Relatório diário por e-mail', on: false },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.label}</span>
                <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${item.on ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.on ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
