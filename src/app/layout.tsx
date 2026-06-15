import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond, Montserrat } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Footer from '@/components/Footer';
import NavBar from '@/components/Navbar';
import Providers from './providers';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jatin & Anushi — December 3, 2026',
  description: 'We are getting married! Join us in Ahmedabad, India for our wedding celebration.',
  openGraph: {
    title: 'Jatin & Anushi — December 3, 2026',
    description: 'Join us for our wedding celebration in Ahmedabad, India.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const fontClasses = `${cinzel.variable} ${cormorant.variable} ${montserrat.variable} wrapper`;
  return (
    <html lang="en">
      <body className={fontClasses}>
        <Providers>
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
