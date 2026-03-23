import { useState } from 'react'
import Navbar      from './components/Navbar'
import HomePage    from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import CartPage    from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

export default function App() {
  const [page, setPage] = useState('home')
  const [cart, setCart] = useState([])

  // Add product to cart — increase qty if already in cart
  const handleAddToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  // Update quantity — remove if qty reaches 0
  const handleUpdateQty = (id, qty) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(item => item.id !== id))
    } else {
      setCart(prev => prev.map(item => item.id === id ? { ...item, qty } : item))
    }
  }

  // Remove item from cart
  const handleRemove = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  // Clear cart after order placed
  const handlePlaceOrder = () => {
    setCart([])
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0efed' }}>
      <Navbar page={page} setPage={setPage} cartCount={cartCount} />

      {page === 'home'     && <HomePage    setPage={setPage} />}
      {page === 'products' && <ProductsPage cart={cart} onAddToCart={handleAddToCart} />}
      {page === 'cart'     && <CartPage    cart={cart} onUpdateQty={handleUpdateQty} onRemove={handleRemove} setPage={setPage} />}
      {page === 'checkout' && <CheckoutPage cart={cart} onPlaceOrder={handlePlaceOrder} />}
    </div>
  )
}
