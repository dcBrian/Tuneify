import { create } from 'zustand';

interface PlayerStore {
  ids: { id: string; color: string }[];
  activeId?: string;
  activeColor?: string;
  setId: (id: string, color: string) => void;
  setIds: (ids: { id: string; color: string }[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: string, color: string) => set({ activeId: id, activeColor: color }),
  setIds: (ids: { id: string; color: string }[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined, activeColor: undefined }),
}));

export default usePlayer;
