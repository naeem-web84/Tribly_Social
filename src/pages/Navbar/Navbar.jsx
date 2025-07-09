import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { FaSun, FaMoon, FaBell } from "react-icons/fa";
import useAuth from "../../hooks/useAuth/useAuth";
import CustomButton from "../../components/CustomButton/CustomButton";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-wrapper")) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error("Logout error", err));
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Membership", path: "/membership" },
  ];

  return (
    <div
      className="navbar shadow-md font-urbanist"
      style={{ backgroundColor: "var(--color-background)", color: "var(--color-text)" }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold flex items-center gap-2"
          style={{ color: "var(--color-button-text)" }}
        >
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
                `btn btn-sm rounded-md font-semibold transition-colors duration-300 ${
                  isActive
                    ? "bg-[var(--color-button)] text-[var(--color-button-text)]"
                    : "border border-[var(--color-button)] text-[var(--color-button)] hover:bg-[var(--color-button)] hover:text-[var(--color-button-text)]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 relative">
          {/* Notification Icon */}
          <button className="btn btn-sm btn-ghost" aria-label="Notifications">
            <FaBell size={18} style={{ color: "var(--color-button-text)" }} />
          </button>

          {/* User Auth Section */}
          {user ? (
            <div className="relative dropdown-wrapper">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-9 h-9 rounded-full cursor-pointer border-2 border-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 p-3"
                  style={{
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-text)",
                  }}
                >
                  <div className="px-2 py-1 text-sm font-semibold border-b border-gray-300">
                    {user.displayName || user.email}
                  </div>
                  <Link
                    to="/dashboard/user"
                    className="block px-2 py-2 hover:bg-gray-200 rounded text-sm"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-2 py-2 text-sm hover:bg-gray-200 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm"
              style={{
                border: "1px solid var(--color-button)",
                color: "var(--color-button)",
              }}
            >
              Join Us
            </Link>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-square btn-ghost"
            aria-label="Toggle theme"
            style={{ color: "var(--color-button-text)" }}
          >
            {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
