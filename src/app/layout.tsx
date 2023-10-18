import './globals.css'
import Header from '@/components/header/Header'
import type { Metadata } from 'next'
import { Inter, Montserrat, Nunito } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat'
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito'
});

export const metadata: Metadata = {
  title: 'Web de SL',
  description: 'Haciendo un mundo mejor aportando valor al mercado',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <body className={`${montserrat.variable} ${inter.variable} ${nunito.variable}`}> */}
      <body className={montserrat.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
