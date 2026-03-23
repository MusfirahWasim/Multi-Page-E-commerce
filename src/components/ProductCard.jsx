import { useState } from 'react'

const CATEGORY_COLORS = {
  Electronics: 'bg-blue-50 text-blue-600',
  Home:        'bg-emerald-50 text-emerald-600',
  Kitchen:     'bg-amber-50 text-amber-600',
  Stationery:  'bg-violet-50 text-violet-600',
}

export default function ProductCard({ product, onAddToCart, cartQty }) {
  const [imgError, setImgError] = useState(false)
  const [added, setAdded] = useState(false)
  const color = CATEGORY_COLORS[product.category] || 'bg-stone-100 text-stone-500'

  const handleAdd = () => {
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

      {/* Image */}
      <div className="w-full h-44 bg-stone-100 overflow-hidden relative">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300 text-sm">
            No image
          </div>
        )}
        {cartQty > 0 && (
          <div className="absolute top-2 right-2 bg-stone-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cartQty}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-stone-900 leading-snug">{product.name}</h3>
          <span className={`flex-shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full ${color}`}>
            {product.category}
          </span>
        </div>
        <p className="text-xs text-stone-400 leading-relaxed">{product.description}</p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-stone-100">
          <span className="text-lg font-semibold text-stone-900">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200
              ${added
                ? 'bg-green-500 text-white scale-95'
                : 'bg-stone-900 text-white hover:bg-stone-700'
              }`}
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
