import { useState } from 'react'

const year = new Date().getFullYear()

export default function Footer() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!email.includes('@') || !email.includes('.')) {
      setError('Enter a valid email address.')
      return
    }
    setError('')
    setJoined(true)
  }

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="logo footer-logo">VELORA</p>
          <p className="footer-tagline">A smarter way to shop.</p>
          <p className="footer-note">
            An international retail edit, designed in Copenhagen and shipped from studios across
            Europe and Japan.
          </p>
        </div>

        <div>
          <h2>Visit</h2>
          <ul>
            <li>Copenhagen</li>
            <li>London</li>
            <li>New York</li>
            <li>Tokyo</li>
          </ul>
        </div>

        <div>
          <h2>Client care</h2>
          <ul>
            <li>Shipping & returns</li>
            <li>Size guide</li>
            <li>Store appointments</li>
            <li>care@velora.shop</li>
          </ul>
        </div>

        <div>
          <h2>The list</h2>
          <p className="footer-note">Notes on new arrivals, twice a month. No noise.</p>
          {joined ? (
            <p className="joined">You are on the list. Welcome.</p>
          ) : (
            <form className="newsletter" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button type="submit" className="button button-dark">
                Join
              </button>
            </form>
          )}
          {error && <p className="form-error">{error}</p>}
        </div>
      </div>
      <div className="wrap footer-base">
        <span>© {year} Velora</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  )
}
