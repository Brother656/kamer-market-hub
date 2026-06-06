export const metadata = {
  title: 'KamerMarketHub — Sites vitrines professionnels à Yaoundé',
  description: 'Agence web à Yaoundé. Sites vitrines modernes pour commerçants camerounais. Design, hébergement, livraison en 72h.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}