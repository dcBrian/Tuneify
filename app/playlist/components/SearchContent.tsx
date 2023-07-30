'use client';

import PlaylistItem from '@/components/PlaylistItem';
import { UserDetails } from '@/types';

type PlaylistPageContentProps = {
  users: UserDetails[];
};

function PlaylistPageContent({ users }: PlaylistPageContentProps) {
  if (users.length === 0) return <div className="py-2 text-neutral-400">No playlists available.</div>;

  return (
    <div
      className="
            grid 
            grid-cols-2 
            sm:grid-cols-2 
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-8
            gap-4
            mt-4
        "
    >
      {users.map((user) => (
        <PlaylistItem key={user?.id} data={user} />
      ))}
    </div>
  );
}

export default PlaylistPageContent;
