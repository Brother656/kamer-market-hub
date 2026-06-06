'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AtelierLumiereMode() {
  const [form, setForm] = useState({ nom_client: '', telephone: '', type_modele: '', tissu: '', date_livraison: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const modeles = [
    { nom: 'Robe de soirée', prix: 35000, delai: '7 jours', img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80' },
    { nom: 'Tailleur femme', prix: 28000, delai: '5 jours', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4782?w=600&q=80' },
    { nom: 'Boubou brodé', prix: 22000, delai: '4 jours', img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80' },
    { nom: 'Costume homme', prix: 45000, delai: '10 jours', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80' },
    { nom: 'Robe de mariée', prix: 80000, delai: '14 jours', img: 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=600&q=80' },
    { nom: 'Ensemble pagne', prix: 18000, delai: '3 jours', img: 'https://images.unsplash.com/photo-1558171813-1e49a4ef3675?w=600&q=80' },
  ]

  async function handleSubmit() {
    if (!form.nom_client || !form.telephone || !form.type_modele) return
    setLoading(true)
    await supabase.from('commandes').insert([{ ...form }])
    setSent(true)
    setLoading(false)
  }

  return (
    <main style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: '#0d0d0d', minHeight: '100vh', color: 'white' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Montserrat:wght@300;400;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        .gold { color: #d4a843; }
        .btn-gold {
          display:inline-block; background: linear-gradient(135deg,#d4a843,#f0cc6e);
          color:#0d0d0d; padding:14px 36px; border-radius:4px;
          font-family:'Montserrat',sans-serif; font-weight:600; font-size:13px;
          letter-spacing:2px; text-transform:uppercase; text-decoration:none;
          cursor:pointer; border:none; transition: opacity 0.2s, transform 0.2s;
        }
        .btn-gold:hover { opacity:0.9; transform:translateY(-1px); }
        .card-modele {
          background:#1a1a1a; border:1px solid #2a2a2a; border-radius:8px; overflow:hidden;
          transition: border-color 0.3s, transform 0.3s;
        }
        .card-modele:hover { border-color:#d4a843; transform:translateY(-4px); }
        input, select {
          width:100%; background:#1a1a1a; border:1px solid #333; color:white;
          padding:14px 16px; border-radius:6px; font-family:'Montserrat',sans-serif;
          font-size:14px; outline:none; transition: border-color 0.2s;
        }
        input:focus, select:focus { border-color:#d4a843; }
        select option { background:#1a1a1a; }
        label { display:block; font-family:'Montserrat',sans-serif; font-size:11px;
          letter-spacing:2px; color:#999; text-transform:uppercase; margin-bottom:8px; }
      `}</style>

      {/* NAV */}
      <nav style={{ padding:'20px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #1f1f1f' }}>
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontStyle:'italic' }}>
          Atelier <span className="gold">Lumière</span>
        </span>
        <div style={{ display:'flex', gap:32 }}>
          {['Modèles','Commande','Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontFamily:'Montserrat,sans-serif', fontSize:12, color:'#999', textDecoration:'none', letterSpacing:2, textTransform:'uppercase' }}>{l}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position:'relative', height:'90vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src="https://images.unsplash.com/photo-1558171813-1e49a4ef3675?w=1400&q=80" alt="Atelier mode" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.3)' }} />
        <div style={{ position:'relative', textAlign:'center', padding:'0 24px' }}>
          <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, letterSpacing:5, color:'#d4a843', textTransform:'uppercase', marginBottom:20 }}>Couture sur mesure — Yaoundé</p>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:72, fontWeight:300, lineHeight:1.1, marginBottom:28 }}>
            L'élégance<br /><em className="gold">à votre mesure</em>
          </h1>
          <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:16, color:'rgba(255,255,255,0.7)', fontWeight:300, marginBottom:48, maxWidth:480, margin:'0 auto 48px' }}>
            Chaque pièce est unique, créée pour vous. Du choix du tissu à la dernière finition.
          </p>
          <a href="#commande" className="btn-gold">Commander une pièce</a>
        </div>
      </section>

      {/* MODÈLES */}
      <section id="modeles" style={{ padding:'100px 40px', maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, letterSpacing:4, color:'#d4a843', textTransform:'uppercase', marginBottom:12 }}>Notre collection</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:48, fontWeight:300 }}>Nos Modèles</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:24 }}>
          {modeles.map((m,i) => (
            <div key={i} className="card-modele">
              <img src={m.img} alt={m.nom} style={{ width:'100%', height:260, objectFit:'cover' }} />
              <div style={{ padding:24 }}>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, marginBottom:8 }}>{m.nom}</h3>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span className="gold" style={{ fontFamily:'Montserrat,sans-serif', fontWeight:600, fontSize:18 }}>
                    {m.prix.toLocaleString()} FCFA
                  </span>
                  <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:12, color:'#666' }}>⏱ {m.delai}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORMULAIRE COMMANDE */}
      <section id="commande" style={{ background:'#111', padding:'100px 40px' }}>
        <div style={{ maxWidth:600, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, letterSpacing:4, color:'#d4a843', textTransform:'uppercase', marginBottom:12 }}>Passer une commande</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:44, fontWeight:300 }}>Votre Commande</h2>
          </div>
          {sent ? (
            <div style={{ textAlign:'center', padding:48, background:'#1a1a1a', borderRadius:12, border:'1px solid #d4a843' }}>
              <p style={{ fontSize:48, marginBottom:16 }}>✅</p>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, marginBottom:12 }} className="gold">Commande reçue !</h3>
              <p style={{ fontFamily:'Montserrat,sans-serif', color:'#999', fontSize:14 }}>Nous vous contacterons sous 24h pour confirmer et discuter des détails.</p>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
              <div><label>Votre nom complet</label><input value={form.nom_client} onChange={e => setForm({...form,nom_client:e.target.value})} placeholder="Ex: Marie Nguemo" /></div>
              <div><label>Téléphone WhatsApp</label><input value={form.telephone} onChange={e => setForm({...form,telephone:e.target.value})} placeholder="+237 6XX XXX XXX" /></div>
              <div><label>Type de modèle souhaité</label>
                <select value={form.type_modele} onChange={e => setForm({...form,type_modele:e.target.value})}>
                  <option value="">-- Choisir un modèle --</option>
                  {modeles.map(m => <option key={m.nom} value={m.nom}>{m.nom} — {m.prix.toLocaleString()} FCFA</option>)}
                </select>
              </div>
              <div><label>Type de tissu (optionnel)</label><input value={form.tissu} onChange={e => setForm({...form,tissu:e.target.value})} placeholder="Ex: Kente, Ankara, Wax, Satin..." /></div>
              <div><label>Date de livraison souhaitée</label><input type="date" value={form.date_livraison} onChange={e => setForm({...form,date_livraison:e.target.value})} /></div>
              <button className="btn-gold" onClick={handleSubmit} disabled={loading} style={{ width:'100%', marginTop:8 }}>
                {loading ? 'Envoi en cours...' : 'Envoyer ma commande →'}
              </button>
            </div>
          )}
        </div>
      </section>

      <footer style={{ padding:32, textAlign:'center', borderTop:'1px solid #1f1f1f' }}>
        <p style={{ fontFamily:'Montserrat,sans-serif', color:'#444', fontSize:12 }}>
          © 2026 Atelier Lumière Mode — Site par <span className="gold">Kamer Market Hub</span>
        </p>
      </footer>
    </main>
  )
}