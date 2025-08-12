import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FavoritesProvider } from '@/contexts/FavoritesContext'
import CookieConsent from '@/components/CookieConsent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Capim das Pampas - Flores e Cerâmica',
  description: 'Loja especializada em flores e peças de cerâmica artesanal',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <FavoritesProvider>
          {children}
          <CookieConsent />
        </FavoritesProvider>
      </body>
    </html>
  )
}
