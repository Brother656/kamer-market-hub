'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const wa = (msg) =>
    `https://wa.me/237600000000?text=${encodeURIComponent(msg)}`

  const maquettes = [
    { slug:'chez-grace-beaute',     nom:'Chez Grâce Beauté',    secteur:'Salon de coiffure',       desc:'Design élégant avec galerie, tarifs et réservation WhatsApp.', couleur:'#8b2252', emoji:'💇‍♀️', tags:['Beauté','Réservation','Galerie'] },
    { slug:'atelier-lumiere-mode',  nom:'Atelier Lumière',       secteur:'Couture sur mesure',      desc:'Interface luxe sombre avec catalogue et commandes en ligne.',   couleur:'#b8860b', emoji:'🧵',   tags:['Mode','Commande','Luxe']        },
    { slug:'saveurs-du-cameroun',   nom:'Saveurs du Cameroun',   secteur:'Restaurant traditionnel', desc:'Menu du jour dynamique, carte complète et livraison WhatsApp.',  couleur:'#c44b18', emoji:'🍽️',  tags:['Restaurant','Menu','Livraison'] },
    { slug:'techshop-yaounde',      nom:'TechShop Yaoundé',      secteur:'Électronique',            desc:'Catalogue filtrable par catégorie avec badges de stock.',        couleur:'#1a73e8', emoji:'⚡',   tags:['Tech','Catalogue','Stock']      },
    { slug:'prof-domicile-yde',     nom:'Prof à Domicile',       secteur:'Cours particuliers',      desc:'Réservation en ligne avec choix matière, niveau et date.',       couleur:'#4f46e5', emoji:'📖',  tags:['Éducation','Réservation']       },
  ]

  const stats = [
    { val:'5',     label:'Maquettes démo'    },
    { val:'72h',   label:'Délai de livraison' },
    { val:'100%',  label:'Mobile responsive'  },
    { val:'0 F',   label:'Devis gratuit'      },
  ]

  const services = [
    { icon:'🎨', titre:'Design sur mesure',    desc:'Chaque site est unique, créé aux couleurs de votre activité.' },
    { icon:'📱', titre:'Mobile-first',          desc:'Pensé pour les smartphones, là où vos clients vous cherchent.' },
    { icon:'⚡', titre:'Hébergement inclus',    desc:'Sites rapides sur Vercel, disponibles 24h/24 sans interruption.' },
    { icon:'💬', titre:'WhatsApp intégré',      desc:'Un bouton de contact direct WhatsApp sur chaque page.' },
    { icon:'🗄️', titre:'Contenu dynamique',    desc:'Prix, menus et services modifiables en temps réel.' },
    { icon:'📊', titre:'SEO optimisé',          desc:'Structure pensée pour être trouvé rapidement sur Google.' },
  ]

  const plans = [
    {
      nom:'Vitrine', prix:'25 000', unite:'FCFA',
      desc:'Site professionnel 4–5 pages, idéal pour démarrer.',
      features:['Design personnalisé','Responsive mobile','Hébergement 1 an','Bouton WhatsApp','Formulaire de contact'],
      highlight:false,
      msg:'Bonjour, je suis intéressé par le plan Vitrine à 25 000 FCFA',
    },
    {
      nom:'Pro', prix:'100 000', unite:'FCFA',
      desc:'Site avec catalogue & commandes, parfait pour vendre.',
      features:['Tout du plan Vitrine','Base de données Supabase','Formulaires de commande','Catalogue dynamique','Support 3 mois'],
      highlight:true,
      msg:'Bonjour, je suis intéressé par le plan Pro à 100 000 FCFA',
    },
    {
      nom:'Premium', prix:'Sur devis', unite:'',
      desc:'Solution complète avec paiement Mobile Money intégré.',
      features:['Tout du plan Pro','Paiement CinetPay / MoMo','Tableau de bord admin','Formation incluse','Support 6 mois'],
      highlight:false,
      msg:'Bonjour, je voudrais un devis pour le plan Premium',
    },
  ]

  return (
    <main>
      {/* ── NAVBAR ── */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner">
          <div className="navbar-logo">
            <div className="navbar-logo-icon">🇨🇲</div>
            <span className="navbar-logo-text">
              Kamer<span>Market</span>Hub
            </span>
          </div>
          <div className="navbar-links">
            {[['#demos','Démos'],['#services','Services'],['#tarifs','Tarifs'],['#contact','Contact']].map(([h,l]) => (
              <a key={l} href={h}>{l}</a>
            ))}
          </div>
          <a href={wa('Bonjour, je voudrais un devis pour mon site')} target="_blank" rel="noreferrer" className="btn-nav">
            💬 Devis gratuit
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-glow-2" />
        <div style={{ position:'relative', zIndex:1, maxWidth:800, width:'100%' }}>
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Agence Web · Yaoundé, Cameroun
          </div>
          <h1 className="hero-title">
            Votre commerce mérite<br />
            <span className="gradient-text">un site qui vend</span>
          </h1>
          <p className="hero-sub">
            Sites vitrines professionnels pour commerçants de Yaoundé. Design moderne, hébergement inclus, livré en 72h.
          </p>
          <div className="hero-btns">
            <a href="#demos" className="btn-white">Voir les démos →</a>
            <a href={wa('Bonjour KamerMarketHub ! Je voudrais un site pour mon commerce.')} target="_blank" rel="noreferrer" className="btn-ghost">💬 Nous contacter</a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="stats-bar">
        <div className="stats-inner">
          {stats.map(s => (
            <div key={s.label}>
              <div className="stat-val">{s.val}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAQUETTES ── */}
      <section id="demos" className="section">
        <div className="section-header left">
          <span className="label">Sites de démonstration</span>
          <h2 className="title">5 secteurs,<br />5 maquettes live</h2>
          <p className="subtitle" style={{ maxWidth:440 }}>
            Cliquez sur un site pour le voir en action — ce sera le vôtre, adapté à votre activité.
          </p>
        </div>
        <div className="grid-maquettes">
          {maquettes.map(m => (
            <Link key={m.slug} href={`/${m.slug}`} className="maquette-card">
              <div className="maquette-preview" style={{ background: m.couleur }}>
                <div className="maquette-preview-bar" style={{ background:'rgba(0,0,0,0.15)' }}>
                  <span className="dot"/><span className="dot"/><span className="dot"/>
                  <span className="url-bar"/>
                </div>
                <div className="maquette-preview-body">
                  <span className="maquette-emoji">{m.emoji}</span>
                  <div className="maquette-preview-lines">
                    <div className="line"/>
                    <div className="line short"/>
                  </div>
                </div>
              </div>
              <div className="maquette-body">
                <p className="maquette-secteur">{m.secteur}</p>
                <h3 className="maquette-nom">{m.nom}</h3>
                <p className="maquette-desc">{m.desc}</p>
                <div className="maquette-tags">
                  {m.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="maquette-cta">Voir la démo <span>→</span></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <div className="section-dark" id="services">
        <div className="section" style={{ maxWidth:1180, margin:'0 auto' }}>
          <div className="section-header">
            <span className="label">Ce qu'on inclut</span>
            <h2 className="title">Tout dans votre site</h2>
            <p className="subtitle">Chaque site livré inclut ces fonctionnalités sans supplément.</p>
          </div>
          <div className="grid-services">
            {services.map(s => (
              <div key={s.titre} className="service-card">
                <div className="service-icon">{s.icon}</div>
                <h3 className="service-title">{s.titre}</h3>
                <p className="service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TARIFS ── */}
      <section id="tarifs" className="section">
        <div className="section-header">
          <span className="label">Transparent & simple</span>
          <h2 className="title">Nos Tarifs</h2>
          <p className="subtitle">Choisissez l'offre qui correspond à votre projet.</p>
        </div>
        <div className="grid-plans">
          {plans.map(p => (
            <div key={p.nom} className={`plan-card${p.highlight ? ' highlight' : ''}`}>
              {p.highlight && <span className="plan-badge">⭐ Le plus populaire</span>}
              <div>
                <p className="plan-name">{p.nom}</p>
                <div style={{ display:'flex', alignItems:'baseline', gap:6, flexWrap:'wrap' }}>
                  <span className="plan-price">{p.prix}</span>
                  {p.unite && <span className="plan-price-unit">{p.unite}</span>}
                </div>
                <p className="plan-desc">{p.desc}</p>
              </div>
              <ul className="plan-features">
                {p.features.map(f => (
                  <li key={f} className="plan-feature">
                    <span className="plan-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href={wa(p.msg)} target="_blank" rel="noreferrer" className="btn-plan">
                Choisir ce plan →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <div className="section-dark" id="contact">
        <div className="cta-section">
          <span className="label">Prêt à commencer ?</span>
          <h2 className="cta-title">Votre site en<br /><span>72 heures</span></h2>
          <p className="cta-sub">
            Dites-nous ce que vous faites sur WhatsApp. On s'occupe du reste.
          </p>
          <a href={wa('Bonjour KamerMarketHub ! Je voudrais un site pour mon commerce.')} target="_blank" rel="noreferrer" className="btn-cta">
            💬 Démarrer sur WhatsApp
          </a>
          <p className="cta-note">Réponse sous 1h · Devis gratuit · Sans engagement</p>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="navbar-logo">
            <div className="navbar-logo-icon" style={{ width:30, height:30, fontSize:16, borderRadius:8 }}>🇨🇲</div>
            <span className="navbar-logo-text" style={{ fontSize:16 }}>Kamer<span>Market</span>Hub</span>
          </div>
          <p className="footer-copy">© 2026 KamerMarketHub · Yaoundé, Cameroun</p>
          <div className="footer-links">
            {[['#demos','Démos'],['#services','Services'],['#tarifs','Tarifs'],['#contact','Contact']].map(([h,l]) => (
              <a key={l} href={h}>{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLOTTANT ── */}
      <a href={wa('Bonjour, je veux un site pour mon commerce')} target="_blank" rel="noreferrer" className="wa-float" title="Nous contacter">
        💬
      </a>
    </main>
  )
}