'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function TechShopYaounde() {
  const [produits, setProduits] = useState([])
  const [categorie, setCategorie] = useState('Tous')

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('produits').select('*').eq('disponible', true)
      if (data) setProduits(data)
    }
    load()
  }, [])

  const fallback = [
    { id:1, nom:'iPhone 15 Pro', prix:650000, categorie:'Smartphones', disponible:true, description:'128GB, Titanium Black, débloqué tous opérateurs' },
    { id:2, nom:'Samsung Galaxy S24', prix:520000, categorie:'Smartphones', disponible:true, description:'256GB, garantie 1 an, accessoires inclus' },
    { id:3, nom:'MacBook Air M3', prix:1200000, categorie:'Ordinateurs', disponible:true, description:'13", 8GB RAM, 256GB SSD, garantie Apple' },
    { id:4, nom:'Dell Inspiron 15', prix:380000, categorie:'Ordinateurs', disponible:true, description:'Intel Core i5, 8GB RAM, 512GB SSD' },
    { id:5, nom:'AirPods Pro 2', prix:185000, categorie:'Accessoires', disponible:true, description:'Active Noise Cancellation, MagSafe' },
    { id:6, nom:'Chargeur GaN 65W', prix:18000, categorie:'Accessoires', disponible:true, description:'USB-C, compatible tous appareils' },
    { id:7, nom:'Écran LG 27" 4K', prix:280000, categorie:'Ordinateurs', disponible:false, description:'IPS, HDR10, USB-C 65W PD' },
    { id:8, nom:'Manette PS5', prix:45000, categorie:'Gaming', disponible:true, description:'DualSense, Haptic Feedback, vibration adaptative' },
  ]

  const display = (produits.length > 0 ? produits : fallback)
  const cats = ['Tous', ...new Set(display.map(p => p.categorie))]
  const filtered = categorie === 'Tous' ? display : display.filter(p => p.categorie === categorie)
  const wa = 'https://wa.me/237600000000?text=Bonjour, je suis intéressé par '

  return (
    <main style={{ fontFamily:"'DM Sans',Arial,sans-serif", background:'#f0f2f5', minHeight:'100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400;500&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        .prod-card {
          background:white; border-radius:16px; overflow:hidden;
          transition: transform 0.25s, box-shadow 0.25s;
          display:flex; flex-direction:column;
        }
        .prod-card:hover { transform:translateY(-6px); box-shadow:0 20px 48px rgba(0,0,0,0.12); }
        .btn-blue {
          background:#1a73e8; color:white; border:none; padding:12px 24px;
          border-radius:8px; font-family:'DM Sans',sans-serif; font-weight:500;
          font-size:14px; cursor:pointer; transition: background 0.2s;
          text-decoration:none; display:inline-block;
        }
        .btn-blue:hover { background:#1557b0; }
        .cat-btn {
          padding:8px 20px; border-radius:24px; border:1.5px solid #dde2ec;
          background:white; color:#555; font-family:'DM Sans',sans-serif;
          font-size:13px; font-weight:500; cursor:pointer; transition: all 0.2s;
        }
        .cat-btn.active { background:#1a73e8; color:white; border-color:#1a73e8; }
        .badge-dispo { background:#e6f4ea; color:#1e7e34; padding:4px 10px; border-radius:12px; font-size:11px; font-weight:700; }
        .badge-rupture { background:#fce8e6; color:#d93025; padding:4px 10px; border-radius:12px; font-size:11px; font-weight:700; }
      `}</style>

      {/* NAV */}
      <nav style={{ background:'#1a1a2e', padding:'0 40px', height:64, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ background:'#1a73e8', color:'white', width:32, height:32, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>⚡</span>
          <span style={{ color:'white', fontWeight:700, fontSize:20 }}>TechShop <span style={{ color:'#1a73e8' }}>YDE</span></span>
        </div>
        <div style={{ display:'flex', gap:12 }}>
          <a href={wa} target="_blank" rel="noreferrer" style={{ background:'#25D366', color:'white', padding:'8px 20px', borderRadius:8, fontWeight:500, fontSize:14, textDecoration:'none' }}>💬 WhatsApp</a>
        </div>
      </nav>

      {/* HERO BANNER */}
      <section style={{ background:'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)', padding:'80px 40px', textAlign:'center' }}>
        <p style={{ color:'#1a73e8', fontSize:12, letterSpacing:4, textTransform:'uppercase', marginBottom:16 }}>Yaoundé · Livraison rapide</p>
        <h1 style={{ fontSize:56, fontWeight:700, color:'white', marginBottom:20, lineHeight:1.1 }}>
          Tech & Électronique<br /><span style={{ color:'#1a73e8' }}>aux meilleurs prix</span>
        </h1>
        <p style={{ color:'rgba(255,255,255,0.7)', fontSize:18, fontWeight:300, marginBottom:48, maxWidth:520, margin:'0 auto 48px' }}>
          Smartphones, laptops, accessoires — produits authentiques, garantie officielle, livraison à Yaoundé.
        </p>
        <div style={{ display:'flex', gap:40, justifyContent:'center', flexWrap:'wrap' }}>
          {[['✅','Produits authentiques'],['🚚','Livraison J+1'],['🔧','SAV inclus'],['💳','Paiement Mobile Money']].map(([icon,txt]) => (
            <div key={txt} style={{ color:'rgba(255,255,255,0.8)', fontWeight:500, fontSize:15 }}>{icon} {txt}</div>
          ))}
        </div>
      </section>

      {/* CATALOGUE */}
      <section style={{ padding:'64px 40px', maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:36, flexWrap:'wrap', gap:16 }}>
          <h2 style={{ fontSize:28, fontWeight:700, color:'#1a1a2e' }}>Catalogue ({filtered.length} produits)</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {cats.map(c => (
              <button key={c} className={`cat-btn ${categorie===c?'active':''}`} onClick={() => setCategorie(c)}>{c}</button>
            ))}
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:24 }}>
          {filtered.map(p => (
            <div key={p.id} className="prod-card">
              <div style={{ background:'#f8f9fa', padding:32, display:'flex', alignItems:'center', justifyContent:'center', fontSize:64 }}>
                {p.categorie === 'Smartphones' ? '📱' : p.categorie === 'Ordinateurs' ? '💻' : p.categorie === 'Gaming' ? '🎮' : '🎧'}
              </div>
              <div style={{ padding:20, display:'flex', flexDirection:'column', flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                  <h3 style={{ fontWeight:700, fontSize:16, color:'#1a1a2e', flex:1 }}>{p.nom}</h3>
                  <span className={p.disponible ? 'badge-dispo' : 'badge-rupture'} style={{ marginLeft:8, whiteSpace:'nowrap' }}>
                    {p.disponible ? 'En stock' : 'Rupture'}
                  </span>
                </div>
                {p.description && <p style={{ fontSize:13, color:'#888', lineHeight:1.5, marginBottom:16, flex:1 }}>{p.description}</p>}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'auto' }}>
                  <span style={{ fontFamily:'DM Mono,monospace', fontWeight:500, fontSize:20, color:'#1a73e8' }}>
                    {p.prix.toLocaleString()} F
                  </span>
                  {p.disponible && (
                    <a href={`${wa}${encodeURIComponent(p.nom)}`} target="_blank" rel="noreferrer" className="btn-blue">
                      Commander
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GARANTIES */}
      <section style={{ background:'#1a1a2e', padding:'80px 40px' }}>
        <div style={{ maxWidth:1000, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:32, textAlign:'center' }}>
          {[
            { icon:'🔒', titre:'Produits Garantis', desc:'Authenticité certifiée, facture officielle' },
            { icon:'🚚', titre:'Livraison Rapide', desc:'Yaoundé J+1, autres villes J+3' },
            { icon:'📞', titre:'Support 7j/7', desc:'WhatsApp disponible tous les jours' },
            { icon:'💰', titre:'Meilleur Prix', desc:'On s\'aligne si vous trouvez moins cher' },
          ].map(g => (
            <div key={g.titre}>
              <p style={{ fontSize:36, marginBottom:12 }}>{g.icon}</p>
              <h3 style={{ color:'white', fontWeight:700, fontSize:16, marginBottom:8 }}>{g.titre}</h3>
              <p style={{ color:'rgba(255,255,255,0.6)', fontSize:14 }}>{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ background:'#0d0d1a', padding:32, textAlign:'center' }}>
        <p style={{ color:'#444', fontSize:13 }}>© 2026 TechShop Yaoundé — Site par <span style={{ color:'#1a73e8' }}>Kamer Market Hub</span></p>
      </footer>
    </main>
  )
}