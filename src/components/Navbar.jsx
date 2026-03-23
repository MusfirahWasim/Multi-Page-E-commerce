export default function Navbar({ page, setPage, cartCount }) {
  const navLink = (label, target) => (
    <button
      onClick={() => setPage(target)}
      className={`text-sm font-medium transition-colors ${
        page === target ? 'text-stone-900' : 'text-stone-400 hover:text-stone-700'
      }`}
    >
      {label}
    </button>
  )

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-20">
      <div className="w-full px-12 py-4 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => setPage('home')}
          className="flex items-center gap-2.5"
        >
          <div className="w-7 h-7 rounded-md bg-stone-900 flex items-center justify-center">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="text-base font-semibold text-stone-900 tracking-tight">ShopWithUs</span>
        </button>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          {navLink('Home', 'home')}
          {navLink('Products', 'products')}
        </nav>

        {/* Cart button */}
        <button
          onClick={() => setPage('cart')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors
            ${page === 'cart'
              ? 'bg-stone-900 text-white border-stone-900'
              : 'border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
        >
          <span>🛒</span>
          <span>Cart</span>
          {cartCount > 0 && (
            <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center
              ${page === 'cart' ? 'bg-white text-stone-900' : 'bg-stone-900 text-white'}`}>
              {cartCount}
            </span>
          )}
        </button>

      </div>
    </header>
  )
}
