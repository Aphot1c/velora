import { formatPrice, stockStatus } from '../data/products'

export default function ProductCard({ product, cartQty, onAdd }) {
  const status = stockStatus(product.stock)
  const soldOut = product.stock <= 0
  const atLimit = cartQty >= product.stock && product.stock > 0

  let buttonLabel = 'Add to Cart'
  if (soldOut) buttonLabel = 'Sold out'
  else if (atLimit) buttonLabel = 'Max in bag'
  else if (cartQty > 0) buttonLabel = `Add to Cart (${cartQty})`

  return (
    <article className="product-card">
      <div className="product-media">
        <img src={product.image} alt={product.name} />
        <span className={`stock stock-${status.tone}`}>{status.label}</span>
      </div>
      <div className="product-body">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-meta">
          {product.material} · {product.origin}
        </p>
        <div className="product-row">
          <p className="price">{formatPrice(product.price)}</p>
          <button
            type="button"
            className="add-button"
            onClick={() => onAdd(product.id)}
            disabled={soldOut || atLimit}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </article>
  )
}
