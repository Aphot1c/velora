function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.5 8.5h11l-.8 11h-9.4l-.8-11Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8.5V7.2a3 3 0 0 1 6 0v1.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default function Header({ cartCount, onOpenCart, menuOpen, onToggleMenu, onNavigate }) {
  return (
    <header className="site-header">
      <div className="announcement">
        Complimentary shipping on orders over $150 · Easy 30-day returns
      </div>
      <div className="nav-bar wrap">
        <button
          type="button"
          className="menu-button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={onToggleMenu}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        <nav className="desktop-nav" aria-label="Primary">
          <a href="#shop">Shop</a>
          <a href="#categories">Categories</a>
          <a href="#journal">Journal</a>
        </nav>

        <a className="logo" href="#top" onClick={onNavigate}>
          VELORA
        </a>

        <div className="nav-actions">
          <a className="nav-quiet" href="#shop">
            Search
          </a>
          <button type="button" className="bag-button" onClick={onOpenCart}>
            <BagIcon />
            <span>Bag</span>
            <span className="bag-count" aria-label={`${cartCount} items in cart`}>
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile">
          <a href="#shop" onClick={onNavigate}>
            Shop
          </a>
          <a href="#categories" onClick={onNavigate}>
            Categories
          </a>
          <a href="#journal" onClick={onNavigate}>
            Journal
          </a>
        </nav>
      )}
    </header>
  )
}
