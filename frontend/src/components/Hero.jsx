const heroImage =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80'

export default function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Autumn / Winter 2026</p>
        <h1 id="hero-title">Considered pieces for everyday life.</h1>
        <p className="tagline">A smarter way to shop.</p>
        <p className="hero-text">
          Velora is an international edit of clothing, home, and fragrance — chosen for
          material, fit, and the way a piece holds up after the season ends.
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href="#shop">
            Shop the edit
          </a>
          <a className="button button-ghost" href="#journal">
            Our approach
          </a>
        </div>
      </div>
      <div className="hero-media">
        <img
          src={heroImage}
          alt="A bright clothing boutique with garments arranged on tables and rails"
        />
        <p className="hero-caption">The Copenhagen store, photographed this season.</p>
      </div>
    </section>
  )
}
