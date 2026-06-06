export const metadata = {
  title: 'KamerMarketHub — Sites vitrines professionnels à Yaoundé',
  description: 'Agence web à Yaoundé. Sites vitrines modernes pour commerçants camerounais. Design, hébergement, livraison en 72h.',
}

import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="fr" style={{ margin: 0, padding: 0, background: '#07070e' }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#07070e" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#07070e', overflowX: 'hidden' }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}