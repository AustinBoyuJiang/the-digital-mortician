import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Digital Mortician',
  description: 'A Web OS puzzle narrative game',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="scanlines">{children}</body>
    </html>
  );
}
