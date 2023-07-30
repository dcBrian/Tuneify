'use client';

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';
import Image from 'next/image';
import PlayButton from './PlayButton';

type SongItemProps = {
  data: Song;
  onClick: (id: string) => void;
};

export default function SongItem({ data, onClick }: SongItemProps) {
  const imagePath = useLoadImage(data);
  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 active:bg-neutral-400/20 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image className="object-cover" src={imagePath || '/images/liked.png'} fill alt={data.title} />
      </div>
      <div className="flex flex-col items-start w-full gap-y-1 pt-4">
        <p className="truncate font-semibold w-full">{data.title}</p>
        <p className="truncate text-neutral-400 text-sm pb-4 w-full">By {data.author}</p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
}
