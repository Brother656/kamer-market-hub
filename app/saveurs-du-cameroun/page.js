'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function SaveursDuCameroun() {
  const [menuJour, setMenuJour] = useState([])
  const [plats, setPlats] = useState([])

  useEffect(() => {
    async function load() {
      const { data: mj } = await supabase.from('menu_jour').select('*').eq('disponible', true)
      const { data: pl } = await supabase.from('plats').select('*')
      if (mj) setMenuJour(mj)
      if (pl) setPlats(pl)
    }
    load()
  }, [])

  const menuFallback = [
    { id:1, nom_plat:'Ndolé aux crevettes', prix:2500, disponible:true },
    { id:2, nom_plat:'Eru & Water Fufu', prix:2000, disponible:true },
    { id:3, nom_plat:'Poulet DG', prix:3500, disponible:true },
    { id:4, nom_plat:'Beignets haricots', prix:500, disponible:true },
  ]

  const platsFallback = [
    { id:1, nom:'Ndolé complet', prix:3500, categorie:'Plat principal', description:'Ndolé aux crevettes et viande fumée, accompagné de plantain et miondo' },
    { id:2, nom:'Poulet braisé', prix:4000, categorie:'Grillades', description:'Demi-poulet braisé sauce tomate, servi avec plantain frit ou riz' },
    { id:3, nom:'Okok aux arachides', prix:2500, categorie:'Plat principal', description:'Feuilles d\'okok mijotées à la pâte d\'arachide, servi avec bâton de manioc' },
    { id:4, nom:'Koki maïs', prix:1500, categorie:'Entrée', description:'Galette de maïs cuite à la vapeur, accompagnée de sauce tomate pimentée' },
    { id:5, nom:'Jus de gingembre', prix:500, categorie:'Boisson', description:'Jus de gingembre frais fait maison, légèrement sucré' },
    { id:6, nom:'Plantain sucré', prix:800, categorie:'Dessert', description:'Plantain bien mûr frit au beurre, parsemé de cannelle' },
  ]

  const displayMenu = menuJour.length > 0 ? menuJour : menuFallback
  const displayPlats = plats.length > 0 ? plats : platsFallback

  const categories = [...new Set(displayPlats.map(p => p.categorie))]
  const wa = 'https://wa.me/237600000000?text=Bonjour, je voudrais passer une commande'

  return (
    <main style={{ fontFamily:"'Libre Baskerville',Georgia,serif", background:'#faf7f2', minHeight:'100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        .btn-orange {
          display:inline-flex; align-items:center; gap:8px;
          background:#c44b18; color:white; padding:14px 32px; border-radius:6px;
          font-family:'Source Sans 3',sans-serif; font-weight:600; font-size:15px;
          text-decoration:none; transition: background 0.2s, transform 0.2s;
        }
        .btn-orange:hover { background:#a33a10; transform:translateY(-2px); }
        .plat-card {
          background:white; border-radius:12px; padding:24px;
          border-left:4px solid #c44b18; transition: transform 0.2s, box-shadow 0.2s;
        }
        .plat-card:hover { transform:translateX(4px); box-shadow: 4px 4px 24px rgba(196,75,24,0.1); }
        .tag { display:inline-block; background:#fff3ee; color:#c44b18;
          padding:4px 12px; border-radius:20px; font-size:12px;
          font-family:'Source Sans 3',sans-serif; font-weight:600; }
        .menu-item { display:flex; justify-content:space-between; align-items:center;
          padding:16px 0; border-bottom:1px dashed #e8e0d4; }
      `}</style>

      {/* NAV */}
      <nav style={{ background:'#1a0a00', padding:'18px 40px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <span style={{ fontFamily:"'Libre Baskerville',serif", fontSize:22, color:'white', fontStyle:'italic' }}>Saveurs du</span>
          <span style={{ fontFamily:"'Libre Baskerville',serif", fontSize:22, color:'#f0a040' }}> Cameroun</span>
        </div>
        <a href={wa} target="_blank" rel="noreferrer" className="btn-orange">🛵 Commander</a>
      </nav>

      {/* HERO */}
      <section style={{ position:'relative', height:'88vh', display:'flex', alignItems:'center' }}>
        <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1400&q=80" alt="Cuisine camerounaise" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.4)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg, rgba(26,10,0,0.85) 40%, transparent)' }} />
        <div style={{ position:'relative', zIndex:1, padding:'0 60px', maxWidth:650 }}>
          <p style={{ fontFamily:'Source Sans 3,sans-serif', fontSize:12, letterSpacing:4, color:'#f0a040', textTransform:'uppercase', marginBottom:16 }}>Restaurant traditionnel · Yaoundé</p>
          <h1 style={{ fontFamily:"'Libre Baskerville',serif", fontSize:60, color:'white', lineHeight:1.1, marginBottom:24 }}>
            Les vraies saveurs<br /><em style={{ color:'#f0a040' }}>du Cameroun</em>
          </h1>
          <p style={{ fontFamily:'Source Sans 3,sans-serif', fontSize:18, color:'rgba(255,255,255,0.8)', fontWeight:300, marginBottom:40, lineHeight:1.7 }}>
            Ndolé, Eru, Poulet braisé, Okok... Les recettes de grand-mère cuisinées chaque jour avec amour.
          </p>
          <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
            <a href="#menu" className="btn-orange">📋 Voir le menu</a>
            <a href={wa} target="_blank" rel="noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:8, border:'1px solid white', color:'white', padding:'14px 32px', borderRadius:6, fontFamily:'Source Sans 3,sans-serif', fontWeight:600, fontSize:15, textDecoration:'none' }}>💬 WhatsApp</a>
          </div>
        </div>
      </section>

      {/* MENU DU JOUR */}
      <section style={{ background:'#1a0a00', padding:'80px 40px' }}>
        <div style={{ maxWidth:800, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <p style={{ fontFamily:'Source Sans 3,sans-serif', fontSize:11, letterSpacing:4, color:'#f0a040', textTransform:'uppercase', marginBottom:10 }}>Disponible aujourd'hui</p>
            <h2 style={{ fontFamily:"'Libre Baskerville',serif", fontSize:40, color:'white' }}>Menu du Jour</h2>
          </div>
          {displayMenu.map(item => (
            <div key={item.id} className="menu-item" style={{ borderBottomColor:'#2a1a0a' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <span style={{ fontSize:20 }}>🍽️</span>
                <span style={{ fontFamily:"'Libre Baskerville',serif", color:'white', fontSize:18 }}>{item.nom_plat}</span>
              </div>
              <span style={{ fontFamily:'Source Sans 3,sans-serif', fontWeight:600, color:'#f0a040', fontSize:20 }}>
                {item.prix.toLocaleString()} FCFA
              </span>
            </div>
          ))}
          <div style={{ textAlign:'center', marginTop:40 }}>
            <a href={wa} target="_blank" rel="noreferrer" className="btn-orange">Commander le menu du jour</a>
          </div>
        </div>
      </section>

      {/* CARTE COMPLÈTE */}
      <section id="menu" style={{ padding:'100px 40px', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <p style={{ fontFamily:'Source Sans 3,sans-serif', fontSize:11, letterSpacing:4, color:'#c44b18', textTransform:'uppercase', marginBottom:12 }}>Nos spécialités</p>
          <h2 style={{ fontFamily:"'Libre Baskerville',serif", fontSize:44, color:'#1a0a00' }}>Notre Carte</h2>
        </div>
        {categories.map(cat => (
          <div key={cat} style={{ marginBottom:56 }}>
            <h3 style={{ fontFamily:'Source Sans 3,sans-serif', fontWeight:600, fontSize:13, letterSpacing:3, textTransform:'uppercase', color:'#c44b18', marginBottom:24, paddingBottom:12, borderBottom:'2px solid #f0e8d8' }}>
              {cat}
            </h3>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:16 }}>
              {displayPlats.filter(p => p.categorie === cat).map(p => (
                <div key={p.id} className="plat-card">
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                    <h4 style={{ fontFamily:"'Libre Baskerville',serif", fontSize:18, color:'#1a0a00' }}>{p.nom}</h4>
                    <span style={{ fontFamily:'Source Sans 3,sans-serif', fontWeight:700, color:'#c44b18', fontSize:17, whiteSpace:'nowrap', marginLeft:12 }}>{p.prix.toLocaleString()} F</span>
                  </div>
                  {p.description && <p style={{ fontFamily:'Source Sans 3,sans-serif', fontSize:14, color:'#888', lineHeight:1.6 }}>{p.description}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA FINAL */}
      <section style={{ background:'#c44b18', padding:'80px 40px', textAlign:'center' }}>
        <h2 style={{ fontFamily:"'Libre Baskerville',serif", fontSize:40, color:'white', marginBottom:16 }}>Livraison à domicile</h2>
        <p style={{ fontFamily:'Source Sans 3,sans-serif', color:'rgba(255,255,255,0.9)', fontSize:18, marginBottom:40, fontWeight:300 }}>Commandez via WhatsApp, on livre à Yaoundé en moins d'une heure.</p>
        <a href={wa} target="_blank" rel="noreferrer" style={{ background:'white', color:'#c44b18', padding:'16px 40px', borderRadius:6, fontFamily:'Source Sans 3,sans-serif', fontWeight:700, fontSize:16, textDecoration:'none' }}>
          📱 Commander maintenant
        </a>
      </section>

      <footer style={{ background:'#1a0a00', padding:32, textAlign:'center' }}>
        <p style={{ fontFamily:'Source Sans 3,sans-serif', color:'#555', fontSize:13 }}>© 2026 Saveurs du Cameroun — Site par <span style={{ color:'#f0a040' }}>Kamer Market Hub</span></p>
      </footer>
    </main>
  )
}