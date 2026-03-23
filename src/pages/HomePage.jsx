import products from '../data/products'

const CATEGORIES = ['Electronics', 'Home', 'Kitchen', 'Stationery']

export default function HomePage({ setPage, onViewProduct }) {
  const featured = products.slice(0, 4)

  return (
    <div className="w-full">

      {/* Hero */}
      <section className="w-full px-12 py-20 bg-white border-b border-stone-100">
        <div className="max-w-2xl">
          <p className="text-xs font-mono text-stone-400 tracking-widest uppercase mb-4">New Season</p>
          <h1 className="text-5xl font-semibold text-stone-900 tracking-tight leading-tight mb-6">
            Everything you<br />need, all in one place.
          </h1>
          <p className="text-base text-stone-500 mb-8 leading-relaxed">
            Browse our curated selection of electronics, home essentials, kitchen tools, and stationery.
          </p>
          <button
            onClick={() => setPage('products')}
            className="px-8 py-3.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full px-12 py-14">
        <p className="text-xs font-mono text-stone-400 tracking-widest uppercase mb-2">Browse by</p>
        <h2 className="text-2xl font-semibold text-stone-900 mb-8">Categories</h2>
        <div className="grid grid-cols-4 gap-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setPage('products')}
              className="bg-white border border-stone-100 rounded-2xl p-6 flex items-center justify-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <span className="text-sm font-medium text-stone-700 group-hover:text-stone-900">{cat}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="w-full px-12 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-stone-900 mb-8">Featured Products</h2>
          </div>
          <button
            onClick={() => setPage('products')}
            className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
          >
            View all →
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {featured.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              onClick={() => onViewProduct(product.id)}
            >
              <div className="w-full h-36 bg-stone-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={e => { e.target.style.display = 'none' }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-stone-900 truncate">{product.name}</p>
                <p className="text-sm font-semibold text-stone-700 mt-1">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
