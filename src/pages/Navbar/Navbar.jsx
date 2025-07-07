import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import useAuth from "../../hooks/UseAuth/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "mylight");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "mylight" ? "mydark" : "mylight");
  };

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error("Logout error", err));
  };

  const navLinks = [{ name: "Home", path: "/" }];

  return (
    <div
      className="navbar shadow-md w-full"
      style={{
        backgroundColor: "var(--color-secondary)", // navbar bg
        color: "var(--color-text)",                 // navbar text
      }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex-1">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold"
            style={{ color: "var(--color-primary)" }}  // logo text color
          >
            <img src="/logo.svg" alt="logo" className="w-6 h-6" />
            Trible
          </Link>
        </div>

        {/* Middle nav */}
        <div className="hidden lg:flex flex-none gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "btn btn-sm btn-ghost btn-active bg-outline"
                  : "btn btn-sm btn-ghost"
              }
              style={{ color: "var(--color-primary)" }}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right side */}
        <div className="flex-none flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm hidden sm:inline">{user.displayName || user.email}</span>
              <button
                onClick={handleLogout}
                className="btn btn-sm"
                style={{ backgroundColor: "var(--color-primary)", color: "var(--color-secondary)" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-sm btn-outline"
                style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
              >
                Login
              </Link>
            </>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-square btn-ghost"
            aria-label="Toggle Dark/Light Mode"
            style={{ color: "var(--color-primary)" }}
          >
            {theme === "mylight" ? (
              <FaMoon size={18} />
            ) : (
              <FaSun size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
