import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './../globals.scss';
import ToastWrapper from '@/libs/ToastWrapper';
import 'react-toastify/ReactToastify.css';
import SessionWrapper from '@/libs/SessionWrapper';
import QueryWrapper from '@/libs/QueryWrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'D&K Dreams Blog',
  description: 'D&K Dream의 블로그입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionWrapper>
          <QueryWrapper>
            {children}
            <ToastWrapper />
          </QueryWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}
