import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import useAuth from "../../hooks/UseAuth/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error("Logout error", err));
  };

  const navLinks = [{ name: "Home", path: "/" }];

  const styles = {
    navbar: {
      backgroundColor: "var(--color-background)",
      color: "var(--color-text)",
    },
    logo: {
      color: "var(--color-text)",
    },
    button: {
      backgroundColor: "var(--color-button)",
      color: "var(--color-background)",
    },
    loginOutline: {
      border: "1px solid var(--color-button)",
      color: "var(--color-button)",
    },
  };

  return (
    <div className="navbar shadow-md font-urbanist" style={styles.navbar}>
      <div className="w-full max-w-6xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold flex items-center gap-2" style={styles.logo}>
          <img src="/logo.svg" alt="logo" className="w-6 h-6" />
          Tribly
        </Link>

        {/* Nav Links */}
        <div className="hidden lg:flex gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive ? "btn btn-sm btn-ghost btn-active" : "btn btn-sm btn-ghost"
              }
              style={{ color: "var(--color-text)" }}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right: User + Theme */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm" style={{ color: "var(--color-text)" }}>
                {user.displayName || user.email}
              </span>
              <button onClick={handleLogout} className="btn btn-sm" style={styles.button}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-sm" style={styles.loginOutline}>
              Login
            </Link>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-square btn-ghost"
            aria-label="Toggle theme"
            style={{ color: "var(--color-text)" }}
          >
            {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
