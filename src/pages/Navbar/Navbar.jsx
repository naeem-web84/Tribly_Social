import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { FaBell, FaBars } from "react-icons/fa";
import useAuth from "../../hooks/useAuth/useAuth";
import CustomButton from "../../components/CustomButton/CustomButton";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Fetch mongo user info by email
  const { data: mongoUser, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
  });

  // Don't render navbar until user data is fetched
  if (user && isLoading) {
    return (
      <div className="p-4 text-center font-semibold text-primary">Loading navbar...</div>
    );
  }

  // Get dynamic ID
  const id = mongoUser?._id;
  const membershipPath = id ? `/membership/${id}` : "/membership";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Membership", path: membershipPath },
    { name: "Dashboard", path: "/user" },
    { name: "Admin Dashboard", path: "/admin" },
  ];

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error("Logout error", err));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-wrapper")) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const profileImage = user?.photoURL || mongoUser?.photo || "/default-avatar.png";
  const displayName = user?.displayName || mongoUser?.userName || user?.email;

  return (
    <div className="navbar sticky top-0 z-50 bg-secondary text-base-content shadow-md font-urbanist">
      <div className="w-full max-w-6xl mx-auto px-4 flex items-center justify-between gap-4 relative">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold flex items-center gap-2 text-base-content">
          <img src="/logo.svg" alt="Tribly logo" className="w-6 h-6" />
          Tribly
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `btn btn-sm font-semibold rounded-md transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-content"
                    : "border border-primary text-primary hover:bg-primary hover:text-primary-content"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-sm btn-ghost text-primary">
            <FaBars size={18} />
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 relative">
          <CustomButton className="btn-ghost btn-sm text-primary p-2" aria-label="Notifications">
            <FaBell size={18} />
          </CustomButton>

          {user ? (
            <div className="relative dropdown-wrapper">
              <img
                src={profileImage}
                alt="Profile"
                className="w-9 h-9 rounded-full cursor-pointer border-2 border-primary"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 p-3 bg-base-100 text-base-content">
                  <div className="px-2 py-1 text-sm font-semibold border-b truncate">
                    {displayName}
                  </div>
                  <Link
                    to="/user"
                    className="block px-2 py-2 hover:bg-base-200 rounded text-sm"
                  >
                    Dashboard
                  </Link>
                  <CustomButton
                    type="button"
                    className="w-full text-left text-sm mt-1"
                    onClick={handleLogout}
                  >
                    Logout
                  </CustomButton>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <CustomButton className="btn-sm border border-primary text-primary hover:bg-primary hover:text-primary-content">
                Join Us
              </CustomButton>
            </Link>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-base-100 shadow-md z-40 px-4 py-2 lg:hidden">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-primary-content"
                      : "text-primary hover:bg-primary hover:text-primary-content"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
