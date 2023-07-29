'use client';

import { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useSessionContext } from '@supabase/auth-helpers-react';

import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';

interface LikeButtonProps {
  songId: string;
}

const LikeButton = ({ songId }: LikeButtonProps) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient.from('liked_songs').select('*').eq('user_id', user.id).eq('song_id', songId).single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      setIsLiked(false);
      const { error } = await supabaseClient.from('liked_songs').delete().eq('user_id', user.id).eq('song_id', songId);

      if (error) {
        toast.error(error.message);
        setIsLiked(true);
      } else {
        toast.success('Removed from favorites');
      }
    } else {
      setIsLiked(true);
      const { error } = await supabaseClient.from('liked_songs').insert({
        song_id: songId,
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message);
        setIsLiked(false);
      } else {
        toast.success('Added to favorites');
      }
    }

    router.refresh();
  };

  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={handleLike}
    >
      <Icon color={isLiked ? '#c52222' : 'white'} size={25} />
    </button>
  );
};

export default LikeButton;
