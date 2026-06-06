'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const maquettes = [
    {
      slug: 'chez-grace-beaute',
      nom: 'Chez Grâce Beauté',
      secteur: 'Salon de coiffure',
      desc: 'Site vitrine élégant pour salon avec galerie, tarifs et réservation WhatsApp.',
      couleur: '#8b2252',
      accent: '#c9a96e',
      bg: '#fff8f6',
      emoji: '💇‍♀️',
      tags: ['Beauté', 'Réservation', 'Galerie'],
    },
    {
      slug: 'atelier-lumiere-mode',
      nom: 'Atelier Lumière',
      secteur: 'Couture sur mesure',
      desc: 'Site premium mode noire avec catalogue et formulaire de commande en ligne.',
      couleur: '#d4a843',
      accent: '#ffffff',
      bg: '#0d0d0d',
      emoji: '🧵',
      tags: ['Mode', 'Commande', 'Luxe'],
    },
    {
      slug: 'saveurs-du-cameroun',
      nom: 'Saveurs du Cameroun',
      secteur: 'Restaurant traditionnel',
      desc: 'Site restaurant avec menu du jour dynamique, carte complète et livraison WhatsApp.',
      couleur: '#c44b18',
      accent: '#f0a040',
      bg: '#faf7f2',
      emoji: '🍽️',
      tags: ['Restaurant', 'Menu', 'Livraison'],
    },
    {
      slug: 'techshop-yaounde',
      nom: 'TechShop Yaoundé',
      secteur: 'Électronique & High-tech',
      desc: 'Catalogue produits filtrable par catégorie, badges de stock, commande directe.',
      couleur: '#1a73e8',
      accent: '#ffffff',
      bg: '#f0f2f5',
      emoji: '⚡',
      tags: ['Tech', 'Catalogue', 'E-commerce'],
    },
    {
      slug: 'prof-domicile-yde',
      nom: 'Prof à Domicile',
      secteur: 'Cours particuliers',
      desc: 'Plateforme de réservation de cours avec sélection matière, niveau et date.',
      couleur: '#4f46e5',
      accent: '#fbbf24',
      bg: '#f5f7ff',
      emoji: '📖',
      tags: ['Éducation', 'Réservation', 'Services'],
    },
  ]

  const stats = [
    { val: '5', label: 'Maquettes démo' },
    { val: '48h', label: 'Délai de livraison' },
    { val: '100%', label: 'Mobile responsive' },
    { val: '0 FCFA', label: "Devis gratuit" },
  ]

  const services = [
    { icon: '🎨', titre: 'Design sur mesure', desc: 'Chaque site est unique, conçu pour votre activité et vos couleurs.' },
    { icon: '📱', titre: 'Mobile-first', desc: 'Optimisé pour les smartphones — là où vos clients vous trouvent.' },
    { icon: '⚡', titre: 'Rapide & Hébergé', desc: 'Sites ultra-rapides hébergés sur Vercel, disponibles 24h/24.' },
    { icon: '💬', titre: 'WhatsApp intégré', desc: 'Bouton de contact direct WhatsApp sur chaque page.' },
    { icon: '🗄️', titre: 'Contenu modifiable', desc: 'Vos prix, services et menus mis à jour en temps réel.' },
    { icon: '📊', titre: 'SEO & Visibilité', desc: 'Optimisé pour Google afin que vos clients vous trouvent.' },
  ]

  return (
    <main style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: '#09090f', color: 'white', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }

        .nav-link { color:rgba(255,255,255,0.6); text-decoration:none; font-size:14px; font-weight:500; transition:color 0.2s; }
        .nav-link:hover { color:white; }

        .btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          background:white; color:#09090f;
          padding:13px 28px; border-radius:10px;
          font-weight:700; font-size:15px; text-decoration:none;
          transition: opacity 0.2s, transform 0.2s;
        }
        .btn-primary:hover { opacity:0.9; transform:translateY(-1px); }

        .btn-outline {
          display:inline-flex; align-items:center; gap:8px;
          border:1.5px solid rgba(255,255,255,0.2); color:white;
          padding:13px 28px; border-radius:10px;
          font-weight:600; font-size:15px; text-decoration:none;
          transition: border-color 0.2s, background 0.2s;
          background: rgba(255,255,255,0.04);
        }
        .btn-outline:hover { border-color:rgba(255,255,255,0.5); background:rgba(255,255,255,0.08); }

        .maquette-card {
          background:#111118; border:1px solid #1e1e2e;
          border-radius:20px; overflow:hidden;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
          display:flex; flex-direction:column;
        }
        .maquette-card:hover {
          transform:translateY(-8px);
          border-color:#333355;
          box-shadow:0 24px 60px rgba(0,0,0,0.5);
        }

        .tag { display:inline-block; background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.1);
          color:rgba(255,255,255,0.7); padding:4px 12px;
          border-radius:20px; font-size:11px; font-weight:600;
          letter-spacing:0.5px; }

        .service-card {
          background:#111118; border:1px solid #1e1e2e;
          border-radius:16px; padding:28px 24px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .service-card:hover { border-color:#333355; transform:translateY(-2px); }

        .stat-item { text-align:center; }

        .preview-bar {
          height:6px; border-radius:3px; margin-bottom:20px;
        }

        .floating-cta {
          position:fixed; bottom:28px; right:28px; z-index:999;
          background:#25D366; color:white; padding:14px 24px;
          border-radius:50px; font-weight:700; font-size:14px;
          text-decoration:none; box-shadow:0 4px 24px rgba(37,211,102,0.4);
          display:flex; align-items:center; gap:8px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .floating-cta:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(37,211,102,0.5); }

        @media (max-width:768px) {
          .hero-title { font-size:44px !important; }
          .grid-maquettes { grid-template-columns:1fr !important; }
          .grid-services { grid-template-columns:1fr 1fr !important; }
          .nav-links-desktop { display:none !important; }
          .stats-grid { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100,
        padding:'0 40px', height:64,
        display:'flex', alignItems:'center', justifyContent:'space-between',
        background: scrolled ? 'rgba(9,9,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition:'all 0.3s',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:32, height:32, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>🇨🇲</div>
          <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:18 }}>
            Kamer<span style={{ color:'#6366f1' }}>Market</span>Hub
          </span>
        </div>
        <div className="nav-links-desktop" style={{ display:'flex', gap:32 }}>
          {[['#maquettes','Démos'],['#services','Services'],['#contact','Contact']].map(([href,label]) => (
            <a key={label} href={href} className="nav-link">{label}</a>
          ))}
        </div>
        <a href="https://wa.me/237600000000?text=Bonjour, je veux un site pour mon commerce" target="_blank" rel="noreferrer" className="btn-primary" style={{ padding:'9px 20px', fontSize:13 }}>
          💬 Devis gratuit
        </a>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'100px 40px 80px', position:'relative', overflow:'hidden' }}>
        {/* Glow décoratif */}
        <div style={{ position:'absolute', top:'20%', left:'50%', transform:'translateX(-50%)', width:600, height:600, background:'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'40%', left:'15%', width:300, height:300, background:'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents:'none' }} />

        <div style={{ textAlign:'center', maxWidth:820, position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(99,102,241,0.15)', border:'1px solid rgba(99,102,241,0.3)', color:'#a5b4fc', padding:'6px 18px', borderRadius:50, fontSize:13, fontWeight:600, marginBottom:36 }}>
            <span style={{ width:6, height:6, background:'#6366f1', borderRadius:'50%', display:'inline-block' }} />
            Agence Web · Yaoundé, Cameroun
          </div>

          <h1 className="hero-title" style={{ fontFamily:'Syne,sans-serif', fontSize:72, fontWeight:800, lineHeight:1.05, marginBottom:28, letterSpacing:'-1px' }}>
            Votre commerce mérite<br />
            <span style={{ background:'linear-gradient(135deg,#6366f1,#a855f7,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              un site qui vend
            </span>
          </h1>

          <p style={{ fontSize:19, color:'rgba(255,255,255,0.6)', lineHeight:1.8, marginBottom:52, fontWeight:300, maxWidth:580, margin:'0 auto 52px' }}>
            Nous créons des sites vitrines professionnels pour les commerçants de Yaoundé. Design moderne, hébergement inclus, livré en 48h.
          </p>

          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="#maquettes" className="btn-primary">
              Voir les démos →
            </a>
            <a href="https://wa.me/237600000000?text=Bonjour, je voudrais un site pour mon commerce" target="_blank" rel="noreferrer" className="btn-outline">
              💬 Nous contacter
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ borderTop:'1px solid #1e1e2e', borderBottom:'1px solid #1e1e2e', padding:'48px 40px' }}>
        <div className="stats-grid" style={{ maxWidth:900, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:32 }}>
          {stats.map(s => (
            <div key={s.label} className="stat-item">
              <p style={{ fontFamily:'Syne,sans-serif', fontSize:42, fontWeight:800, color:'white', lineHeight:1 }}>{s.val}</p>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.4)', marginTop:6, fontWeight:500 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MAQUETTES ── */}
      <section id="maquettes" style={{ padding:'100px 40px', maxWidth:1200, margin:'0 auto' }}>
        <div style={{ marginBottom:64 }}>
          <p style={{ fontSize:12, letterSpacing:4, color:'#6366f1', textTransform:'uppercase', fontWeight:700, marginBottom:12 }}>Sites de démonstration</p>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:48, fontWeight:800, lineHeight:1.1 }}>
            5 secteurs,<br />5 maquettes live
          </h2>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:17, marginTop:16, maxWidth:480, fontWeight:300 }}>
            Cliquez sur chaque site pour le voir en action — ce sera le vôtre, adapté à votre commerce.
          </p>
        </div>

        <div className="grid-maquettes" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:24 }}>
          {maquettes.map((m, i) => (
            <Link key={m.slug} href={`/${m.slug}`} style={{ textDecoration:'none' }}>
              <div className="maquette-card" style={{ animationDelay:`${i*0.1}s` }}>
                {/* Preview colorée */}
                <div style={{ background:m.bg, padding:'32px 28px 0', minHeight:160, position:'relative', overflow:'hidden' }}>
                  {/* Barre de nav simulée */}
                  <div style={{ background:m.couleur, borderRadius:'8px 8px 0 0', padding:'10px 16px', display:'flex', alignItems:'center', gap:6, marginBottom:0 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:'rgba(255,255,255,0.4)' }} />
                    <div style={{ width:8, height:8, borderRadius:'50%', background:'rgba(255,255,255,0.4)' }} />
                    <div style={{ width:8, height:8, borderRadius:'50%', background:'rgba(255,255,255,0.4)' }} />
                    <div style={{ flex:1, background:'rgba(255,255,255,0.15)', height:6, borderRadius:3, marginLeft:8 }} />
                  </div>
                  {/* Contenu simulé */}
                  <div style={{ background:m.couleur, padding:'20px 16px' }}>
                    <div style={{ fontSize:32, marginBottom:8 }}>{m.emoji}</div>
                    <div style={{ height:10, background:'rgba(255,255,255,0.3)', borderRadius:4, width:'70%', marginBottom:8 }} />
                    <div style={{ height:7, background:'rgba(255,255,255,0.15)', borderRadius:4, width:'50%' }} />
                  </div>
                </div>

                {/* Infos */}
                <div style={{ padding:'24px', flex:1, display:'flex', flexDirection:'column', gap:12 }}>
                  <div>
                    <p style={{ fontSize:11, color:'rgba(255,255,255,0.35)', letterSpacing:2, textTransform:'uppercase', fontWeight:600, marginBottom:6 }}>{m.secteur}</p>
                    <h3 style={{ fontFamily:'Syne,sans-serif', fontSize:20, fontWeight:700, color:'white' }}>{m.nom}</h3>
                  </div>
                  <p style={{ fontSize:14, color:'rgba(255,255,255,0.5)', lineHeight:1.6 }}>{m.desc}</p>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop:'auto', paddingTop:8 }}>
                    {m.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:6, color:'#6366f1', fontSize:14, fontWeight:600, marginTop:4 }}>
                    <span>Voir la démo</span>
                    <span style={{ fontSize:18 }}>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ background:'#06060b', padding:'100px 40px', borderTop:'1px solid #1e1e2e' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:72 }}>
            <p style={{ fontSize:12, letterSpacing:4, color:'#6366f1', textTransform:'uppercase', fontWeight:700, marginBottom:12 }}>Ce qu'on fait</p>
            <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:44, fontWeight:800 }}>Tout inclus dans votre site</h2>
          </div>
          <div className="grid-services" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {services.map(s => (
              <div key={s.titre} className="service-card">
                <p style={{ fontSize:36, marginBottom:16 }}>{s.icon}</p>
                <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:17, marginBottom:10, color:'white' }}>{s.titre}</h3>
                <p style={{ fontSize:14, color:'rgba(255,255,255,0.45)', lineHeight:1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section style={{ padding:'100px 40px', maxWidth:1000, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:72 }}>
          <p style={{ fontSize:12, letterSpacing:4, color:'#6366f1', textTransform:'uppercase', fontWeight:700, marginBottom:12 }}>Simple et transparent</p>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:44, fontWeight:800 }}>Nos Tarifs</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:24 }}>
          {[
            {
              nom:'Vitrine', prix:'75 000', unite:'FCFA',
              desc:'Site vitrine professionnel 4-5 pages',
              features:['Design personnalisé','Responsive mobile','Hébergement 1 an','Bouton WhatsApp','Formulaire de contact'],
              highlight:false,
            },
            {
              nom:'Pro', prix:'150 000', unite:'FCFA',
              desc:'Site avec catalogue & commandes en ligne',
              features:['Tout du plan Vitrine','Base de données Supabase','Formulaires de commande','Menu/catalogue dynamique','Support 3 mois inclus'],
              highlight:true,
            },
            {
              nom:'Premium', prix:'Sur devis', unite:'',
              desc:'Solution complète avec paiement CinetPay',
              features:['Tout du plan Pro','Paiement Mobile Money','Tableau de bord admin','Formation incluse','Support 6 mois inclus'],
              highlight:false,
            },
          ].map(plan => (
            <div key={plan.nom} style={{
              background: plan.highlight ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : '#111118',
              border:`1px solid ${plan.highlight ? 'transparent' : '#1e1e2e'}`,
              borderRadius:20, padding:36,
              display:'flex', flexDirection:'column', gap:20,
              transform: plan.highlight ? 'scale(1.03)' : 'none',
            }}>
              {plan.highlight && (
                <div style={{ background:'rgba(255,255,255,0.2)', color:'white', fontSize:11, fontWeight:700, letterSpacing:2, textTransform:'uppercase', padding:'4px 14px', borderRadius:20, display:'inline-block', width:'fit-content' }}>
                  ⭐ Populaire
                </div>
              )}
              <div>
                <p style={{ fontSize:13, color: plan.highlight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)', fontWeight:600, marginBottom:4 }}>{plan.nom}</p>
                <div style={{ display:'flex', alignItems:'baseline', gap:4 }}>
                  <span style={{ fontFamily:'Syne,sans-serif', fontSize:36, fontWeight:800 }}>{plan.prix}</span>
                  <span style={{ fontSize:14, color: plan.highlight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)' }}>{plan.unite}</span>
                </div>
                <p style={{ fontSize:14, color: plan.highlight ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)', marginTop:8, lineHeight:1.5 }}>{plan.desc}</p>
              </div>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ fontSize:14, color: plan.highlight ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)', display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ color: plan.highlight ? 'white' : '#6366f1', fontWeight:700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/237600000000?text=Bonjour, je suis intéressé par le plan " target="_blank" rel="noreferrer" style={{
                display:'block', textAlign:'center',
                background: plan.highlight ? 'white' : 'rgba(99,102,241,0.15)',
                color: plan.highlight ? '#6366f1' : 'white',
                border: plan.highlight ? 'none' : '1px solid rgba(99,102,241,0.4)',
                padding:'13px', borderRadius:10, fontWeight:700, fontSize:14,
                textDecoration:'none', marginTop:'auto',
                transition:'opacity 0.2s',
              }}>
                Demander ce plan →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background:'#06060b', borderTop:'1px solid #1e1e2e', padding:'100px 40px', textAlign:'center' }}>
        <div style={{ maxWidth:600, margin:'0 auto' }}>
          <p style={{ fontSize:12, letterSpacing:4, color:'#6366f1', textTransform:'uppercase', fontWeight:700, marginBottom:16 }}>Prêt à commencer ?</p>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:48, fontWeight:800, marginBottom:20, lineHeight:1.1 }}>
            Votre site en<br /><span style={{ color:'#6366f1' }}>48 heures</span>
          </h2>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:18, marginBottom:48, fontWeight:300, lineHeight:1.7 }}>
            Contactez-nous sur WhatsApp, décrivez votre activité, et on s'occupe du reste.
          </p>
          <a href="https://wa.me/237600000000?text=Bonjour KamerMarketHub, je voudrais un site pour mon commerce !" target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize:17, padding:'16px 48px' }}>
            💬 Démarrer sur WhatsApp
          </a>
          <p style={{ marginTop:24, color:'rgba(255,255,255,0.2)', fontSize:13 }}>Réponse sous 1h · Devis gratuit · Sans engagement</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:'1px solid #1e1e2e', padding:'40px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:28, height:28, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>🇨🇲</div>
          <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:16 }}>KamerMarketHub</span>
        </div>
        <p style={{ color:'rgba(255,255,255,0.2)', fontSize:13 }}>© 2026 KamerMarketHub by Brother Ced · Yaoundé, Cameroun</p>
        <div style={{ display:'flex', gap:24 }}>
          {[['#maquettes','Démos'],['#services','Services'],['#contact','Contact']].map(([href,label]) => (
            <a key={label} href={href} style={{ color:'rgba(255,255,255,0.3)', fontSize:13, textDecoration:'none' }}>{label}</a>
          ))}
        </div>
      </footer>

      {/* ── BOUTON FLOTTANT WHATSAPP ── */}
      <a href="https://wa.me/237673359573?text=Bonjour, je veux un site pour mon commerce" target="_blank" rel="noreferrer" className="floating-cta">
        💬 Devis gratuit
      </a>
    </main>
  )
}