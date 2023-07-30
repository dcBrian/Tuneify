import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import SearchContent from './components/SearchContent';
import getLikedSongsUsers from '@/actions/getLikedSongsUsers';

export const revalidate = 0;

interface SearchProps {
  searchParams: { title: string };
}

const Search = async ({ searchParams }: SearchProps) => {
  const users = await getLikedSongsUsers(searchParams.title);

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
          <h1 className="text-white text-3xl font-semibold">People&apos;s Playlist</h1>
          <SearchInput baseUrl="/playlist" placeholder="Whose playlist do you want to listen to?" />
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">All Playlists</h1>
        </div>
        <SearchContent users={users} />
      </div>
    </div>
  );
};

export default Search;
