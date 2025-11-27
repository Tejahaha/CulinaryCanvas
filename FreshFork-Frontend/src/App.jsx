/* eslint-disable no-undef */
import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Search, PlusCircle, Trash2, FileSearch, Edit, Menu, X } from "lucide-react";
import AppRoutes from './AppRouter';
import { ThemeProvider, ThemeContext } from './ThemeContext';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  const titleMap = {
    "/explore": "Explore Delicious Recipes",
    "/add": "Share Your Culinary Creation",
    "/user-recipes": "Manage Your Recipes", // Updated title for the new route
  };

  const subtitleMap = {
    "/explore": "Browse our collection of mouthwatering recipes from around the world.",
    "/add": "Add your signature dish to our growing collection of culinary masterpieces.",
    "/user-recipes": "View, update, or delete recipes you have created.", // Updated subtitle for the new route
  };

  const isStandalonePage = ["/", "/login", "/signup"].includes(path);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-main)] transition-colors">
      {isStandalonePage ? (
        <AppRoutes />
      ) : (
        <>
          <header className="bg-[var(--card-bg)] shadow-md sticky top-0 z-50 w-full">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <ChefHat className="h-8 w-8 text-[var(--primary)]" />
                <h1 className="text-2xl font-bold text-[var(--text-main)]">
                  CulinaryCanvas
                </h1>
              </div>

              <nav className="hidden md:flex space-x-1">
                <NavButton to="/explore" icon={<Search className="h-4 w-4" />} label="Explore" active={path === "/explore"} />
                <NavButton to="/add" icon={<PlusCircle className="h-4 w-4" />} label="Add" active={path === "/add"} />
                <NavButton to="/user-recipes" icon={<Edit className="h-4 w-4" />} label="Manage Recipes" active={path === "/user-recipes"} />
                <NavButton icon={<X className="h-4 w-4" />} label="Logout" active={false} onClick={handleLogout} />
                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 rounded-full bg-[var(--card-bg)] hover:bg-[var(--primary-soft)] text-[var(--text-main)]"
                >
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </nav>

              <button
                className="md:hidden p-2 rounded-full hover:bg-[var(--primary-light)] transition-colors"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X className="h-6 w-6 text-[var(--accent)]" /> : <Menu className="h-6 w-6 text-[var(--accent)]" />}
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden bg-[var(--card-bg)] border-t border-[var(--border-color)] py-2 px-4 shadow-lg">
                <div className="flex flex-col space-y-2">
                  <MobileNavButton to="/explore" icon={<Search className="h-5 w-5" />} label="Explore" active={path === "/explore"} />
                  <MobileNavButton to="/add" icon={<PlusCircle className="h-5 w-5" />} label="Add" active={path === "/add"} />
                  <MobileNavButton to="/user-recipes" icon={<Edit className="h-5 w-5" />} label="Manage Recipes" active={path === "/user-recipes"} />
                  <MobileNavButton icon={<X className="h-5 w-5" />} label="Logout" active={false} onClick={handleLogout} />
                  <button
                    onClick={toggleTheme}
                    className="px-4 py-2 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--primary-light)] text-[var(--text-main)] dark:bg-[var(--primary-dark)] dark:text-[var(--text-main)]"
                  >
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
              </div>
            )}
          </header>

          <main className="container mx-auto px-4 py-8 w-full">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-[var(--text-main)] mb-2">{titleMap[path]}</h2>
                <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">{subtitleMap[path]}</p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-2xl shadow-xl overflow-hidden border border-[var(--border-color)]">
                <div className="p-6 md:p-8">
                  <AppRoutes />
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

function NavButton({ to, icon, label, active, onClick }) {
  return (
    <Link
      to={to || "#"}
      onClick={onClick}
      className={`flex items-center space-x-1 px-4 py-2 rounded-full text-xs font-medium transition-all ${
        active
          ? "bg-[var(--primary-soft)] text-[var(--primary-strong)] shadow-sm"
          : "text-[var(--text-secondary)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary-strong)]"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function MobileNavButton({ to, icon, label, active, onClick }) {
  return (
    <Link
      to={to || "#"}
      onClick={onClick}
      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm transition-all ${
        active
          ? "bg-[var(--primary-soft)] text-[var(--primary-strong)] shadow-sm"
          : "text-[var(--text-secondary)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary-strong)]"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}