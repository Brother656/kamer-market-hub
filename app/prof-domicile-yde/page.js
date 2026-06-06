'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ProfDomicileYde() {
  const [matieres, setMatieres] = useState([])
  const [form, setForm] = useState({ nom_eleve:'', telephone:'', matiere:'', niveau:'', date_souhaitee:'' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('matieres').select('*')
      if (data) setMatieres(data)
    }
    load()
  }, [])

  const matieresFallback = [
    { id:1, nom:'Mathématiques', niveaux_disponibles:['6ème','5ème','4ème','3ème','2nde','1ère','Tle'], tarif_heure:3000 },
    { id:2, nom:'Physique-Chimie', niveaux_disponibles:['4ème','3ème','2nde','1ère','Tle'], tarif_heure:3500 },
    { id:3, nom:'Français', niveaux_disponibles:['6ème','5ème','4ème','3ème','2nde','1ère','Tle'], tarif_heure:2500 },
    { id:4, nom:'Anglais', niveaux_disponibles:['6ème','5ème','4ème','3ème','2nde','1ère','Tle'], tarif_heure:3000 },
    { id:5, nom:'SVT', niveaux_disponibles:['6ème','5ème','4ème','3ème','2nde','1ère'], tarif_heure:2500 },
    { id:6, nom:'Informatique', niveaux_disponibles:['3ème','2nde','1ère','Tle','Université'], tarif_heure:4000 },
  ]

  const display = matieres.length > 0 ? matieres : matieresFallback
  const selectedMat = display.find(m => m.nom === form.matiere)

  async function handleSubmit() {
    if (!form.nom_eleve || !form.telephone || !form.matiere || !form.niveau) return
    setLoading(true)
    await supabase.from('reservations').insert([{ ...form }])
    setSent(true)
    setLoading(false)
  }

  return (
    <main style={{ fontFamily:"'Nunito',Arial,sans-serif", background:'#f5f7ff', minHeight:'100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&family=Merriweather:wght@300;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        .btn-indigo {
          display:inline-flex; align-items:center; gap:8px;
          background:#4f46e5; color:white; padding:14px 32px; border-radius:10px;
          font-family:'Nunito',sans-serif; font-weight:700; font-size:15px;
          text-decoration:none; border:none; cursor:pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .btn-indigo:hover { background:#4338ca; transform:translateY(-2px); }
        .mat-card {
          background:white; border-radius:16px; padding:24px;
          border:2px solid transparent; transition: border-color 0.2s, transform 0.2s;
          cursor:pointer;
        }
        .mat-card:hover { border-color:#4f46e5; transform:translateY(-4px); }
        input, select {
          width:100%; background:white; border:2px solid #e8eaf6; color:#1a1a3e;
          padding:14px 16px; border-radius:10px;
          font-family:'Nunito',sans-serif; font-size:15px; outline:none;
          transition: border-color 0.2s;
        }
        input:focus, select:focus { border-color:#4f46e5; }
        select option { background:white; }
        label { display:block; font-weight:700; font-size:13px; color:#4f46e5; margin-bottom:8px; }
        .step { width:32px; height:32px; background:#4f46e5; color:white;
          border-radius:50%; display:flex; align-items:center; justify-content:center;
          font-weight:800; font-size:14px; flex-shrink:0; }
      `}</style>

      {/* NAV */}
      <nav style={{ background:'white', boxShadow:'0 1px 12px rgba(79,70,229,0.08)', padding:'16px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:28 }}>📖</span>
          <div>
            <p style={{ fontFamily:'Merriweather,serif', fontWeight:700, fontSize:18, color:'#1a1a3e', lineHeight:1.2 }}>Prof à Domicile</p>
            <p style={{ fontSize:11, color:'#4f46e5', fontWeight:600, letterSpacing:1 }}>YAOUNDÉ</p>
          </div>
        </div>
        <a href="#reservation" className="btn-indigo">✏️ Réserver un cours</a>
      </nav>

      {/* HERO */}
      <section style={{ background:'linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)', padding:'100px 40px', textAlign:'center' }}>
        <p style={{ fontFamily:'Nunito,sans-serif', fontSize:12, letterSpacing:4, color:'rgba(255,255,255,0.7)', textTransform:'uppercase', marginBottom:16 }}>Cours particuliers à domicile · Yaoundé</p>
        <h1 style={{ fontFamily:'Merriweather,serif', fontSize:56, color:'white', fontWeight:700, lineHeight:1.15, marginBottom:24 }}>
          Votre enfant peut<br /><span style={{ color:'#fbbf24' }}>exceller</span> en classe
        </h1>
        <p style={{ fontFamily:'Nunito,sans-serif', fontSize:19, color:'rgba(255,255,255,0.85)', fontWeight:300, maxWidth:560, margin:'0 auto 48px', lineHeight:1.7 }}>
          Des professeurs diplômés viennent directement chez vous. Maths, Physique, Français, Anglais et plus encore.
        </p>
        <div style={{ display:'flex', justifyContent:'center', gap:40, flexWrap:'wrap', marginBottom:56 }}>
          {[['👨‍🏫','Profs diplômés'],['🏠','Cours à domicile'],['⭐','Résultats garantis'],['📅','Planning flexible']].map(([ic,txt]) => (
            <div key={txt} style={{ color:'white', fontWeight:600, fontSize:15 }}>{ic} {txt}</div>
          ))}
        </div>
        <a href="#reservation" className="btn-indigo" style={{ background:'white', color:'#4f46e5', fontSize:17, padding:'16px 48px' }}>
          Réserver maintenant — dès 2 500 FCFA/h
        </a>
      </section>

      {/* MATIÈRES */}
      <section style={{ padding:'100px 40px', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <p style={{ fontFamily:'Nunito,sans-serif', fontSize:11, letterSpacing:4, color:'#4f46e5', textTransform:'uppercase', fontWeight:700, marginBottom:12 }}>Ce qu'on enseigne</p>
          <h2 style={{ fontFamily:'Merriweather,serif', fontSize:40, color:'#1a1a3e' }}>Matières disponibles</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:20 }}>
          {display.map(m => (
            <div key={m.id} className="mat-card">
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                <h3 style={{ fontFamily:'Merriweather,serif', fontSize:20, color:'#1a1a3e', fontWeight:700 }}>{m.nom}</h3>
                <span style={{ background:'#eef2ff', color:'#4f46e5', padding:'6px 14px', borderRadius:20, fontWeight:700, fontSize:15, whiteSpace:'nowrap' }}>
                  {m.tarif_heure.toLocaleString()} F/h
                </span>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {(m.niveaux_disponibles || []).map(n => (
                  <span key={n} style={{ background:'#f5f3ff', color:'#7c3aed', padding:'3px 10px', borderRadius:12, fontSize:12, fontWeight:600 }}>{n}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section style={{ background:'#1a1a3e', padding:'80px 40px' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Merriweather,serif', fontSize:36, color:'white', textAlign:'center', marginBottom:64 }}>Comment ça marche ?</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:32 }}>
            {[
              { n:'1', titre:'Réservez en ligne', desc:'Remplissez le formulaire en 2 minutes' },
              { n:'2', titre:'On vous contacte', desc:'Un prof disponible vous appelle sous 1h' },
              { n:'3', titre:'Le prof arrive', desc:'Il vient chez vous à l\'heure convenue' },
              { n:'4', titre:'Votre enfant progresse', desc:'Résultats visibles dès la 1ère session' },
            ].map(e => (
              <div key={e.n} style={{ textAlign:'center' }}>
                <div style={{ width:52, height:52, background:'#4f46e5', borderRadius:50, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:22, fontWeight:800, color:'white' }}>{e.n}</div>
                <h3 style={{ color:'white', fontWeight:700, fontSize:17, marginBottom:8 }}>{e.titre}</h3>
                <p style={{ color:'rgba(255,255,255,0.6)', fontSize:14, lineHeight:1.6 }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULAIRE RÉSERVATION */}
      <section id="reservation" style={{ padding:'100px 40px', maxWidth:640, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <p style={{ fontFamily:'Nunito,sans-serif', fontSize:11, letterSpacing:4, color:'#4f46e5', textTransform:'uppercase', fontWeight:700, marginBottom:12 }}>C'est gratuit & sans engagement</p>
          <h2 style={{ fontFamily:'Merriweather,serif', fontSize:40, color:'#1a1a3e' }}>Réserver un cours</h2>
        </div>
        {sent ? (
          <div style={{ textAlign:'center', padding:56, background:'white', borderRadius:20, border:'2px solid #4f46e5' }}>
            <p style={{ fontSize:56, marginBottom:16 }}>🎉</p>
            <h3 style={{ fontFamily:'Merriweather,serif', fontSize:28, color:'#4f46e5', marginBottom:12 }}>Réservation envoyée !</h3>
            <p style={{ fontFamily:'Nunito,sans-serif', color:'#666', fontSize:16, lineHeight:1.6 }}>Un professeur vous contactera sous 1 heure pour confirmer le rendez-vous.</p>
          </div>
        ) : (
          <div style={{ background:'white', borderRadius:20, padding:40, boxShadow:'0 8px 40px rgba(79,70,229,0.1)', display:'flex', flexDirection:'column', gap:24 }}>
            <div><label>👤 Nom de l'élève</label><input value={form.nom_eleve} onChange={e=>setForm({...form,nom_eleve:e.target.value})} placeholder="Prénom & Nom" /></div>
            <div><label>📞 Téléphone du parent</label><input value={form.telephone} onChange={e=>setForm({...form,telephone:e.target.value})} placeholder="+237 6XX XXX XXX" /></div>
            <div><label>📚 Matière souhaitée</label>
              <select value={form.matiere} onChange={e=>setForm({...form,matiere:e.target.value,niveau:''})}>
                <option value="">-- Choisir une matière --</option>
                {display.map(m=><option key={m.nom} value={m.nom}>{m.nom} — {m.tarif_heure.toLocaleString()} FCFA/h</option>)}
              </select>
            </div>
            <div><label>🎓 Niveau de l'élève</label>
              <select value={form.niveau} onChange={e=>setForm({...form,niveau:e.target.value})} disabled={!selectedMat}>
                <option value="">-- Choisir le niveau --</option>
                {(selectedMat?.niveaux_disponibles || []).map(n=><option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div><label>📅 Date souhaitée</label><input type="date" value={form.date_souhaitee} onChange={e=>setForm({...form,date_souhaitee:e.target.value})} /></div>
            <button className="btn-indigo" onClick={handleSubmit} disabled={loading} style={{ width:'100%', justifyContent:'center', fontSize:16, padding:'16px' }}>
              {loading ? '⏳ Envoi en cours...' : '✅ Confirmer ma réservation'}
            </button>
          </div>
        )}
      </section>

      <footer style={{ background:'#0d0d2a', padding:32, textAlign:'center' }}>
        <p style={{ fontFamily:'Nunito,sans-serif', color:'#444', fontSize:13 }}>© 2026 Prof à Domicile Yaoundé — Site par <span style={{ color:'#4f46e5' }}>Kamer Market Hub</span></p>
      </footer>
    </main>
  )
}