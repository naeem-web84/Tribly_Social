import { Link, NavLink } from "react-router"; 
import { useEffect, useState } from "react";
import { FaBell, FaBars } from "react-icons/fa";
import useAuth from "../../hooks/useAuth/useAuth";
import CustomButton from "../../components/CustomButton/CustomButton";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Logo from "../../components/Logo/Logo";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { data: mongoUser, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
  });

  const id = mongoUser?._id;
  const membershipPath = `/membership/${id}`;

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
        setMenuOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const profileImage = user?.photoURL || mongoUser?.photo || "/default-avatar.png";
  const displayName = user?.displayName || mongoUser?.userName || user?.email;

  if (user && isLoading) {
    return (
      <div className="p-4 text-center font-semibold text-primary">
        Loading navbar...
      </div>
    );
  }

  return (
    <div className="navbar sticky top-0 z-50 bg-secondary text-base-content shadow-md font-urbanist">
      <div className="relative w-full max-w-6xl mx-auto px-4 flex items-center justify-between gap-4">

        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
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

        {/* Right side actions */}
        <div className="flex items-center gap-2 relative">
          {/* Desktop Only */}
          {user && (
            <div className="hidden lg:flex items-center gap-2 dropdown-wrapper relative">
              <CustomButton className="btn-ghost btn-sm text-primary p-2">
                <FaBell size={18} />
              </CustomButton>
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
          )}

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden btn btn-sm btn-ghost text-primary"
          >
            <FaBars size={18} />
          </button>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-base-100 shadow-lg rounded-md z-50 p-4 text-base-content lg:hidden">
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

              <div className="border-t my-3" />

              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-9 h-9 rounded-full border border-primary"
                    />
                    <span className="text-sm font-semibold truncate">{displayName}</span>
                  </div>
                  <Link
                    to="/user"
                    className="text-sm hover:underline text-primary"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <CustomButton
                    type="button"
                    className="text-left text-sm"
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                  >
                    Logout
                  </CustomButton>
                </div>
              ) : (
                <Link to="/login">
                  <CustomButton className="btn-sm border border-primary text-primary hover:bg-primary hover:text-primary-content mt-2 w-full">
                    Join Us
                  </CustomButton>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
