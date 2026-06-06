'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [cursor, setCursor] = useState({ x: -100, y: -100 })
  const [cursorHover, setCursorHover] = useState(false)
  const [visible, setVisible] = useState({})
  const [isMobile, setIsMobile] = useState(false)
  const observerRef = useRef(null)

  const wa = (msg) => `https://wa.me/237673359573?text=${encodeURIComponent(msg)}`

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    const interactives = document.querySelectorAll('a, button, [data-hover]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => setCursorHover(true))
      el.addEventListener('mouseleave', () => setCursorHover(false))
    })
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.id]: true }))
      }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('[data-id]').forEach(el => observerRef.current.observe(el))
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  const anim = (id, delay = 0) => ({
    opacity: visible[id] ? 1 : 0,
    transform: visible[id] ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  })

  const maquettes = [
    { slug:'chez-grace-beaute',    nom:'Chez Grâce Beauté',  secteur:'Salon de coiffure',  desc:'Design élégant, galerie et réservation WhatsApp.',         couleur:'#8b2252', emoji:'💇‍♀️', tags:['Beauté','Galerie','WhatsApp'] },
    { slug:'atelier-lumiere-mode', nom:'Atelier Lumière',     secteur:'Couture sur mesure', desc:'Interface luxe, catalogue et commandes en ligne.',          couleur:'#92620a', emoji:'🧵',   tags:['Mode','Commandes','Luxe']    },
    { slug:'saveurs-du-cameroun',  nom:'Saveurs du Cameroun', secteur:'Restaurant',         desc:'Menu dynamique, carte complète et livraison WhatsApp.',     couleur:'#b83a10', emoji:'🍽️',  tags:['Menu','Livraison']           },
    { slug:'techshop-yaounde',     nom:'TechShop Yaoundé',    secteur:'Électronique',       desc:'Catalogue filtrable, badges de stock et commande directe.', couleur:'#1558b0', emoji:'⚡',   tags:['Tech','Catalogue']           },
    { slug:'prof-domicile-yde',    nom:'Prof à Domicile',     secteur:'Cours particuliers', desc:'Réservation par matière, niveau et date souhaitée.',        couleur:'#3730a3', emoji:'📖',  tags:['Éducation','Réservation']    },
  ]

  const services = [
    { emoji:'🎨', titre:'Design sur mesure',  desc:'Chaque site est unique, aux couleurs de votre activité.' },
    { emoji:'📱', titre:'Mobile-first',        desc:'Optimisé pour les smartphones de vos clients.' },
    { emoji:'⚡', titre:'Hébergement inclus',  desc:'Vercel — disponible 24h/24 sans coupure.' },
    { emoji:'💬', titre:'WhatsApp intégré',    desc:'Bouton de contact direct sur chaque page.' },
    { emoji:'🗄️', titre:'Contenu dynamique',  desc:'Prix et menus modifiables en temps réel.' },
    { emoji:'📈', titre:'SEO optimisé',        desc:'Visible rapidement sur Google.' },
  ]

  const plans = [
    {
      nom:'Vitrine', prix:'25 000', unite:'FCFA', highlight:false,
      desc:'Idéal pour présenter votre activité.',
      features:['Design personnalisé','Responsive mobile','Hébergement 1 an','Bouton WhatsApp','Formulaire de contact'],
      msg:'Bonjour, je suis intéressé par le plan Vitrine à 25 000 FCFA',
    },
    {
      nom:'Pro', prix:'100 000', unite:'FCFA', highlight:true,
      desc:'Pour vendre vos produits et gérer vos commandes.',
      features:['Tout du plan Vitrine','Base de données Supabase','Formulaires de commande','Catalogue dynamique','Support 3 mois inclus'],
      msg:'Bonjour, je suis intéressé par le plan Pro à 100 000 FCFA',
    },
    {
      nom:'Premium', prix:'Sur devis', unite:'', highlight:false,
      desc:'Solution complète avec paiement Mobile Money.',
      features:['Tout du plan Pro','Paiement CinetPay / MoMo','Tableau de bord admin','Formation incluse','Support 6 mois inclus'],
      msg:'Bonjour, je voudrais un devis pour le plan Premium',
    },
  ]

  const S = {
    page: { fontFamily:"'Inter','Segoe UI',Arial,sans-serif", background:'#07070e', color:'#f0f0f8', minHeight:'100vh' },
    nav: {
      position:'fixed', top:0, left:0, right:0, zIndex:1000, height:68,
      background: scrolled ? 'rgba(7,7,14,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
      transition:'all 0.4s ease',
    },
    navIn: {
      maxWidth:1180, margin:'0 auto', height:'100%',
      padding: isMobile ? '0 20px' : '0 40px',
      display:'flex', alignItems:'center', justifyContent:'space-between', gap:16,
    },
    logoIcon: {
      width:38, height:38, borderRadius:10,
      background:'linear-gradient(135deg,#6366f1,#a855f7)',
      display:'flex', alignItems:'center', justifyContent:'center', fontSize:20,
    },
    logoText: { fontFamily:"'Syne','Outfit',sans-serif", fontSize: isMobile ? 15 : 19, fontWeight:800, color:'white' },
    navBtn: {
      flexShrink:0, background:'#6366f1', color:'white',
      padding: isMobile ? '9px 14px' : '10px 22px',
      borderRadius:10, fontWeight:600, fontSize: isMobile ? 13 : 14,
      whiteSpace:'nowrap', cursor:'pointer', border:'none', fontFamily:'inherit',
      transition:'background 0.2s, transform 0.2s',
    },
  }

  return (
    <div style={S.page}>

      {/* ── CURSEUR CUSTOM desktop ── */}
      {!isMobile && (
        <div style={{
          position:'fixed', zIndex:9999, pointerEvents:'none',
          left: cursor.x - (cursorHover ? 20 : 6),
          top:  cursor.y - (cursorHover ? 20 : 6),
          width: cursorHover ? 40 : 12, height: cursorHover ? 40 : 12,
          borderRadius:'50%',
          background: cursorHover ? 'transparent' : '#6366f1',
          border: cursorHover ? '2px solid #818cf8' : 'none',
          transition:'all 0.15s ease', mixBlendMode:'difference',
        }}/>
      )}

      {/* ── NAVBAR ── */}
      <nav style={S.nav}>
        <div style={S.navIn}>
          <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
            <div style={S.logoIcon}>🇨🇲</div>
            <span style={S.logoText}>Kamer<span style={{ color:'#818cf8' }}>Market</span>Hub</span>
          </div>
          {!isMobile && (
            <div style={{ display:'flex', gap:32 }}>
              {[['#demos','Démos'],['#services','Services'],['#communaute','Communauté'],['#tarifs','Tarifs'],['#contact','Contact']].map(([h,l]) => (
                <a key={l} href={h} style={{ fontSize:14, fontWeight:500, color:'rgba(255,255,255,0.5)', transition:'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color='white'}
                  onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.5)'}
                >{l}</a>
              ))}
            </div>
          )}
          <a href={wa('Bonjour, je voudrais un devis pour mon site')} target="_blank" rel="noreferrer">
            <button style={S.navBtn}
              onMouseEnter={e => { e.target.style.background='#4f46e5'; e.target.style.transform='translateY(-1px)'; }}
              onMouseLeave={e => { e.target.style.background='#6366f1'; e.target.style.transform='translateY(0)'; }}
            >💬 Devis gratuit</button>
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
        padding: isMobile ? '110px 24px 80px' : '130px 40px 100px',
        position:'relative', overflow:'hidden', textAlign:'center',
      }}>
        <div style={{ position:'absolute', top:'40%', left:'50%', transform:'translate(-50%,-50%)', width: isMobile ? 300 : 700, height: isMobile ? 300 : 700, background:'radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 65%)', pointerEvents:'none' }}/>
        <div style={{ position:'relative', zIndex:1, maxWidth:820, width:'100%', animation:'fadeUp 0.9s ease forwards' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(99,102,241,0.12)', border:'1px solid rgba(99,102,241,0.28)', color:'#a5b4fc', padding:'8px 20px', borderRadius:50, fontSize:13, fontWeight:500, marginBottom:36 }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#6366f1', animation:'blink 2s infinite', display:'inline-block' }}/>
            Agence Web · Yaoundé, Cameroun
          </div>
          <h1 style={{ fontFamily:"'Syne','Outfit',sans-serif", fontSize: isMobile ? 38 : 72, fontWeight:800, lineHeight:1.06, letterSpacing: isMobile ? '-0.5px' : '-2px', marginBottom:24, color:'white' }}>
            Votre commerce mérite<br/>
            <span style={{ background:'linear-gradient(135deg,#818cf8,#c084fc,#f472b6)', backgroundSize:'200% 200%', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'gradientShift 4s ease infinite' }}>
              un site qui vend
            </span>
          </h1>
          <p style={{ fontSize: isMobile ? 16 : 19, color:'rgba(255,255,255,0.5)', lineHeight:1.8, fontWeight:300, maxWidth:540, margin:'0 auto 52px' }}>
            Sites vitrines professionnels pour commerçants de Yaoundé. Design moderne, hébergement inclus, livré en 72h.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center' }}>
            <a href="#demos" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:'white', color:'#07070e', padding:'15px 36px', borderRadius:12, fontWeight:700, fontSize:15, fontFamily:'inherit', transition:'opacity 0.2s, transform 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity='0.88'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='translateY(0)'; }}
            >Voir les démos →</a>
            <a href={wa('Bonjour KamerMarketHub ! Je voudrais un site pour mon commerce.')} target="_blank" rel="noreferrer"
              style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, border:'1.5px solid rgba(255,255,255,0.15)', color:'rgba(255,255,255,0.85)', padding:'15px 36px', borderRadius:12, fontWeight:600, fontSize:15, fontFamily:'inherit', background:'rgba(255,255,255,0.03)', transition:'border-color 0.2s, background 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.4)'; e.currentTarget.style.background='rgba(255,255,255,0.07)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.15)'; e.currentTarget.style.background='rgba(255,255,255,0.03)'; }}
            >💬 Nous contacter</a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div data-id="stats" style={{ borderTop:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.02)', padding: isMobile ? '40px 24px' : '52px 40px', ...anim('stats') }}>
        <div style={{ maxWidth:860, margin:'0 auto', display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: isMobile ? '28px 16px' : 16, textAlign:'center' }}>
          {[['5','Maquettes démo'],['72h','Délai de livraison'],['100%','Mobile responsive'],['0 F','Devis gratuit']].map(([v,l]) => (
            <div key={l}>
              <div style={{ fontFamily:"'Syne','Outfit',sans-serif", fontSize: isMobile ? 32 : 46, fontWeight:800, color:'white', lineHeight:1, marginBottom:8 }}>{v}</div>
              <div style={{ fontSize:13, fontWeight:500, color:'rgba(255,255,255,0.32)' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAQUETTES ── */}
      <section id="demos" style={{ padding: isMobile ? '72px 24px' : '110px 40px', maxWidth:1180, margin:'0 auto' }}>
        <div data-id="mq-head" style={{ marginBottom: isMobile ? 44 : 64, ...anim('mq-head') }}>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:'3.5px', textTransform:'uppercase', color:'#818cf8', display:'block', marginBottom:14 }}>Sites de démonstration</span>
          <h2 style={{ fontFamily:"'Syne','Outfit',sans-serif", fontSize: isMobile ? 28 : 46, fontWeight:800, lineHeight:1.1, color:'white', marginBottom:14 }}>
            5 secteurs,<br/>5 maquettes live
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 17, color:'rgba(255,255,255,0.38)', lineHeight:1.75, fontWeight:300, maxWidth:420 }}>
            Cliquez pour voir chaque site en action — ce sera le vôtre.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap:22 }}>
          {maquettes.map((m, i) => (
            <div key={m.slug} data-id={`mq-${i}`} style={{ ...anim(`mq-${i}`, i * 0.1) }}>
              <Link href={`/${m.slug}`} style={{ display:'block', textDecoration:'none', color:'inherit' }}>
                <div style={{ background:'#0d0d1c', border:'1px solid rgba(255,255,255,0.07)', borderRadius:20, overflow:'hidden', transition:'transform 0.32s, border-color 0.32s, box-shadow 0.32s', cursor:'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-10px)'; e.currentTarget.style.borderColor='rgba(99,102,241,0.5)'; e.currentTarget.style.boxShadow='0 28px 60px rgba(0,0,0,0.55)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow='none'; }}
                >
                  <div style={{ height:148, background:m.couleur, display:'flex', flexDirection:'column', overflow:'hidden' }}>
                    <div style={{ height:28, background:'rgba(0,0,0,0.2)', display:'flex', alignItems:'center', padding:'0 12px', gap:5 }}>
                      {[1,2,3].map(k => <span key={k} style={{ width:8, height:8, borderRadius:'50%', background:'rgba(255,255,255,0.28)' }}/>)}
                      <span style={{ flex:1, height:5, borderRadius:3, background:'rgba(255,255,255,0.1)', marginLeft:8 }}/>
                    </div>
                    <div style={{ flex:1, display:'flex', alignItems:'center', padding:'12px 18px', gap:14 }}>
                      <span style={{ fontSize:34, lineHeight:1, animation:'float 3s ease-in-out infinite' }}>{m.emoji}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ height:9, borderRadius:5, background:'rgba(255,255,255,0.25)', marginBottom:7 }}/>
                        <div style={{ height:7, borderRadius:4, background:'rgba(255,255,255,0.12)', width:'55%' }}/>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding:22, display:'flex', flexDirection:'column', gap:9 }}>
                    <p style={{ fontSize:10, fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.28)' }}>{m.secteur}</p>
                    <h3 style={{ fontFamily:"'Syne','Outfit',sans-serif", fontSize:18, fontWeight:800, color:'white' }}>{m.nom}</h3>
                    <p style={{ fontSize:13, color:'rgba(255,255,255,0.38)', lineHeight:1.65 }}>{m.desc}</p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:4 }}>
                      {m.tags.map(t => (
                        <span key={t} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.09)', color:'rgba(255,255,255,0.5)', padding:'3px 11px', borderRadius:20, fontSize:11, fontWeight:600 }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:5, color:'#818cf8', fontSize:13, fontWeight:600, marginTop:6 }}>
                      Voir la démo <span>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <div style={{ background:'rgba(255,255,255,0.014)', borderTop:'1px solid rgba(255,255,255,0.05)', borderBottom:'1px solid rgba(255,255,255,0.05)' }} id="services">
        <div style={{ padding: isMobile ? '72px 24px' : '110px 40px', maxWidth:1180, margin:'0 auto' }}>
          <div data-id="sv-head" style={{ textAlign:'center', marginBottom: isMobile ? 48 : 72, ...anim('sv-head') }}>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:'3.5px', textTransform:'uppercase', color:'#818cf8', display:'block', marginBottom:14 }}>Ce qu'on inclut</span>
            <h2 style={{ fontFamily:"'Syne','Outfit',sans-serif", fontSize: isMobile ? 28 : 46, fontWeight:800, color:'white', lineHeight:1.1 }}>Tout dans votre site</h2>
            <p style={{ fontSize: isMobile ? 15 : 17, color:'rgba(255,255,255,0.38)', lineHeight:1.75, fontWeight:300, marginTop:14 }}>
              Chaque site livré inclut ces fonctionnalités sans supplément.
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap:20 }}>
            {services.map((s, i) => (
              <div key={s.titre} data-id={`sv-${i}`} style={{ background:'#0d0d1c', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, padding: isMobile ? '24px 20px' : '32px 26px', transition:'border-color 0.25s, transform 0.25s', ...anim(`sv-${i}`, i * 0.08) }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(99,102,241,0.35)'; e.currentTarget.style.transform='translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.transform='translateY(0)'; }}
              >
                <div style={{ width:52, height:52, borderRadius:14, background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.18)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, marginBottom:20 }}>{s.emoji}</div>
                <h3 style={{ fontFamily:"'Syne','Outfit',sans-serif", fontSize:16, fontWeight:700, color:'white', marginBottom:10 }}>{s.titre}</h3>
                <p style={{ fontSize:14, color:'rgba(255,255,255,0.38)', lineHeight:1.72 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── COMMUNAUTÉ WHATSAPP ── */}
      <section id="communaute" style={{ padding: isMobile ? '72px 24px' : '110px 40px', maxWidth:1180, margin:'0 auto' }}>
        <div data-id="wa-community" style={{ ...anim('wa-community') }}>
          <div style={{ background:'linear-gradient(135deg,#0d1f14 0%,#0a1a10 100%)', border:'1px solid rgba(37,211,102,0.2)', borderRadius:28, padding: isMobile ? '40px 24px' : '64px 72px', display:'flex', flexDirection: isMobile ? 'column' : 'row', alignItems:'center', gap: isMobile ? 40 : 64, position:'relative', overflow:'hidden' }}>

            {/* Glow déco */}
            <div style={{ position:'absolute', top:'-40%', right:'-10%', width:400, height:400, background:'radial-gradient(circle,rgba(37,211,102,0.08) 0%,transparent 65%)', pointerEvents:'none' }}/>

            {/* Gauche */}
            <div style={{ display:'flex', flexDirection:'column', alignItems: isMobile ? 'center' : 'flex-start', gap:28, flexShrink:0 }}>
              <div style={{ width: isMobile ? 90 : 110, height: isMobile ? 90 : 110, borderRadius:'50%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', fontSize: isMobile ? 44 : 54, boxShadow:'0 0 0 12px rgba(37,211,102,0.1), 0 0 0 24px rgba(37,211,102,0.05)', animation:'float 3s ease-in-out infinite', flexShrink:0 }}>💬</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px 28px', textAlign: isMobile ? 'center' : 'left' }}>
                {[
                  ['🚀','Astuces web','Chaque semaine'],
                  ['🛍️','Promos clients','Publiées en direct'],
                  ['📣','Nouveautés','En avant-première'],
                  ['🤝','Réseau marchand','En construction'],
                ].map(([icon,titre,desc]) => (
                  <div key={titre}>
                    <p style={{ fontSize: isMobile ? 13 : 14, fontWeight:700, color:'#4ade80', marginBottom:2 }}>{icon} {titre}</p>
                    <p style={{ fontSize:12, color:'rgba(255,255,255,0.35)', fontWeight:400 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Droite */}
            <div style={{ flex:1, textAlign: isMobile ? 'center' : 'left' }}>
              <span style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(37,211,102,0.12)', border:'1px solid rgba(37,211,102,0.25)', color:'#4ade80', padding:'6px 16px', borderRadius:50, fontSize:12, fontWeight:600, marginBottom:24 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#25D366', display:'inline-block', animation:'blink 2s infinite' }}/>
                Chaîne officielle KamerMarketHub
              </span>
              <h2 style={{ fontFamily:"'Syne','Outfit',sans-serif", fontSize: isMobile ? 26 : 40, fontWeight:800, color:'white', lineHeight:1.15, marginBottom:16 }}>
                Rejoignez notre réseau<br/>
                <span style={{ color:'#4ade80' }}>marchand camerounais</span>
              </h2>
              <p style={{ fontSize: isMobile ? 14 : 16, color:'rgba(255,255,255,0.45)', lineHeight:1.8, fontWeight:300, marginBottom:36, maxWidth:480, marginLeft: isMobile ? 'auto' : 0, marginRight: isMobile ? 'auto' : 0 }}>
                Astuces pour booster votre visibilité, promotions de nos clients, mises à jour exclusives et opportunités business — tout ça sur notre chaîne WhatsApp. Gratuit, sans spam.
              </p>
              <a href="https://whatsapp.com/channel/0029Vb8W1SgATRSls17NJo1x" target="_blank" rel="noreferrer"
                style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:10, background:'#25D366', color:'white', padding: isMobile ? '14px 28px' : '16px 36px', borderRadius:14, fontWeight:700, fontSize: isMobile ? 15 : 16, fontFamily:'inherit', boxShadow:'0 8px 32px rgba(37,211,102,0.35)', transition:'transform 0.2s, box-shadow 0.2s', width: isMobile ? '100%' : 'auto' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 14px 40px rgba(37,211,102,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(37,211,102,0.35)'; }}
              >💬 Rejoindre la chaîne WhatsApp</a>
              <p style={{ fontSize:12, color:'rgba(255,255,255,0.2)', marginTop:14 }}>Gratuit · Pas de spam · Quittez à tout moment</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section id="tarifs" style={{ padding: isMobile ? '72px 24px' : '110px 40px', maxWidth:1100, margin:'0 auto' }}>
        <div data-id="pl-head" style={{ textAlign:'center', marginBottom: isMobile ? 48 : 72, ...anim('pl-head') }}>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:'3.5px', textTransform:'uppercase', color:'#818cf8', display:'block', marginBottom:14 }}>Transparent & simple</span>
          <h2 style={{ fontFamily:"'Syne','Outfit',sans-serif", fontSize: isMobile ? 28 : 46, fontWeight:800, color:'white', lineHeight:1.1 }}>Nos Tarifs</h2>
          <p style={{ fontSize: isMobile ? 15 : 17, color:'rgba(255,255,255,0.38)', lineHeight:1.75, fontWeight:300, marginTop:14 }}>
            Choisissez l'offre adaptée à votre projet.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? 20 : 24, alignItems:'center', maxWidth: isMobile ? 480 : '100%', marginLeft:'auto', marginRight:'auto' }}>
          {plans.map((p, i) => (
            <div key={p.nom} data-id={`pl-${i}`} style={{ background: p.highlight ? 'linear-gradient(155deg,#4f46e5 0%,#7c3aed 100%)' : '#0d0d1c', border: p.highlight ? 'none' : '1px solid rgba(255,255,255,0.08)', borderRadius:22, padding: isMobile ? '28px 22px' : '36px 30px', display:'flex', flexDirection:'column', gap:22, transform: (!isMobile && p.highlight) ? 'scale(1.05)' : 'scale(1)', boxShadow: p.highlight ? '0 0 0 1px rgba(99,102,241,0.5),0 32px 64px rgba(99,102,241,0.28)' : 'none', transition:'transform 0.3s, box-shadow 0.3s', ...anim(`pl-${i}`, i * 0.12) }}>
              {p.highlight && (
                <span style={{ display:'inline-block', background:'rgba(255,255,255,0.18)', color:'white', fontSize:10, fontWeight:700, letterSpacing:2, textTransform:'uppercase', padding:'5px 14px', borderRadius:20, width:'fit-content' }}>⭐ Le plus populaire</span>
              )}
              <div>
                <p style={{ fontSize:12, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color: p.highlight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)', marginBottom:8 }}>{p.nom}</p>
                <div style={{ display:'flex', alignItems:'baseline', gap:5, flexWrap:'wrap', marginBottom:10 }}>
                  <span style={{ fontFamily:"'Syne','Outfit',sans-serif", fontSize:38, fontWeight:800, color:'white', lineHeight:1 }}>{p.prix}</span>
                  {p.unite && <span style={{ fontSize:14, color: p.highlight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)' }}>{p.unite}</span>}
                </div>
                <p style={{ fontSize:14, color: p.highlight ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.35)', lineHeight:1.55 }}>{p.desc}</p>
              </div>
              <ul style={{ display:'flex', flexDirection:'column', gap:12, listStyle:'none' }}>
                {p.features.map(f => (
                  <li key={f} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:14, color: p.highlight ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.52)', lineHeight:1.45 }}>
                    <span style={{ width:20, height:20, borderRadius:'50%', flexShrink:0, marginTop:1, background: p.highlight ? 'rgba(255,255,255,0.2)' : 'rgba(99,102,241,0.15)', border: p.highlight ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(99,102,241,0.35)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color: p.highlight ? 'white' : '#818cf8', fontWeight:700 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href={wa(p.msg)} target="_blank" rel="noreferrer"
                style={{ display:'block', textAlign:'center', padding:'14px', borderRadius:12, fontWeight:700, fontSize:14, fontFamily:'inherit', background: p.highlight ? 'white' : 'rgba(99,102,241,0.1)', border: p.highlight ? 'none' : '1px solid rgba(99,102,241,0.25)', color: p.highlight ? '#4f46e5' : '#a5b4fc', transition:'opacity 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.opacity='0.85'; e.currentTarget.style.transform='translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='translateY(0)'; }}
              >Choisir ce plan →</a>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <div id="contact" style={{ background:'rgba(255,255,255,0.014)', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
        <div data-id="cta" style={{ textAlign:'center', padding: isMobile ? '72px 24px' : '120px 40px', maxWidth:1180, margin:'0 auto', ...anim('cta') }}>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:'3.5px', textTransform:'uppercase', color:'#818cf8', display:'block', marginBottom:14 }}>Prêt à commencer ?</span>
          <h2 style={{ fontFamily:"'Syne','Outfit',sans-serif", fontSize: isMobile ? 32 : 54, fontWeight:800, color:'white', lineHeight:1.1, marginBottom:20, marginTop:4 }}>
            Votre site en<br/><span style={{ color:'#818cf8' }}>72 heures</span>
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 18, color:'rgba(255,255,255,0.38)', lineHeight:1.8, fontWeight:300, maxWidth:490, margin:'0 auto 50px' }}>
            Dites-nous ce que vous faites sur WhatsApp. On s'occupe du reste.
          </p>
          <a href={wa('Bonjour KamerMarketHub ! Je voudrais un site pour mon commerce.')} target="_blank" rel="noreferrer"
            style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:10, background:'white', color:'#07070e', padding: isMobile ? '15px 32px' : '18px 52px', borderRadius:14, fontWeight:700, fontSize: isMobile ? 15 : 17, fontFamily:'inherit', transition:'opacity 0.2s, transform 0.2s', width: isMobile ? '100%' : 'auto', maxWidth: isMobile ? 400 : 'none' }}
            onMouseEnter={e => { e.currentTarget.style.opacity='0.88'; e.currentTarget.style.transform='translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='translateY(0)'; }}
          >💬 Démarrer sur WhatsApp</a>
          <p style={{ marginTop:22, fontSize:13, color:'rgba(255,255,255,0.18)' }}>Réponse sous 1h · Devis gratuit · Sans engagement</p>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:'1px solid rgba(255,255,255,0.05)', padding: isMobile ? '32px 24px' : '40px 40px' }}>
        <div style={{ maxWidth:1180, margin:'0 auto', display:'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent:'space-between', alignItems:'center', gap: isMobile ? 16 : 20, textAlign: isMobile ? 'center' : 'left' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:30, height:30, borderRadius:8, background:'linear-gradient(135deg,#6366f1,#a855f7)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>🇨🇲</div>
            <span style={{ fontFamily:"'Syne','Outfit',sans-serif", fontSize:16, fontWeight:800, color:'white' }}>
              Kamer<span style={{ color:'#818cf8' }}>Market</span>Hub
            </span>
          </div>
          <p style={{ fontSize:13, color:'rgba(255,255,255,0.2)' }}>© 2026 KamerMarketHub · Yaoundé, Cameroun</p>
          <div style={{ display:'flex', gap:24, flexWrap:'wrap', justifyContent:'center' }}>
            {[['#demos','Démos'],['#services','Services'],['#communaute','Communauté'],['#tarifs','Tarifs'],['#contact','Contact']].map(([h,l]) => (
              <a key={l} href={h} style={{ fontSize:13, color:'rgba(255,255,255,0.22)', transition:'color 0.2s' }}
                onMouseEnter={e => e.target.style.color='rgba(255,255,255,0.6)'}
                onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.22)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLOTTANT ── */}
      <a href={wa('Bonjour, je veux un site pour mon commerce')} target="_blank" rel="noreferrer"
        title="Nous contacter sur WhatsApp"
        style={{ position:'fixed', bottom:28, right:28, zIndex:999, width:60, height:60, borderRadius:'50%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, boxShadow:'0 6px 28px rgba(37,211,102,0.45)', transition:'transform 0.25s, box-shadow 0.25s', animation:'float 3s ease-in-out infinite' }}
        onMouseEnter={e => { e.currentTarget.style.transform='scale(1.15)'; e.currentTarget.style.boxShadow='0 10px 36px rgba(37,211,102,0.6)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 6px 28px rgba(37,211,102,0.45)'; }}
      >💬</a>

    </div>
  )
}