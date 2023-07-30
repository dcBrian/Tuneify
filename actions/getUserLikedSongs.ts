import { Song } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getUserLikedSongs = async (pseudo: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data } = await supabase
    .from('liked_songs')
    .select('users!inner(pseudo), songs(*)')
    .eq('users.pseudo', pseudo)
    .order('created_at', { ascending: false });

  if (!data) return [];

  return data.map((item) => ({
    ...item.songs,
  })) as any;
};

export default getUserLikedSongs;
