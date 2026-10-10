import { useState } from 'react'
import { Search, Plus, Minus, Trash2, ShoppingCart, Printer, X } from 'lucide-react'

const produtos = [
  { id: 1, nome: 'Cabo USB-C 1m', preco: 29.9, codigo: 'CAB001' },
  { id: 2, nome: 'Película iPhone 15', preco: 19.9, codigo: 'PEL015' },
  { id: 3, nome: 'Capinha Samsung A54', preco: 39.9, codigo: 'CAP054' },
  { id: 4, nome: 'Carregador 20W', preco: 59.9, codigo: 'CAR020' },
  { id: 5, nome: 'Fone Bluetooth', preco: 89.9, codigo: 'FON001' },
  { id: 6, nome: 'Suporte Veicular', preco: 34.9, codigo: 'SUP001' },
]

type Item = { id: number; nome: string; preco: number; qty: number }

function fmt(v: number) { return v.toFixed(2).replace('.', ',') }

function Cupom({ itens, subtotal, desconto, total, pagamento, numero, onClose }: {
  itens: Item[]; subtotal: number; desconto: number; total: number; pagamento: string; numero: string; onClose: () => void
}) {
  const agora = new Date()
  const data = agora.toLocaleDateString('pt-BR')
  const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  const imprimir = () => window.print()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
        {/* Ações */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2 print:hidden">
          <h3 className="font-semibold text-gray-700">Comprovante de venda</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>

        {/* Cupom imprimível */}
        <div id="cupom" className="px-6 pb-2 font-mono text-xs text-gray-700">
          <div className="text-center mb-3 border-b border-dashed border-gray-300 pb-3">
            <p className="font-bold text-base text-gray-900">Alfa Flow</p>
            <p className="text-gray-500">GESTÃO COMERCIAL</p>
            <p className="text-gray-400 mt-1">Rua das Flores, 123 · Santo André</p>
            <p className="text-gray-400">(11) 3333-4444</p>
          </div>

          <div className="flex justify-between mb-1">
            <span className="text-gray-500">Venda nº</span>
            <span className="font-bold">{numero}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-500">{data} às {hora}</span>
            <span className="text-gray-500">{pagamento}</span>
          </div>

          <div className="border-t border-dashed border-gray-300 pt-3 mb-3 space-y-1.5">
            {itens.map(i => (
              <div key={i.id}>
                <div className="flex justify-between">
                  <span className="flex-1 truncate pr-2">{i.nome}</span>
                  <span>R$ {fmt(i.preco * i.qty)}</span>
                </div>
                <span className="text-gray-400">{i.qty}x R$ {fmt(i.preco)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-gray-300 pt-3 space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>R$ {fmt(subtotal)}</span>
            </div>
            {desconto > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Desconto</span>
                <span>- R$ {fmt(desconto)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-sm border-t border-dashed border-gray-300 pt-2 mt-1">
              <span>TOTAL</span>
              <span>R$ {fmt(total)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Pagamento</span>
              <span>{pagamento}</span>
            </div>
          </div>

          <div className="text-center mt-4 pb-4 border-t border-dashed border-gray-300 pt-3">
            <p className="text-gray-400">Obrigado pela preferência!</p>
            <p className="text-gray-300 text-[10px] mt-1">Alfa Flow · Sistema de Gestão</p>
          </div>
        </div>

        {/* Botões */}
        <div className="px-5 pb-5 flex gap-2 print:hidden">
          <button onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-sm py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            Nova venda
          </button>
          <button onClick={imprimir}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm py-2.5 rounded-xl font-medium transition-colors">
            <Printer size={15} /> Imprimir
          </button>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #cupom, #cupom * { visibility: visible; }
          #cupom { position: fixed; top: 0; left: 0; width: 80mm; font-size: 11px; }
        }
      `}</style>
    </div>
  )
}

export default function PDV() {
  const [busca, setBusca] = useState('')
  const [carrinho, setCarrinho] = useState<Item[]>([])
  const [desconto, setDesconto] = useState(0)
  const [pagamento, setPagamento] = useState('PIX')
  const [cupom, setCupom] = useState<{ itens: Item[]; subtotal: number; desconto: number; total: number; numero: string } | null>(null)

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
    const numero = `#${String(Math.floor(Math.random() * 9000) + 1000)}`
    setCupom({ itens: [...carrinho], subtotal, desconto, total, numero })
  }

  const fecharCupom = () => {
    setCupom(null)
    setCarrinho([])
    setDesconto(0)
    setPagamento('PIX')
  }

  return (
    <div className="flex gap-4 h-full">
      <div className="flex-1 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">PDV — Frente de caixa</h2>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input value={busca} onChange={e => setBusca(e.target.value)}
            placeholder="Buscar produto ou código..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white" />
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
          {filtrados.map(p => (
            <button key={p.id} onClick={() => adicionar(p)}
              className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-orange-400 hover:shadow-sm transition-all">
              <p className="text-xs text-gray-400 font-mono">{p.codigo}</p>
              <p className="text-sm font-medium text-gray-800 mt-1">{p.nome}</p>
              <p className="text-orange-500 font-bold mt-2">R$ {fmt(p.preco)}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="w-80 bg-white border border-gray-200 rounded-xl p-4 flex flex-col shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart size={18} className="text-orange-500" />
          <h3 className="font-semibold text-gray-800">Carrinho</h3>
          <span className="ml-auto text-xs text-gray-400">{carrinho.length} itens</span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {carrinho.length === 0 && <p className="text-sm text-gray-400 text-center py-8">Adicione produtos</p>}
          {carrinho.map(i => (
            <div key={i.id} className="flex items-center gap-2 border-b border-gray-50 pb-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate">{i.nome}</p>
                <p className="text-xs text-gray-400">R$ {fmt(i.preco)}</p>
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
          <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>R$ {fmt(subtotal)}</span></div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Desconto R$</span>
            <input type="number" value={desconto} onChange={e => setDesconto(+e.target.value)} min={0}
              className="w-20 border border-gray-200 rounded px-2 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-orange-400" />
          </div>
          <div className="flex justify-between font-bold"><span>Total</span><span className="text-orange-500">R$ {fmt(total)}</span></div>
          <div className="grid grid-cols-2 gap-1">
            {['PIX', 'Dinheiro', 'Débito', 'Crédito'].map(m => (
              <button key={m} onClick={() => setPagamento(m)}
                className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${pagamento === m ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'}`}>
                {m}
              </button>
            ))}
          </div>
          <button onClick={finalizar} disabled={carrinho.length === 0}
            className="w-full py-3 rounded-xl font-semibold text-sm bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-40 transition-all">
            Finalizar Venda
          </button>
        </div>
      </div>

      {cupom && (
        <Cupom
          itens={cupom.itens}
          subtotal={cupom.subtotal}
          desconto={cupom.desconto}
          total={cupom.total}
          pagamento={pagamento}
          numero={cupom.numero}
          onClose={fecharCupom}
        />
      )}
    </div>
  )
}
