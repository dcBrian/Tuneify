import ModalProvider from '@/providers/ModalProvider';
import './globals.css';
import SideBar from '@/components/SideBar';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import ToasterProvider from '@/providers/ToasterProvider';
import getSongsByUserId from '@/actions/getSongsByUserId';
import Player from '@/components/Player';
import { twMerge } from 'tailwind-merge';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'tuneify',
  description: "Listen to brian's favorite music!",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={twMerge('select-none', font.className)}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <SideBar songs={userSongs}>{children}</SideBar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
