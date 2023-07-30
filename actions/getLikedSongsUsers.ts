import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { UserDetails } from '@/types';

const getLikedSongsUsers = async (title: string): Promise<UserDetails[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (!title) {
    let query = supabase.from('favorite_users').select('users!inner(*)');

    if (sessionData?.session) {
      query = query.neq('users.id', sessionData?.session?.user?.id);
    }

    const { data, error } = await query;

    if (error) {
      console.log(error.message);
    }

    return data?.map((e) => e.users as any) || [];
  }

  let query = supabase.from('favorite_users').select('users!inner(*)').ilike('users.pseudo', `%${title}%`);

  if (sessionData?.session) {
    query = query.neq('users.id', sessionData?.session?.user?.id);
  }

  const { data, error } = await query;

  if (error) {
    console.log(error.message);
  }

  return data?.map((e) => e.users as any) || [];
};

export default getLikedSongsUsers;
