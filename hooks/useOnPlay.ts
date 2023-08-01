import { Song } from '@/types';

import usePlayer from './usePlayer';
import useAuthModal from './useAuthModal';
import { useUser } from './useUser';

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    // Allow everyone to play music without being connected
    // if (!user) {
    //   return authModal.onOpen();
    // }

    player.setId(id, songs.find((e) => e.id === id)?.color || '');
    player.setIds(songs.map((song) => ({ id: song.id, color: song.color })));
  };

  return onPlay;
};

export default useOnPlay;
