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

  const wa = (msg) => `https://wa.me/237600000000?text=${encodeURIComponent(msg)}`

  const maquettes = [
    { slug:'chez-grace-beaute',    nom:'Chez Grâce Beauté',   secteur:'Salon de coiffure',       desc:'Design élégant avec galerie, tarifs et réservation WhatsApp instantanée.',  couleur:'#8b2252', emoji:'💇‍♀️', tags:['Beauté','Galerie','WhatsApp'] },
    { slug:'atelier-lumiere-mode', nom:'Atelier Lumière',      secteur:'Couture sur mesure',      desc:'Interface luxe sombre, catalogue de modèles et commandes en ligne.',         couleur:'#92620a', emoji:'🧵',   tags:['Mode','Commandes','Luxe']    },
    { slug:'saveurs-du-cameroun',  nom:'Saveurs du Cameroun',  secteur:'Restaurant traditionnel', desc:'Menu du jour dynamique, carte complète et livraison WhatsApp.',              couleur:'#b83a10', emoji:'🍽️',  tags:['Restaurant','Menu','Livraison'] },
    { slug:'techshop-yaounde',     nom:'TechShop Yaoundé',     secteur:'Électronique & Tech',     desc:'Catalogue filtrable avec badges de stock et commande directe.',              couleur:'#1558b0', emoji:'⚡',   tags:['Tech','Catalogue','Stock']   },
    { slug:'prof-domicile-yde',    nom:'Prof à Domicile',      secteur:'Cours particuliers',      desc:'Plateforme de réservation par matière, niveau et date souhaitée.',           couleur:'#3730a3', emoji:'📖',  tags:['Éducation','Réservation']    },
  ]

  const services = [
    { icon:'🎨', titre:'Design sur mesure',   desc:'Chaque site est unique, créé aux couleurs et à l\'image de votre activité.' },
    { icon:'📱', titre:'Mobile-first',         desc:'Optimisé pour les smartphones, là où vos clients vous cherchent.' },
    { icon:'⚡', titre:'Hébergement inclus',   desc:'Hébergé sur Vercel, votre site est disponible 24h/24 sans interruption.' },
    { icon:'💬', titre:'WhatsApp intégré',     desc:'Bouton de contact WhatsApp direct sur chaque page de votre site.' },
    { icon:'🗄️', titre:'Contenu dynamique',   desc:'Vos prix, menus et services sont modifiables en temps réel.' },
    { icon:'📈', titre:'SEO optimisé',         desc:'Structure pensée pour apparaître rapidement sur Google.' },
  ]

  const plans = [
    {
      nom:'Vitrine', prix:'25 000', unite:'FCFA',
      desc:'Idéal pour présenter votre activité professionnellement.',
      features:['Design personnalisé','Responsive mobile','Hébergement 1 an inclus','Bouton WhatsApp','Formulaire de contact'],
      highlight:false, msg:'Bonjour, je suis intéressé par le plan Vitrine à 25 000 FCFA',
    },
    {
      nom:'Pro', prix:'100 000', unite:'FCFA',
      desc:'Parfait pour vendre vos produits et gérer vos commandes.',
      features:['Tout du plan Vitrine','Base de données Supabase','Formulaires de commande','Catalogue dynamique','Support 3 mois inclus'],
      highlight:true, msg:'Bonjour, je suis intéressé par le plan Pro à 100 000 FCFA',
    },
    {
      nom:'Premium', prix:'Sur devis', unite:'',
      desc:'Solution complète avec paiement Mobile Money intégré.',
      features:['Tout du plan Pro','Paiement CinetPay / MoMo','Tableau de bord admin','Formation incluse','Support 6 mois inclus'],
      highlight:false, msg:'Bonjour, je voudrais un devis pour le plan Premium',
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');

        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Outfit', sans-serif;
          background: #07070e;
          color: #f0f0f8;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        a { text-decoration: none; color: inherit; }
        img { display: block; max-width: 100%; }

        /* ── NAVBAR ── */
        .nb {
          position: fixed; top:0; left:0; right:0; z-index:200;
          height: 68px;
          transition: background 0.4s, border-bottom 0.4s;
        }
        .nb.on {
          background: rgba(7,7,14,0.94);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nb-in {
          max-width: 1180px; margin:0 auto; height:100%;
          padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between; gap:20px;
        }
        .nb-logo {
          display: flex; align-items: center; gap:10px; flex-shrink:0;
        }
        .nb-icon {
          width:36px; height:36px; border-radius:10px;
          background: linear-gradient(135deg,#6366f1,#a855f7);
          display:flex; align-items:center; justify-content:center; font-size:18px;
        }
        .nb-name {
          font-family:'Syne',sans-serif; font-size:19px; font-weight:800; color:white;
        }
        .nb-name em { font-style:normal; color:#818cf8; }
        .nb-links { display:flex; gap:32px; }
        .nb-links a {
          font-size:14px; font-weight:500; color:rgba(255,255,255,0.5);
          transition: color 0.2s;
        }
        .nb-links a:hover { color:white; }
        .nb-btn {
          flex-shrink:0; background:#6366f1; color:white;
          padding:10px 22px; border-radius:10px;
          font-weight:600; font-size:14px; white-space:nowrap;
          transition: background 0.2s, transform 0.2s;
        }
        .nb-btn:hover { background:#4f46e5; transform:translateY(-1px); }

        /* ── HERO ── */
        .hero {
          min-height:100vh;
          display:flex; align-items:center; justify-content:center;
          padding: 130px 40px 90px;
          position:relative; overflow:hidden; text-align:center;
        }
        .hero-g1 {
          position:absolute; top:50%; left:50%;
          transform:translate(-50%,-60%);
          width:700px; height:700px;
          background:radial-gradient(circle,rgba(99,102,241,0.16) 0%,transparent 65%);
          pointer-events:none;
        }
        .hero-g2 {
          position:absolute; top:55%; left:15%;
          width:400px; height:400px;
          background:radial-gradient(circle,rgba(168,85,247,0.10) 0%,transparent 65%);
          pointer-events:none;
        }
        .hero-inner { position:relative; z-index:1; max-width:820px; width:100%; }

        .hero-pill {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(99,102,241,0.12);
          border:1px solid rgba(99,102,241,0.28);
          color:#a5b4fc; padding:7px 20px; border-radius:50px;
          font-size:13px; font-weight:500; margin-bottom:40px;
        }
        .hero-dot {
          width:7px; height:7px; border-radius:50%; background:#6366f1;
          animation: blink 2s infinite;
        }
        @keyframes blink {
          0%,100%{ opacity:1; transform:scale(1); }
          50%    { opacity:0.4; transform:scale(0.7); }
        }

        .hero-h1 {
          font-family:'Syne',sans-serif;
          font-size:72px; font-weight:800;
          line-height:1.06; letter-spacing:-2px;
          margin-bottom:26px; color:white;
        }
        .hero-h1 .gr {
          background:linear-gradient(135deg,#818cf8,#c084fc,#f472b6);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text;
        }
        .hero-p {
          font-size:19px; color:rgba(255,255,255,0.48);
          line-height:1.8; font-weight:300;
          max-width:530px; margin:0 auto 52px;
        }
        .hero-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }

        .btn-w {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background:white; color:#07070e;
          padding:15px 34px; border-radius:12px;
          font-weight:700; font-size:15px; white-space:nowrap;
          transition: opacity 0.2s, transform 0.2s;
        }
        .btn-w:hover { opacity:0.88; transform:translateY(-2px); }

        .btn-g {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          border:1.5px solid rgba(255,255,255,0.14);
          color:rgba(255,255,255,0.82);
          padding:15px 34px; border-radius:12px;
          font-weight:600; font-size:15px; white-space:nowrap;
          background:rgba(255,255,255,0.03);
          transition: border-color 0.2s, background 0.2s;
        }
        .btn-g:hover { border-color:rgba(255,255,255,0.38); background:rgba(255,255,255,0.07); }

        /* ── STATS ── */
        .stats {
          border-top:1px solid rgba(255,255,255,0.06);
          border-bottom:1px solid rgba(255,255,255,0.06);
          background:rgba(255,255,255,0.018);
          padding:52px 40px;
        }
        .stats-in {
          max-width:860px; margin:0 auto;
          display:grid; grid-template-columns:repeat(4,1fr); gap:16px;
          text-align:center;
        }
        .sv {
          font-family:'Syne',sans-serif;
          font-size:46px; font-weight:800; color:white; line-height:1; margin-bottom:8px;
        }
        .sl { font-size:13px; font-weight:500; color:rgba(255,255,255,0.32); }

        /* ── SECTION WRAPPER ── */
        .sec { padding:110px 40px; }
        .sec-in { max-width:1180px; margin:0 auto; }
        .sec-dark {
          background:rgba(255,255,255,0.014);
          border-top:1px solid rgba(255,255,255,0.05);
          border-bottom:1px solid rgba(255,255,255,0.05);
        }

        /* ── SECTION HEADER ── */
        .sh { text-align:center; margin-bottom:72px; }
        .sh.left { text-align:left; margin-bottom:56px; }
        .lbl {
          display:inline-block;
          font-size:11px; font-weight:700; letter-spacing:3.5px;
          text-transform:uppercase; color:#818cf8; margin-bottom:14px;
        }
        .ttl {
          font-family:'Syne',sans-serif;
          font-size:46px; font-weight:800; line-height:1.1; color:white;
        }
        .sub {
          font-size:17px; color:rgba(255,255,255,0.38);
          line-height:1.75; font-weight:300; margin-top:14px;
        }

        /* ── MAQUETTES ── */
        .grid-mq {
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:22px;
        }
        .mq-card {
          background:#0d0d1c;
          border:1px solid rgba(255,255,255,0.07);
          border-radius:20px; overflow:hidden;
          display:flex; flex-direction:column;
          transition: transform 0.32s, border-color 0.32s, box-shadow 0.32s;
        }
        .mq-card:hover {
          transform:translateY(-10px);
          border-color:rgba(99,102,241,0.45);
          box-shadow:0 28px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(99,102,241,0.12);
        }
        .mq-prev { height:152px; display:flex; flex-direction:column; overflow:hidden; }
        .mq-bar {
          height:30px; display:flex; align-items:center;
          padding:0 14px; gap:6px;
          background:rgba(0,0,0,0.22);
        }
        .mq-dot { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,0.28); }
        .mq-url { flex:1; height:5px; border-radius:3px; background:rgba(255,255,255,0.1); margin-left:8px; }
        .mq-body-prev {
          flex:1; display:flex; align-items:center;
          padding:14px 18px; gap:14px;
        }
        .mq-emoji { font-size:36px; line-height:1; }
        .mq-lines { flex:1; }
        .mq-line { height:9px; border-radius:5px; background:rgba(255,255,255,0.22); margin-bottom:7px; }
        .mq-line.s { width:52%; background:rgba(255,255,255,0.1); }

        .mq-info { padding:22px; display:flex; flex-direction:column; gap:9px; flex:1; }
        .mq-sec {
          font-size:10px; font-weight:700; letter-spacing:2.5px;
          text-transform:uppercase; color:rgba(255,255,255,0.28);
        }
        .mq-nom { font-family:'Syne',sans-serif; font-size:18px; font-weight:800; color:white; }
        .mq-desc { font-size:13px; color:rgba(255,255,255,0.38); line-height:1.65; flex:1; }
        .mq-tags { display:flex; flex-wrap:wrap; gap:6px; margin-top:4px; }
        .mq-tag {
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.08);
          color:rgba(255,255,255,0.5);
          padding:3px 11px; border-radius:20px;
          font-size:11px; font-weight:600;
        }
        .mq-cta {
          display:flex; align-items:center; gap:5px;
          color:#818cf8; font-size:13px; font-weight:600; margin-top:6px;
          transition: gap 0.2s;
        }
        .mq-card:hover .mq-cta { gap:10px; }

        /* ── SERVICES ── */
        .grid-sv {
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:20px;
        }
        .sv-card {
          background:#0d0d1c;
          border:1px solid rgba(255,255,255,0.07);
          border-radius:18px; padding:32px 26px;
          transition: border-color 0.25s, transform 0.25s;
        }
        .sv-card:hover { border-color:rgba(99,102,241,0.35); transform:translateY(-4px); }
        .sv-ico {
          width:52px; height:52px; border-radius:14px;
          background:rgba(99,102,241,0.1);
          border:1px solid rgba(99,102,241,0.18);
          display:flex; align-items:center; justify-content:center;
          font-size:24px; margin-bottom:20px;
        }
        .sv-ttl {
          font-family:'Syne',sans-serif;
          font-size:16px; font-weight:700; color:white; margin-bottom:10px;
        }
        .sv-desc { font-size:14px; color:rgba(255,255,255,0.38); line-height:1.72; }

        /* ── PLANS ── */
        .grid-pl {
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:24px; align-items:center;
        }
        .pl-card {
          background:#0d0d1c;
          border:1px solid rgba(255,255,255,0.07);
          border-radius:22px; padding:36px 30px;
          display:flex; flex-direction:column; gap:22px;
          transition: border-color 0.25s, transform 0.25s;
        }
        .pl-card:hover:not(.hl) { border-color:rgba(99,102,241,0.3); }
        .pl-card.hl {
          background:linear-gradient(155deg,#4f46e5 0%,#7c3aed 100%);
          border:none;
          transform:scale(1.05);
          box-shadow:0 0 0 1px rgba(99,102,241,0.5), 0 32px 64px rgba(99,102,241,0.28);
        }
        .pl-badge {
          display:inline-block; background:rgba(255,255,255,0.18);
          color:white; font-size:10px; font-weight:700;
          letter-spacing:2px; text-transform:uppercase;
          padding:5px 14px; border-radius:20px; width:fit-content;
        }
        .pl-nom {
          font-size:12px; font-weight:700; letter-spacing:1.5px;
          text-transform:uppercase; color:rgba(255,255,255,0.38); margin-bottom:6px;
        }
        .pl-card.hl .pl-nom { color:rgba(255,255,255,0.75); }
        .pl-prix {
          font-family:'Syne',sans-serif;
          font-size:40px; font-weight:800; color:white; line-height:1;
        }
        .pl-unite { font-size:14px; color:rgba(255,255,255,0.38); margin-left:5px; }
        .pl-card.hl .pl-unite { color:rgba(255,255,255,0.72); }
        .pl-desc { font-size:14px; color:rgba(255,255,255,0.35); line-height:1.55; margin-top:6px; }
        .pl-card.hl .pl-desc { color:rgba(255,255,255,0.78); }
        .pl-feats { display:flex; flex-direction:column; gap:12px; }
        .pl-feat {
          display:flex; align-items:flex-start; gap:10px;
          font-size:14px; color:rgba(255,255,255,0.52); line-height:1.45;
        }
        .pl-card.hl .pl-feat { color:rgba(255,255,255,0.92); }
        .pl-chk {
          width:18px; height:18px; border-radius:50%;
          background:rgba(99,102,241,0.15);
          border:1px solid rgba(99,102,241,0.35);
          display:flex; align-items:center; justify-content:center;
          font-size:10px; color:#818cf8;
          flex-shrink:0; margin-top:1px;
        }
        .pl-card.hl .pl-chk { background:rgba(255,255,255,0.2); border-color:rgba(255,255,255,0.3); color:white; }
        .pl-btn {
          display:block; text-align:center;
          padding:14px; border-radius:12px;
          font-weight:700; font-size:14px;
          background:rgba(99,102,241,0.1);
          border:1px solid rgba(99,102,241,0.25);
          color:#a5b4fc;
          transition: opacity 0.2s, transform 0.2s;
        }
        .pl-btn:hover { opacity:0.82; transform:translateY(-1px); }
        .pl-card.hl .pl-btn { background:white; border:none; color:#4f46e5; }

        /* ── CTA ── */
        .cta {
          text-align:center; padding:120px 40px;
        }
        .cta-h {
          font-family:'Syne',sans-serif;
          font-size:54px; font-weight:800; line-height:1.1;
          color:white; margin-bottom:20px; margin-top:16px;
        }
        .cta-h span { color:#818cf8; }
        .cta-p {
          font-size:18px; color:rgba(255,255,255,0.38);
          line-height:1.8; font-weight:300;
          max-width:490px; margin:0 auto 50px;
        }
        .btn-cta {
          display:inline-flex; align-items:center; gap:10px;
          background:white; color:#07070e;
          padding:18px 52px; border-radius:14px;
          font-weight:700; font-size:17px;
          transition: opacity 0.2s, transform 0.2s;
        }
        .btn-cta:hover { opacity:0.88; transform:translateY(-2px); }
        .cta-note { margin-top:22px; font-size:13px; color:rgba(255,255,255,0.18); }

        /* ── FOOTER ── */
        .ft {
          border-top:1px solid rgba(255,255,255,0.05);
          padding:40px 40px;
        }
        .ft-in {
          max-width:1180px; margin:0 auto;
          display:flex; justify-content:space-between;
          align-items:center; flex-wrap:wrap; gap:20px;
        }
        .ft-copy { font-size:13px; color:rgba(255,255,255,0.2); }
        .ft-links { display:flex; gap:28px; flex-wrap:wrap; }
        .ft-links a { font-size:13px; color:rgba(255,255,255,0.22); transition:color 0.2s; }
        .ft-links a:hover { color:rgba(255,255,255,0.6); }

        /* ── WA FLOAT ── */
        .wa {
          position:fixed; bottom:28px; right:28px; z-index:999;
          width:60px; height:60px; border-radius:50%;
          background:#25D366;
          display:flex; align-items:center; justify-content:center;
          font-size:28px;
          box-shadow:0 6px 28px rgba(37,211,102,0.45);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .wa:hover { transform:scale(1.12); box-shadow:0 10px 36px rgba(37,211,102,0.6); }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className={`nb${scrolled ? ' on' : ''}`}>
        <div className="nb-in">
          <div className="nb-logo">
            <div className="nb-icon">🇨🇲</div>
            <span className="nb-name">Kamer<em>Market</em>Hub</span>
          </div>
          <div className="nb-links">
            {[['#demos','Démos'],['#services','Services'],['#tarifs','Tarifs'],['#contact','Contact']].map(([h,l])=>(
              <a key={l} href={h}>{l}</a>
            ))}
          </div>
          <a href={wa('Bonjour, je voudrais un devis pour mon site')} target="_blank" rel="noreferrer" className="nb-btn">💬 Devis gratuit</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-g1"/><div className="hero-g2"/>
        <div className="hero-inner">
          <div className="hero-pill"><span className="hero-dot"/>Agence Web · Yaoundé, Cameroun</div>
          <h1 className="hero-h1">
            Votre commerce mérite<br/>
            <span className="gr">un site qui vend</span>
          </h1>
          <p className="hero-p">Sites vitrines professionnels pour commerçants de Yaoundé. Design moderne, hébergement inclus, livré en 72h.</p>
          <div className="hero-btns">
            <a href="#demos" className="btn-w">Voir les démos →</a>
            <a href={wa('Bonjour KamerMarketHub ! Je voudrais un site pour mon commerce.')} target="_blank" rel="noreferrer" className="btn-g">💬 Nous contacter</a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="stats">
        <div className="stats-in">
          {[['5','Maquettes démo'],['72h','Délai de livraison'],['100%','Mobile responsive'],['0 F','Devis gratuit']].map(([v,l])=>(
            <div key={l}><div className="sv">{v}</div><div className="sl">{l}</div></div>
          ))}
        </div>
      </div>

      {/* ── MAQUETTES ── */}
      <section id="demos" className="sec">
        <div className="sec-in">
          <div className="sh left">
            <span className="lbl">Sites de démonstration</span>
            <h2 className="ttl">5 secteurs,<br/>5 maquettes live</h2>
            <p className="sub" style={{maxWidth:420}}>Cliquez pour voir chaque site en action — ce sera le vôtre, adapté à votre activité.</p>
          </div>
          <div className="grid-mq">
            {maquettes.map(m=>(
              <Link key={m.slug} href={`/${m.slug}`} className="mq-card">
                <div className="mq-prev" style={{background:m.couleur}}>
                  <div className="mq-bar"><span className="mq-dot"/><span className="mq-dot"/><span className="mq-dot"/><span className="mq-url"/></div>
                  <div className="mq-body-prev">
                    <span className="mq-emoji">{m.emoji}</span>
                    <div className="mq-lines"><div className="mq-line"/><div className="mq-line s"/></div>
                  </div>
                </div>
                <div className="mq-info">
                  <p className="mq-sec">{m.secteur}</p>
                  <h3 className="mq-nom">{m.nom}</h3>
                  <p className="mq-desc">{m.desc}</p>
                  <div className="mq-tags">{m.tags.map(t=><span key={t} className="mq-tag">{t}</span>)}</div>
                  <div className="mq-cta">Voir la démo <span>→</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <div className="sec-dark" id="services">
        <div className="sec"><div className="sec-in">
          <div className="sh">
            <span className="lbl">Ce qu'on inclut</span>
            <h2 className="ttl">Tout dans votre site</h2>
            <p className="sub">Chaque site livré inclut ces fonctionnalités sans supplément.</p>
          </div>
          <div className="grid-sv">
            {services.map(s=>(
              <div key={s.titre} className="sv-card">
                <div className="sv-ico">{s.icon}</div>
                <h3 className="sv-ttl">{s.titre}</h3>
                <p className="sv-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div></div>
      </div>

      {/* ── TARIFS ── */}
      <section id="tarifs" className="sec">
        <div className="sec-in">
          <div className="sh">
            <span className="lbl">Transparent & simple</span>
            <h2 className="ttl">Nos Tarifs</h2>
            <p className="sub">Choisissez l'offre adaptée à votre projet.</p>
          </div>
          <div className="grid-pl">
            {plans.map(p=>(
              <div key={p.nom} className={`pl-card${p.highlight?' hl':''}`}>
                {p.highlight && <span className="pl-badge">⭐ Le plus populaire</span>}
                <div>
                  <p className="pl-nom">{p.nom}</p>
                  <div style={{display:'flex',alignItems:'baseline',gap:4,flexWrap:'wrap'}}>
                    <span className="pl-prix">{p.prix}</span>
                    {p.unite && <span className="pl-unite">{p.unite}</span>}
                  </div>
                  <p className="pl-desc">{p.desc}</p>
                </div>
                <ul className="pl-feats">
                  {p.features.map(f=>(
                    <li key={f} className="pl-feat">
                      <span className="pl-chk">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href={wa(p.msg)} target="_blank" rel="noreferrer" className="pl-btn">Choisir ce plan →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <div className="sec-dark" id="contact">
        <div className="sec-in">
          <div className="cta">
            <span className="lbl">Prêt à commencer ?</span>
            <h2 className="cta-h">Votre site en<br/><span>72 heures</span></h2>
            <p className="cta-p">Dites-nous ce que vous faites sur WhatsApp. On s'occupe du reste.</p>
            <a href={wa('Bonjour KamerMarketHub ! Je voudrais un site pour mon commerce.')} target="_blank" rel="noreferrer" className="btn-cta">💬 Démarrer sur WhatsApp</a>
            <p className="cta-note">Réponse sous 1h · Devis gratuit · Sans engagement</p>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="ft">
        <div className="ft-in">
          <div className="nb-logo">
            <div className="nb-icon" style={{width:30,height:30,borderRadius:8,fontSize:16}}>🇨🇲</div>
            <span className="nb-name" style={{fontSize:16}}>Kamer<em>Market</em>Hub</span>
          </div>
          <p className="ft-copy">© 2026 KamerMarketHub · Yaoundé, Cameroun</p>
          <div className="ft-links">
            {[['#demos','Démos'],['#services','Services'],['#tarifs','Tarifs'],['#contact','Contact']].map(([h,l])=>(
              <a key={l} href={h}>{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLOTTANT ── */}
      <a href={wa('Bonjour, je veux un site pour mon commerce')} target="_blank" rel="noreferrer" className="wa" title="Nous contacter">💬</a>
    </>
  )
}