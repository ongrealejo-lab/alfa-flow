import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const vendasSemana = [
  { dia: 'Seg', valor: 820 }, { dia: 'Ter', valor: 1200 }, { dia: 'Qua', valor: 950 },
  { dia: 'Qui', valor: 1400 }, { dia: 'Sex', valor: 1800 }, { dia: 'Sab', valor: 2100 }, { dia: 'Dom', valor: 1050 },
]

const topProdutos = [
  { nome: 'Capinha A54', vendas: 24 }, { nome: 'Cabo USB-C', vendas: 18 },
  { nome: 'Carregador 20W', vendas: 15 }, { nome: 'Película 15', vendas: 12 }, { nome: 'Fone BT', vendas: 9 },
]

export default function Relatorios() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Relatórios</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-3">Vendas por dia (semana atual)</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={vendasSemana}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="dia" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: number) => [`R$ ${v}`, 'Vendas']} />
              <Line type="monotone" dataKey="valor" stroke="#1a56db" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-3">Top 5 produtos mais vendidos</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topProdutos} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="nome" type="category" tick={{ fontSize: 11 }} width={90} />
              <Tooltip />
              <Bar dataKey="vendas" name="Vendas" fill="#1a56db" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Vendas na semana', value: 'R$ 9.320' },
          { label: 'Ticket médio', value: 'R$ 148,57' },
          { label: 'Itens vendidos', value: '63 un' },
          { label: 'OS concluídas', value: '12' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">{k.label}</p>
            <p className="text-xl font-bold mt-1 text-gray-800">{k.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
