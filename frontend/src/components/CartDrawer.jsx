import { useEffect } from 'react'
import { formatPrice } from '../data/products'

export default function CartDrawer({
  open,
  lines,
  total,
  onClose,
  onChangeQty,
  onRemove,
}) {
  useEffect(() => {
    if (!open) return undefined

    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const pieceCount = lines.reduce((sum, line) => sum + line.quantity, 0)

  return (
    <div className="drawer-root">
      <button type="button" className="drawer-backdrop" aria-label="Close cart" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="drawer-header">
          <div>
            <p className="eyebrow">Your bag</p>
            <h2 id="cart-title">{lines.length === 0 ? 'Nothing here yet' : 'Ready when you are'}</h2>
          </div>
          <button type="button" className="text-button" onClick={onClose}>
            Close
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p>Your bag is empty. The edit is waiting whenever you are.</p>
            <a className="button button-dark" href="#shop" onClick={onClose}>
              Browse the shop
            </a>
          </div>
        ) : (
          <ul className="cart-lines">
            {lines.map((line) => (
              <li key={line.product.id} className="cart-line">
                <img src={line.product.image} alt="" />
                <div className="cart-line-copy">
                  <h3>{line.product.name}</h3>
                  <p>{formatPrice(line.product.price)}</p>
                  <div className="qty">
                    <button
                      type="button"
                      aria-label={`Decrease ${line.product.name}`}
                      onClick={() => onChangeQty(line.product.id, -1)}
                    >
                      −
                    </button>
                    <span>{line.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${line.product.name}`}
                      onClick={() => onChangeQty(line.product.id, 1)}
                      disabled={line.quantity >= line.product.stock}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-button remove"
                    onClick={() => onRemove(line.product.id)}
                  >
                    Remove
                  </button>
                </div>
                <p className="line-total">{formatPrice(line.product.price * line.quantity)}</p>
              </li>
            ))}
          </ul>
        )}

        <footer className="drawer-footer">
          <div className="total-row">
            <span>Subtotal</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <p className="fine-print">
            {pieceCount} {pieceCount === 1 ? 'item' : 'items'} in your bag. Shipping and tax are
            confirmed at checkout.
          </p>
          <button type="button" className="button button-dark button-block" onClick={onClose}>
            Continue shopping
          </button>
        </footer>
      </aside>
    </div>
  )
}
