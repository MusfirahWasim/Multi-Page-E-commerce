import { useState } from 'react'

const FIELDS = [
  { id: 'firstName', label: 'First Name',    placeholder: 'Jane',              half: true  },
  { id: 'lastName',  label: 'Last Name',     placeholder: 'Doe',               half: true  },
  { id: 'email',     label: 'Email Address', placeholder: 'jane@example.com',  half: false },
  { id: 'phone',     label: 'Phone Number',  placeholder: '+1 555 000 0000',   half: false },
  { id: 'address',   label: 'Street Address',placeholder: '123 Main Street',   half: false },
  { id: 'city',      label: 'City',          placeholder: 'New York',          half: true  },
  { id: 'zip',       label: 'ZIP Code',      placeholder: '10001',             half: true  },
  { id: 'cardName',  label: 'Name on Card',  placeholder: 'Jane Doe',          half: false },
  { id: 'cardNum',   label: 'Card Number',   placeholder: '•••• •••• •••• ••••', half: false },
  { id: 'expiry',    label: 'Expiry',        placeholder: 'MM / YY',           half: true  },
  { id: 'cvv',       label: 'CVV',           placeholder: '•••',               half: true  },
]

export default function CheckoutPage({ cart, onPlaceOrder }) {
  const [form,   setForm]   = useState({})
  const [errors, setErrors] = useState({})
  const [placed, setPlaced] = useState(false)

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const total    = subtotal + (subtotal > 0 ? 9.99 : 0)

  const required = ['firstName', 'lastName', 'email', 'address', 'city', 'zip', 'cardName', 'cardNum', 'expiry', 'cvv']

  const validate = () => {
    const e = {}
    required.forEach(f => {
      if (!form[f]?.trim()) e[f] = 'Required'
    })
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    return e
  }

  const handleChange = (id) => (e) => {
    setForm(prev => ({ ...prev, [id]: e.target.value }))
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: '' }))
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setPlaced(true)
    onPlaceOrder()
  }

  const inputClass = (id) =>
    `w-full bg-stone-50 border ${errors[id] ? 'border-red-400' : 'border-stone-200'} rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-stone-700 transition-colors`

  if (placed) {
    return (
      <div className="w-full px-12 py-24 flex flex-col items-center justify-center gap-5 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">✓</div>
        <h2 className="text-2xl font-semibold text-stone-900">Order Placed!</h2>
        <p className="text-sm text-stone-500 max-w-sm">Thanks for your order. You'll receive a confirmation email shortly.</p>
        <p className="text-lg font-semibold text-stone-900 font-mono">Total paid: ${total.toFixed(2)}</p>
      </div>
    )
  }

  // Group fields into rows — half-width fields pair up
  const renderFields = () => {
    const rows = []
    let i = 0
    while (i < FIELDS.length) {
      const f = FIELDS[i]
      if (f.half && FIELDS[i + 1]?.half) {
        rows.push(
          <div key={f.id} className="grid grid-cols-2 gap-4">
            {[f, FIELDS[i + 1]].map(field => (
              <div key={field.id} className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">{field.label}</label>
                <input type="text" placeholder={field.placeholder} value={form[field.id] || ''} onChange={handleChange(field.id)} className={inputClass(field.id)} />
                {errors[field.id] && <p className="text-red-400 text-xs">{errors[field.id]}</p>}
              </div>
            ))}
          </div>
        )
        i += 2
      } else {
        rows.push(
          <div key={f.id} className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">{f.label}</label>
            <input type="text" placeholder={f.placeholder} value={form[f.id] || ''} onChange={handleChange(f.id)} className={inputClass(f.id)} />
            {errors[f.id] && <p className="text-red-400 text-xs">{errors[f.id]}</p>}
          </div>
        )
        i++
      }
    }
    return rows
  }

  return (
    <div className="w-full px-12 py-10">
      <div className="mb-8">
        <p className="text-xs font-mono text-stone-400 tracking-widest uppercase mb-1">Final Step</p>
        <h1 className="text-2xl font-semibold text-stone-900">Checkout</h1>
      </div>

      <div className="grid gap-10 items-start" style={{ gridTemplateColumns: '1fr 320px' }}>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-stone-100 p-8 flex flex-col gap-8">

          {/* Shipping */}
          <div>
            <h3 className="text-base font-semibold text-stone-900 mb-5 pb-3 border-b border-stone-100">
              Shipping Details
            </h3>
            <div className="flex flex-col gap-4">
              {renderFields().slice(0, 5)}
            </div>
          </div>

          {/* City + ZIP */}
          <div className="flex flex-col gap-4">
            {renderFields().slice(5, 6)}
          </div>

          {/* Payment */}
          <div>
            <h3 className="text-base font-semibold text-stone-900 mb-5 pb-3 border-b border-stone-100">
              Payment Details
            </h3>
            <div className="flex flex-col gap-4">
              {renderFields().slice(6)}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            Place Order — ${total.toFixed(2)}
          </button>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl border border-stone-100 p-7 sticky top-24 flex flex-col gap-5">
          <div>
            <p className="text-xs font-mono text-stone-400 tracking-widest uppercase mb-1">Order</p>
            <h2 className="text-lg font-semibold text-stone-900">Summary</h2>
          </div>

          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-100 overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} onError={e => { e.target.style.display = 'none' }} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-stone-900 truncate">{item.name}</p>
                  <p className="text-xs text-stone-400">× {item.qty}</p>
                </div>
                <span className="text-xs font-mono text-stone-700">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-stone-100 pt-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-stone-500">
              <span>Subtotal</span>
              <span className="font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>Shipping</span>
              <span className="font-mono">$9.99</span>
            </div>
            <div className="flex justify-between font-semibold text-stone-900 text-base pt-1">
              <span>Total</span>
              <span className="font-mono">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
