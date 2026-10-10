import { useState } from 'react'
import { Search, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react'

const produtos = [
  { id: 1, nome: 'Cabo USB-C 1m', preco: 29.9, codigo: 'CAB001' },
  { id: 2, nome: 'Película iPhone 15', preco: 19.9, codigo: 'PEL015' },
  { id: 3, nome: 'Capinha Samsung A54', preco: 39.9, codigo: 'CAP054' },
  { id: 4, nome: 'Carregador 20W', preco: 59.9, codigo: 'CAR020' },
  { id: 5, nome: 'Fone Bluetooth', preco: 89.9, codigo: 'FON001' },
  { id: 6, nome: 'Suporte Veicular', preco: 34.9, codigo: 'SUP001' },
]

type Item = { id: number; nome: string; preco: number; qty: number }

export default function PDV() {
  const [busca, setBusca] = useState('')
  const [carrinho, setCarrinho] = useState<Item[]>([])
  const [desconto, setDesconto] = useState(0)
  const [pagamento, setPagamento] = useState('PIX')
  const [finalizado, setFinalizado] = useState(false)

  const filtrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) || p.codigo.includes(busca)
  )

  const adicionar = (p: typeof produtos[0]) => {
    setCarrinho(c => {
      const ex = c.find(i => i.id === p.id)
      if (ex) return c.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
      return [...c, { ...p, qty: 1 }]
    })
  }

  const altQty = (id: number, d: number) => {
    setCarrinho(c => c.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i))
  }

  const remover = (id: number) => setCarrinho(c => c.filter(i => i.id !== id))

  const subtotal = carrinho.reduce((s, i) => s + i.preco * i.qty, 0)
  const total = Math.max(0, subtotal - desconto)

  const finalizar = () => {
    setFinalizado(true)
    setTimeout(() => { setCarrinho([]); setDesconto(0); setFinalizado(false) }, 2500)
  }

  return (
    <div className="flex gap-4 h-full">
      <div className="flex-1 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">PDV — Ponto de Venda</h2>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input value={busca} onChange={e => setBusca(e.target.value)}
            placeholder="Buscar produto ou código..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
          {filtrados.map(p => (
            <button key={p.id} onClick={() => adicionar(p)}
              className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-blue-400 hover:shadow-sm transition-all">
              <p className="text-xs text-gray-400 font-mono">{p.codigo}</p>
              <p className="text-sm font-medium text-gray-800 mt-1">{p.nome}</p>
              <p className="text-blue-600 font-bold mt-2">R$ {p.preco.toFixed(2).replace('.', ',')}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="w-80 bg-white border border-gray-200 rounded-xl p-4 flex flex-col shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart size={18} className="text-blue-600" />
          <h3 className="font-semibold text-gray-800">Carrinho</h3>
          <span className="ml-auto text-xs text-gray-400">{carrinho.length} itens</span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {carrinho.length === 0 && <p className="text-sm text-gray-400 text-center py-8">Adicione produtos</p>}
          {carrinho.map(i => (
            <div key={i.id} className="flex items-center gap-2 border-b border-gray-50 pb-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate">{i.nome}</p>
                <p className="text-xs text-gray-400">R$ {i.preco.toFixed(2).replace('.', ',')}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => altQty(i.id, -1)} className="w-5 h-5 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center"><Minus size={10} /></button>
                <span className="text-xs w-5 text-center">{i.qty}</span>
                <button onClick={() => altQty(i.id, 1)} className="w-5 h-5 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center"><Plus size={10} /></button>
              </div>
              <button onClick={() => remover(i.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-3 border-t border-gray-100 pt-3">
          <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>R$ {subtotal.toFixed(2).replace('.', ',')}</span></div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Desconto R$</span>
            <input type="number" value={desconto} onChange={e => setDesconto(+e.target.value)} min={0}
              className="w-20 border border-gray-200 rounded px-2 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="flex justify-between font-bold"><span>Total</span><span className="text-blue-600">R$ {total.toFixed(2).replace('.', ',')}</span></div>
          <div className="grid grid-cols-2 gap-1">
            {['PIX', 'Dinheiro', 'Débito', 'Crédito'].map(m => (
              <button key={m} onClick={() => setPagamento(m)}
                className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${pagamento === m ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>
                {m}
              </button>
            ))}
          </div>
          <button onClick={finalizar} disabled={carrinho.length === 0 || finalizado}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${finalizado ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40'}`}>
            {finalizado ? '✓ Venda finalizada!' : 'Finalizar Venda'}
          </button>
        </div>
      </div>
    </div>
  )
}
