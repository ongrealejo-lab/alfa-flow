import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const meses = [
  { mes: 'Mai', receita: 8200, despesa: 5100 },
  { mes: 'Jun', receita: 9400, despesa: 5800 },
  { mes: 'Jul', receita: 7800, despesa: 4900 },
  { mes: 'Ago', receita: 11200, despesa: 6200 },
  { mes: 'Set', receita: 10500, despesa: 5900 },
  { mes: 'Out', receita: 4200, despesa: 2800 },
]

const lancamentos = [
  { data: '10/10', desc: 'Venda #0042', tipo: 'Receita', valor: 'R$ 320,00', categoria: 'Vendas' },
  { data: '10/10', desc: 'Fornecedor ABC', tipo: 'Despesa', valor: 'R$ 850,00', categoria: 'Compras' },
  { data: '09/10', desc: 'Venda #0041', tipo: 'Receita', valor: 'R$ 85,00', categoria: 'Vendas' },
  { data: '09/10', desc: 'Aluguel', tipo: 'Despesa', valor: 'R$ 1.200,00', categoria: 'Fixo' },
  { data: '08/10', desc: 'Venda #0040', tipo: 'Receita', valor: 'R$ 210,00', categoria: 'Vendas' },
]

export default function Financeiro() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Financeiro</h2>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Receita (Out)', value: 'R$ 4.200', color: 'text-green-600' },
          { label: 'Despesas (Out)', value: 'R$ 2.800', color: 'text-red-500' },
          { label: 'Lucro (Out)', value: 'R$ 1.400', color: 'text-blue-600' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">{k.label}</p>
            <p className={`text-2xl font-bold mt-1 ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p className="text-sm font-medium text-gray-700 mb-3">Receita vs Despesa — 6 meses</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={meses}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => `R$ ${Number(v).toLocaleString('pt-BR')}`} />
            <Bar dataKey="receita" name="Receita" fill="#22c55e" radius={[4,4,0,0]} />
            <Bar dataKey="despesa" name="Despesa" fill="#ef4444" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-700">Lançamentos recentes</p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['Data', 'Descrição', 'Tipo', 'Categoria', 'Valor'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lancamentos.map((l, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400">{l.data}</td>
                <td className="px-4 py-3 text-gray-800">{l.desc}</td>
                <td className="px-4 py-3"><span className={`text-xs font-medium px-2 py-1 rounded-full ${l.tipo === 'Receita' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{l.tipo}</span></td>
                <td className="px-4 py-3 text-gray-500">{l.categoria}</td>
                <td className={`px-4 py-3 font-medium ${l.tipo === 'Receita' ? 'text-green-600' : 'text-red-500'}`}>{l.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
