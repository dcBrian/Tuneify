'use client';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { UserDetails } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useMemo } from 'react';

type PlaylistItemProps = {
  data: UserDetails;
};

export default function PlaylistItem({ data }: PlaylistItemProps) {
  const router = useRouter();
  const { user } = useUser();
  const authModal = useAuthModal();

  const imagePath = data?.avatar_url || '/images/avatar.png';

  const url = useMemo(() => {
    const query = {
      user: data.pseudo,
    };
    const url = qs.stringifyUrl({
      url: '/list',
      query,
    });

    return url;
  }, [data]);

  const handleClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    router.push(url);
  };

  return (
    <div
      onClick={handleClick}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 active:bg-neutral-400/20 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image className="object-cover" src={imagePath || '/images/liked.png'} fill alt={data.full_name || 'avatar'} />
      </div>
      <div className="flex flex-col items-start w-full gap-y-1 pt-4">
        <p className="truncate font-semibold w-full text-center">{data?.pseudo}</p>
        {/* <p className="truncate text-neutral-400 text-sm pb-4 w-full">By {data.author}</p> */}
      </div>
      {/* <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div> */}
    </div>
  );
}
