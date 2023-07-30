import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { UserDetails } from '@/types';

const getLikedSongsUsers = async (title: string): Promise<UserDetails[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (!title) {
    const { data, error } = await supabase.from('favorite_users').select('users!inner(*)').neq('users.id', sessionData.session?.user.id);

    if (error) {
      console.log(error.message);
    }

    return data?.map((e) => e.users as any) || [];
  }

  const { data, error } = await supabase
    .from('favorite_users')
    .select(' users(*)')
    .ilike('full_name', `%${title}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return data?.map((e) => e.users as any) || [];
};

export default getLikedSongsUsers;
