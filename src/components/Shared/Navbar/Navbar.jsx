import { useState, useEffect } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import Logo from "../Logo/Logo";
import ActiveNavLink from "../ActiveNavLink/ActiveNavLink";

const Navbar = () => {
  const { user, logOut, role } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const [openProfile, setOpenProfile] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  // Theme apply
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <nav className="fixed w-full z-50 bg-base-100 shadow-md border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* LEFT — Logo + Hamburger */}
        <div className="flex items-center gap-4">
          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpenMobileMenu(true)}
          >
            ☰
          </button>

          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-6 text-[16px] font-medium">
            <ActiveNavLink to="/">Home</ActiveNavLink>
            <ActiveNavLink to="/join-employee">Join as Employee</ActiveNavLink>
            <ActiveNavLink to="/join-hr">Join as HR Manager</ActiveNavLink>
          </div>
        </div>

        {/* RIGHT — Theme + Auth */}
        <div className="flex items-center gap-4">
          {/* THEME */}
          <label className="swap swap-rotate cursor-pointer">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <svg
              className="swap-on w-6 h-6 text-yellow-400"
              viewBox="0 0 24 24"
            >
              <path d="M5 12a7 7 0 1 0 7-7" />
            </svg>
            <svg className="swap-off w-6 h-6" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="6" />
            </svg>
          </label>

          {!user && (
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}

          {/* PROFILE */}
          {user && (
            <div className="relative">
              <img
                src={user.photoURL || avatarImg}
                onClick={() => setOpenProfile(!openProfile)}
                className="h-10 w-10 rounded-full cursor-pointer border"
              />

              {openProfile && (
                <div className="absolute right-0 mt-3 w-56 bg-base-100 border shadow-md rounded-xl z-50">
                  <div className="p-4 text-sm">
                    <p className="font-semibold">Mail: {user.email}</p>
                    <p className="text-primary capitalize">Role: {user.role}</p>
                  </div>
                  <div className="divider my-0"></div>

                  {role === "employee" && (
                    <>
                      <div className="flex flex-col py-2 ml-5">
                        <ActiveNavLink to="/dashboard/my-assets">
                          My Assets
                        </ActiveNavLink>
                        <ActiveNavLink to="/dashboard/request-assets">
                          Request Assets
                        </ActiveNavLink>
                        <ActiveNavLink to="/dashboard/my-team">
                          My Team
                        </ActiveNavLink>
                        <ActiveNavLink to="/dashboard/profile">
                          Profile
                        </ActiveNavLink>
                      </div>
                    </>
                  )}

                  {role === "hr" && (
                    <>
                      <div className="flex flex-col py-2 ml-5">
                        <ActiveNavLink to="/dashboard/asset-list">
                          Asset List
                        </ActiveNavLink>
                        <ActiveNavLink to="/dashboard/add-asset">
                          Add Asset
                        </ActiveNavLink>
                        <ActiveNavLink to="/dashboard/all-requests">
                          All Request
                        </ActiveNavLink>
                        <ActiveNavLink to="/dashboard/employee-list">
                          Employee List
                        </ActiveNavLink>
                        <ActiveNavLink to="/dashboard/hr-analytics">
                          HR Analytics
                        </ActiveNavLink>
                      </div>
                    </>
                  )}

                  <button
                    onClick={logOut}
                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ================= MOBILE LEFT DRAWER ================= */}
      {openMobileMenu && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setOpenMobileMenu(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Drawer */}
          <div className="fixed top-0 left-0 w-64 h-full bg-base-100 z-50 p-6 shadow-lg">
            <button
              onClick={() => setOpenMobileMenu(false)}
              className="mb-6 text-xl"
            >
              ✖
            </button>

            <nav className="flex flex-col gap-4 text-lg font-medium">
              <ActiveNavLink to="/" onClick={() => setOpenMobileMenu(false)}>
                Home
              </ActiveNavLink>
              <ActiveNavLink
                to="/join-employee"
                onClick={() => setOpenMobileMenu(false)}
              >
                Join as Employee
              </ActiveNavLink>
              <ActiveNavLink
                to="/join-hr"
                onClick={() => setOpenMobileMenu(false)}
              >
                Join as HR Manager
              </ActiveNavLink>
            </nav>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
