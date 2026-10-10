import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const vendas7d = [
  { dia: 'Seg', valor: 820 },
  { dia: 'Ter', valor: 1200 },
  { dia: 'Qua', valor: 950 },
  { dia: 'Qui', valor: 1400 },
  { dia: 'Sex', valor: 1800 },
  { dia: 'Sab', valor: 2100 },
  { dia: 'Dom', valor: 1050 },
]

const osStatus = [
  { name: 'Concluídas', value: 12, color: '#22c55e' },
  { name: 'Em andamento', value: 5, color: '#3b82f6' },
  { name: 'Aguardando', value: 3, color: '#f59e0b' },
  { name: 'Abertas', value: 4, color: '#ef4444' },
]

const ultimasVendas = [
  { id: '#0042', cliente: 'Maria Silva', valor: 'R$ 320,00', forma: 'PIX', hora: '09:14' },
  { id: '#0041', cliente: 'João Pereira', valor: 'R$ 85,00', forma: 'Débito', hora: '08:52' },
  { id: '#0040', cliente: 'Ana Costa', valor: 'R$ 210,00', forma: 'Crédito', hora: '08:30' },
  { id: '#0039', cliente: 'Carlos Lima', valor: 'R$ 145,00', forma: 'Dinheiro', hora: '08:01' },
  { id: '#0038', cliente: 'Fernanda Reis', valor: 'R$ 290,00', forma: 'PIX', hora: '07:45' },
]

const estoqueBaixo = [
  { nome: 'Cabo USB-C 1m', estoque: 2, minimo: 5 },
  { nome: 'Película iPhone 15', estoque: 1, minimo: 10 },
  { nome: 'Capinha Samsung A54', estoque: 3, minimo: 8 },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Vendas hoje', value: 'R$ 1.050', sub: '+12% vs ontem', color: 'text-green-600' },
          { label: 'Pedidos hoje', value: '7', sub: '3 pendentes', color: 'text-blue-600' },
          { label: 'OS abertas', value: '4', sub: '1 urgente', color: 'text-orange-500' },
          { label: 'Ticket médio', value: 'R$ 150', sub: 'últimos 7 dias', color: 'text-purple-600' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">{k.label}</p>
            <p className={`text-2xl font-bold mt-1 ${k.color}`}>{k.value}</p>
            <p className="text-xs text-gray-400 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-3">Vendas — últimos 7 dias</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={vendas7d}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="dia" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [`R$ ${v}`, 'Vendas']} />
              <Line type="monotone" dataKey="valor" stroke="#1a56db" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-3">OS por status</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={osStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                {osStatus.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
            {osStatus.map(s => (
              <span key={s.name} className="flex items-center gap-1 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: s.color }} />
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-3">Últimas vendas</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 border-b">
                <th className="text-left pb-2">Pedido</th>
                <th className="text-left pb-2">Cliente</th>
                <th className="text-left pb-2">Valor</th>
                <th className="text-left pb-2">Forma</th>
                <th className="text-left pb-2">Hora</th>
              </tr>
            </thead>
            <tbody>
              {ultimasVendas.map(v => (
                <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2 font-mono text-blue-600">{v.id}</td>
                  <td className="py-2">{v.cliente}</td>
                  <td className="py-2 font-medium">{v.valor}</td>
                  <td className="py-2 text-gray-500">{v.forma}</td>
                  <td className="py-2 text-gray-400">{v.hora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-3">⚠️ Estoque baixo</p>
          <div className="space-y-3">
            {estoqueBaixo.map(p => (
              <div key={p.nome} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700">{p.nome}</p>
                  <p className="text-xs text-gray-400">Mín: {p.minimo} un</p>
                </div>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">{p.estoque} un</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
