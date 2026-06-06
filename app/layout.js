export const metadata = {
  title: 'KamerMarketHub — Sites vitrines professionnels à Yaoundé',
  description: 'Agence web à Yaoundé. Nous créons des sites vitrines modernes pour commerçants camerounais. Design, hébergement, livraison en 48h.',
}
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}
        <Analytics />
      </body>
    </html>
  )
}