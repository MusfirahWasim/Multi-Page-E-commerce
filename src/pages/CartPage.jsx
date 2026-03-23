export default function CartPage({ cart, onUpdateQty, onRemove, setPage }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const shipping = subtotal > 0 ? 9.99 : 0
  const total    = subtotal + shipping

  if (cart.length === 0) {
    return (
      <div className="w-full px-12 py-20 flex flex-col items-center justify-center gap-4 text-center">
        <span className="text-5xl">🛒</span>
        <h2 className="text-xl font-semibold text-stone-900">Your cart is empty</h2>
        <p className="text-sm text-stone-400">Add some products to get started.</p>
        <button
          onClick={() => setPage('products')}
          className="mt-2 px-6 py-3 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-700 transition-colors"
        >
          Browse Products
        </button>
      </div>
    )
  }

  return (
    <div className="w-full px-12 py-10">
      <div className="mb-8">
        <p className="text-xs font-mono text-stone-400 tracking-widest uppercase mb-1">Review</p>
        <h1 className="text-2xl font-semibold text-stone-900">Your Cart</h1>
      </div>

      <div className="grid gap-8 items-start" style={{ gridTemplateColumns: '1fr 340px' }}>

        {/* Cart items */}
        <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">Qty</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">Total</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={item.id} className={`border-b border-stone-50 ${i % 2 === 0 ? '' : 'bg-stone-50/40'}`}>
                  {/* Product */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-stone-100 overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={e => { e.target.style.display = 'none' }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-stone-900">{item.name}</p>
                        <p className="text-xs text-stone-400">{item.category}</p>
                      </div>
                    </div>
                  </td>

                  {/* Unit price */}
                  <td className="px-6 py-4 text-sm text-stone-600 font-mono">${item.price.toFixed(2)}</td>

                  {/* Qty controls */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 rounded-lg border border-stone-200 text-stone-600 text-sm hover:bg-stone-100 transition-colors flex items-center justify-center"
                      >−</button>
                      <span className="text-sm font-medium text-stone-900 w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 rounded-lg border border-stone-200 text-stone-600 text-sm hover:bg-stone-100 transition-colors flex items-center justify-center"
                      >+</button>
                    </div>
                  </td>

                  {/* Row total */}
                  <td className="px-6 py-4 text-sm font-semibold text-stone-900 font-mono">
                    ${(item.price * item.qty).toFixed(2)}
                  </td>

                  {/* Remove */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-stone-300 hover:text-red-400 transition-colors text-sm"
                    >✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl border border-stone-100 p-7 flex flex-col gap-5 sticky top-24">
          <div>
            <p className="text-xs font-mono text-stone-400 tracking-widest uppercase mb-1">Summary</p>
            <h2 className="text-lg font-semibold text-stone-900">Order Total</h2>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span className="font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Shipping</span>
              <span className="font-mono">${shipping.toFixed(2)}</span>
            </div>
            <div className="border-t border-stone-100 pt-3 flex justify-between font-semibold text-stone-900 text-base">
              <span>Total</span>
              <span className="font-mono">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setPage('checkout')}
            className="w-full py-3.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={() => setPage('products')}
            className="w-full py-3 border border-stone-200 text-stone-600 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  )
}
