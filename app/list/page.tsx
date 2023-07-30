import getUserLikedSongs from '@/actions/getUserLikedSongs';
import Header from '@/components/Header';
import SearchContent from './components/SearchContent';

export const revalidate = 0;

interface ListProps {
  searchParams: { user: string };
}

const List = async ({ searchParams }: ListProps) => {
  const songs = await getUserLikedSongs(searchParams?.user);

  return (
    <div
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">{searchParams?.user + "'s PlayList"}</h1>
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default List;
