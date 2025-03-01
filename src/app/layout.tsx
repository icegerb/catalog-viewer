import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Catalog viewer',
  description: 'Display images in catalog viewer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
