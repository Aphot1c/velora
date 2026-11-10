import { useCallback, useEffect, useMemo, useState } from 'react'

import Header from './components/Header'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'

import { categories } from './data/products'
import { getProducts } from './api'

import './App.css'

const filters = ['All', ...categories.map((category) => category.id)]

function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

useEffect(() => {
  async function loadProducts() {
    try {
      setLoading(true)
      const data = await getProducts()
      setProducts(data)
      setError('')
    } catch (err) {
      console.error('Product loading error:', err)
      setError('Unable to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  loadProducts()
}, [])


  useEffect(() => {
    document.title = 'VELORA — A smarter way to shop'
  }, [])

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(''), 2400)
    return () => clearTimeout(timer)
  }, [toast])

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category
      const haystack = `${product.name} ${product.category} ${product.material} ${product.description}`.toLowerCase()
      const matchesSearch = query === '' || haystack.includes(query)
      return matchesCategory && matchesSearch
    })
  }, [search, category, products])

  const lines = cart
    .map((item) => {
      const product = products.find((entry) => entry.id === item.id)
      if (!product) return null
      return { ...item, product }
    })
    .filter(Boolean)

  const cartCount = lines.reduce((sum, line) => sum + line.quantity, 0)
  const cartTotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0)

  function addToCart(productId) {
    const product = products.find((item) => item.id === productId)
    if (!product || product.stock <= 0) return

    setCart((current) => {
      const existing = current.find((item) => item.id === productId)
      if (!existing) return [...current, { id: productId, quantity: 1 }]
      if (existing.quantity >= product.stock) return current
      return current.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      )
    })
    setToast(`${product.name} added to your bag`)
  }

  function changeQty(productId, delta) {
    const product = products.find((item) => item.id === productId)
    setCart((current) =>
      current
        .map((item) => {
          if (item.id !== productId) return item
          const next = item.quantity + delta
          if (next > product.stock) return item
          return { ...item, quantity: next }
        })
        .filter((item) => item.quantity > 0),
    )
  }

  function removeFromCart(productId) {
    setCart((current) => current.filter((item) => item.id !== productId))
  }

  const closeCart = useCallback(() => setCartOpen(false), [])

  function chooseCategory(nextCategory) {
    setCategory(nextCategory)
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div id="top">
      <Header
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onNavigate={() => setMenuOpen(false)}
      />

      <main>
        <Hero />

        <section className="trust wrap" aria-label="Service promises">
          <p>Free shipping over $150</p>
          <p>30-day returns</p>
          <p>Ships to 40 countries</p>
          <p>Stores in 12 cities</p>
        </section>

        <section className="categories wrap" id="categories" aria-labelledby="categories-title">
          <div className="section-heading">
            <p className="eyebrow">Categories</p>
            <h2 id="categories-title">Shop by what you need.</h2>
          </div>
          <div className="category-grid">
            {categories.map((item) => {
              const count = products.filter((product) => product.category === item.id).length
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`category-tile ${category === item.id ? 'is-active' : ''}`}
                  onClick={() => chooseCategory(item.id)}
                >
                  <img src={item.image} alt="" />
                  <span>
                    <strong>{item.label}</strong>
                    <em>
                      {count} {count === 1 ? 'piece' : 'pieces'}
                    </em>
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="shop wrap" id="shop" aria-labelledby="shop-title">
          <div className="section-heading shop-heading">
            <div>
              <p className="eyebrow">The edit</p>
              <h2 id="shop-title">This season’s pieces.</h2>
            </div>
            <p className="result-count">
              {visibleProducts.length} {visibleProducts.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>

          <div className="shop-tools">
            <form className="search" role="search" onSubmit={(event) => event.preventDefault()}>
              <label className="sr-only" htmlFor="product-search">
                Search products
              </label>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.5" />
                <path d="M16 16.5 20 20.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <input
                id="product-search"
                type="search"
                placeholder="Search coats, linen, cedar, leather…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              {search && (
                <button type="button" className="text-button" onClick={() => setSearch('')}>
                  Clear
                </button>
              )}
            </form>

            <div className="filters" role="tablist" aria-label="Filter by category">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={category === filter}
                  className={category === filter ? 'is-active' : ''}
                  onClick={() => setCategory(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
  <div className="empty-shop">
    <h3>Loading products...</h3>
    <p>Please wait while we load the Velora collection.</p>
  </div>
) : error ? (
  <div className="empty-shop">
    <h3>Something went wrong.</h3>
    <p>{error}</p>
  </div>
) : visibleProducts.length === 0 ? (
  <div className="empty-shop">
    <h3>No pieces match that search.</h3>
    <p>Try another word, or look through the full edit.</p>
    <button
      type="button"
      className="button button-dark"
      onClick={() => {
        setSearch('')
        setCategory('All')
      }}
    >
      View all pieces
    </button>
  </div>
) : (
  <div className="product-grid">
    {visibleProducts.map((product) => {
      const inCart = cart.find((item) => item.id === product.id)
      return (
        <ProductCard
          key={product.id}
          product={product}
          cartQty={inCart ? inCart.quantity : 0}
          onAdd={addToCart}
        />
      )
    })}
  </div>
)}

        </section>

        <section className="journal" id="journal" aria-labelledby="journal-title">
          <div className="journal-media">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80"
              alt="A person walking in a long tailored coat"
            />
          </div>
          <div className="journal-copy">
            <p className="eyebrow">Journal</p>
            <h2 id="journal-title">Fewer things. Better made.</h2>
            <p>
              We visit workshops rather than trade shows. A Velora piece is kept when the cloth,
              the last, or the formula is something we would live with ourselves — and when it can
              be repaired, not replaced.
            </p>
            <ul className="journal-stats">
              <li>
                <strong>80</strong>
                <span>independent makers</span>
              </li>
              <li>
                <strong>12</strong>
                <span>city stores</span>
              </li>
              <li>
                <strong>2019</strong>
                <span>first edit</span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        lines={lines}
        total={cartTotal}
        onClose={closeCart}
        onChangeQty={changeQty}
        onRemove={removeFromCart}
      />

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  )
}

export default App
