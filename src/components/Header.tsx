import { NavLink } from "react-router-dom";
import { useFavoritesStore } from "../store/favorites.ts";

function Header() {
  const favoritesCount = useFavoritesStore((state) => state.favoriteIds.length);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-2">
        <span className="mr-4 text-lg font-bold text-white">🎬 Movie Explorer</span>
        <NavLink to="/" className={linkClass}>
          Головна
        </NavLink>
        <NavLink to="/favorites" className={linkClass}>
          Обране
          {favoritesCount > 0 && (
            <span className="ml-2 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-black">
              {favoritesCount}
            </span>
          )}
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
