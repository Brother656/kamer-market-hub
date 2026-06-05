'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ChezGraceBeaute() {
  const [services, setServices] = useState([])
  const [temoignages, setTemoignages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data: srv } = await supabase.from('services').select('*')
      const { data: tem } = await supabase.from('temoignages').select('*')
      if (srv) setServices(srv)
      if (tem) setTemoignages(tem)
      setLoading(false)
    }
    fetchData()
  }, [])

  const prestationsFallback = [
    { id: 1, nom: 'Tresses africaines', prix: 5000, duree: '3h', categorie: 'Tresses' },
    { id: 2, nom: 'Défrisage', prix: 8000, duree: '2h', categorie: 'Chimique' },
    { id: 3, nom: 'Coloration', prix: 12000, duree: '2h30', categorie: 'Couleur' },
    { id: 4, nom: 'Soins kératine', prix: 15000, duree: '3h', categorie: 'Soins' },
    { id: 5, nom: 'Coupe & brushing', prix: 4000, duree: '1h', categorie: 'Coupe' },
    { id: 6, nom: 'Tissage naturel', prix: 20000, duree: '4h', categorie: 'Tresses' },
  ]

  const temoignagesFallback = [
    { id: 1, nom_client: 'Aminata K.', texte: 'Mes tresses ont tenu plus de 6 semaines, un travail impeccable !', note: 5 },
    { id: 2, nom_client: 'Christelle M.', texte: 'Grâce est vraiment professionnelle, le salon est très propre.', note: 5 },
    { id: 3, nom_client: 'Sandra B.', texte: 'La meilleure coloration que j\'ai eu à Yaoundé, je recommande !', note: 5 },
  ]

  const displayServices = services.length > 0 ? services : prestationsFallback
  const displayTemoignages = temoignages.length > 0 ? temoignages : temoignagesFallback

  const whatsappLink = 'https://wa.me/237600000000?text=Bonjour, je voudrais réserver un rendez-vous chez Grâce Beauté'

  return (
    <main style={{ fontFamily: "'Playfair Display', Georgia, serif", background: '#fff8f6', minHeight: '100vh' }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fff8f6; }
        .btn-wa {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #c9a96e, #e8c99a);
          color: #3a1e00; padding: 14px 32px; border-radius: 50px;
          font-family: 'Lato', sans-serif; font-weight: 700; font-size: 15px;
          text-decoration: none; letter-spacing: 0.5px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(201,169,110,0.4);
        }
        .btn-wa:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(201,169,110,0.5); }
        .service-card {
          background: white; border-radius: 16px; padding: 24px;
          border: 1px solid #f5e6e0;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(201,169,110,0.15); }
        .gallery-img {
          width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 12px;
          transition: transform 0.3s;
        }
        .gallery-img:hover { transform: scale(1.03); }
        .star { color: #c9a96e; font-size: 18px; }
        .floating-wa {
          position: fixed; bottom: 28px; right: 28px; z-index: 999;
          background: #25D366; color: white; width: 60px; height: 60px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 28px; box-shadow: 0 4px 20px rgba(37,211,102,0.5);
          text-decoration: none; transition: transform 0.2s;
        }
        .floating-wa:hover { transform: scale(1.1); }
        nav { 
          position: sticky; top: 0; z-index: 100;
          background: rgba(255,248,246,0.95); backdrop-filter: blur(8px);
          border-bottom: 1px solid #f5e6e0; padding: 16px 24px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .nav-logo { font-family: 'Playfair Display', serif; font-size: 22px; color: #8b2252; font-style: italic; }
        .nav-links { display: flex; gap: 28px; list-style: none; }
        .nav-links a { font-family: 'Lato', sans-serif; font-size: 14px; color: #5a3040; text-decoration: none; letter-spacing: 0.5px; }
        .nav-links a:hover { color: #8b2252; }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hero-title { font-size: 38px !important; }
          .grid-3 { grid-template-columns: 1fr 1fr !important; }
          .grid-services { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <span className="nav-logo">Chez Grâce Beauté</span>
        <ul className="nav-links">
          <li><a href="#prestations">Prestations</a></li>
          <li><a href="#galerie">Galerie</a></li>
          <li><a href="#avis">Avis</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-wa" style={{ padding: '10px 20px', fontSize: '13px' }}>
          Réserver
        </a>
      </nav>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80"
          alt="Salon de coiffure Chez Grâce Beauté"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.45)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(139,34,82,0.6) 0%, rgba(0,0,0,0.3) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Lato, sans-serif', color: '#f0c080', fontSize: 13, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 20 }}>
            Salon de coiffure & beauté — Yaoundé
          </p>
          <h1 className="hero-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 62, color: 'white', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
            Votre beauté,<br /><em style={{ color: '#f0c080' }}>notre passion</em>
          </h1>
          <p style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(255,255,255,0.85)', fontSize: 18, lineHeight: 1.7, marginBottom: 40, fontWeight: 300 }}>
            Tresses, défrisage, coloration, soins — nous sublimions vos cheveux avec expertise et tendresse depuis 2018.
          </p>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-wa">
            <span>📱</span> Réserver sur WhatsApp
          </a>
        </div>
      </section>

      {/* PRESTATIONS */}
      <section id="prestations" style={{ padding: '100px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontFamily: 'Lato, sans-serif', color: '#c9a96e', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 }}>Nos services</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, color: '#3a1020', marginBottom: 16 }}>Nos Prestations</h2>
          <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg, #c9a96e, #e8c99a)', margin: '0 auto', borderRadius: 2 }} />
        </div>
        <div className="grid-services" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {displayServices.map(s => (
            <div key={s.id} className="service-card">
              <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 11, color: '#c9a96e', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10 }}>{s.categorie}</p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#3a1020', marginBottom: 12 }}>{s.nom}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Lato, sans-serif', fontSize: 22, fontWeight: 700, color: '#8b2252' }}>
                  {s.prix.toLocaleString()} FCFA
                </span>
                <span style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: '#999', background: '#fff0ec', padding: '4px 12px', borderRadius: 20 }}>
                  ⏱ {s.duree}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-wa">
            <span>💬</span> Demander un devis
          </a>
        </div>
      </section>

      {/* GALERIE */}
      <section id="galerie" style={{ background: '#3a1020', padding: '100px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: 'Lato, sans-serif', color: '#c9a96e', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 }}>Notre travail</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, color: 'white' }}>Galerie Avant / Après</h2>
          </div>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
              'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80',
              'https://images.unsplash.com/photo-1580618432175-5a1a1c2504b7?w=600&q=80',
              'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80',
              'https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=600&q=80',
              'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80',
            ].map((url, i) => (
              <div key={i} style={{ overflow: 'hidden', borderRadius: 12 }}>
                <img src={url} alt={`Réalisation ${i + 1}`} className="gallery-img" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section id="avis" style={{ padding: '100px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontFamily: 'Lato, sans-serif', color: '#c9a96e', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 }}>Ce qu'elles disent</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, color: '#3a1020' }}>Témoignages</h2>
        </div>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {displayTemoignages.map(t => (
            <div key={t.id} style={{ background: 'white', borderRadius: 20, padding: 32, border: '1px solid #f5e6e0', position: 'relative' }}>
              <p style={{ fontSize: 48, color: '#f5e6e0', fontFamily: 'Georgia', position: 'absolute', top: 16, right: 24, lineHeight: 1 }}>"</p>
              <div style={{ marginBottom: 16 }}>
                {[...Array(t.note || 5)].map((_, i) => <span key={i} className="star">★</span>)}
              </div>
              <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 15, color: '#5a3040', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
                "{t.texte}"
              </p>
              <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, color: '#8b2252', fontSize: 14 }}>— {t.nom_client}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT & HORAIRES */}
      <section id="contact" style={{ background: 'linear-gradient(135deg, #8b2252, #c9a96e)', padding: '100px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, color: 'white', marginBottom: 16 }}>Nous Trouver</h2>
          <p style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(255,255,255,0.85)', fontSize: 17, marginBottom: 60, fontWeight: 300 }}>
            Yaoundé, Quartier Bastos — En face du marché principal
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 60 }}>
            {[
              { icon: '🕐', title: 'Lundi – Samedi', detail: '8h00 – 20h00' },
              { icon: '🕐', title: 'Dimanche', detail: '10h00 – 16h00' },
              { icon: '📍', title: 'Adresse', detail: 'Bastos, Yaoundé' },
              { icon: '📞', title: 'Téléphone', detail: '+237 6XX XXX XXX' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: '28px 20px', backdropFilter: 'blur(8px)' }}>
                <p style={{ fontSize: 32, marginBottom: 10 }}>{item.icon}</p>
                <p style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(255,255,255,0.7)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>{item.title}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", color: 'white', fontSize: 18, fontWeight: 700 }}>{item.detail}</p>
              </div>
            ))}
          </div>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-wa" style={{ background: 'white', color: '#8b2252' }}>
            <span>💬</span> Réserver maintenant sur WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#1a0810', padding: '32px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
          © 2026 Chez Grâce Beauté — Site créé par{' '}
          <span style={{ color: '#c9a96e' }}>Kamer Market Hub</span>
        </p>
      </footer>

      {/* BOUTON WHATSAPP FLOTTANT */}
      <a href={whatsappLink} target="_blank" rel="noreferrer" className="floating-wa" title="Contacter sur WhatsApp">
        💬
      </a>
    </main>
  )
}