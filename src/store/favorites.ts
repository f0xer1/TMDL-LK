import {create} from "zustand";
import {persist} from "zustand/middleware";

interface FavoritesState {
  favoriteIds: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      addFavorite: (id) =>
        set((state) =>
          state.favoriteIds.includes(id)
            ? state
            : {favoriteIds: [...state.favoriteIds, id]},
        ),

      removeFavorite: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((favoriteId) => favoriteId !== id),
        })),

      toggleFavorite: (id) =>
        get().isFavorite(id) ? get().removeFavorite(id) : get().addFavorite(id),

      isFavorite: (id) => get().favoriteIds.includes(id),
    }),
    {name: "favorites"},
  ),
);
