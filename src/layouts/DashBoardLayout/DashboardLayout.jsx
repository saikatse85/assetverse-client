import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ActiveNavLink from "../../components/Shared/ActiveNavLink/ActiveNavLink";

const DashboardLayout = () => {
  const { user } = useAuth();

  // Theme
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  if (!user) return <LoadingSpinner />;

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        theme === "dark"
          ? "dark bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* ================= Overlay (Mobile) ================= */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      {/* ================= Sidebar ================= */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-72 p-6 z-40
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-md`}
      >
        {/* Close button (mobile only) */}
        <button
          className="lg:hidden mb-4 text-xl"
          onClick={() => setSidebarOpen(false)}
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-6">AssetVerse Dashboard</h2>

        {/* ================= HR MENU ================= */}
        {user?.role === "hr" && (
          <>
            <h3 className="text-lg font-semibold mb-2">HR MANAGER</h3>
            <nav className="space-y-3 mb-6 flex flex-col">
              <ActiveNavLink
                to="/dashboard/asset-list"
                onClick={() => setSidebarOpen(false)}
              >
                📦 Asset List
              </ActiveNavLink>
              <ActiveNavLink
                to="/dashboard/add-asset"
                onClick={() => setSidebarOpen(false)}
              >
                ➕ Add Asset
              </ActiveNavLink>
              <ActiveNavLink
                to="/dashboard/employee-list"
                onClick={() => setSidebarOpen(false)}
              >
                👥 Employee List
              </ActiveNavLink>
              <ActiveNavLink
                to="/dashboard/all-requests"
                onClick={() => setSidebarOpen(false)}
              >
                📄 All Requests
              </ActiveNavLink>
              <ActiveNavLink
                to="/dashboard/upgrade-package"
                onClick={() => setSidebarOpen(false)}
              >
                🚀 Upgrade Package
              </ActiveNavLink>
              <ActiveNavLink
                to="/dashboard/payment-history"
                onClick={() => setSidebarOpen(false)}
              >
                💳 Payment History
              </ActiveNavLink>
              <ActiveNavLink
                to="/dashboard/hr-analytics"
                onClick={() => setSidebarOpen(false)}
              >
                📊 HR Analytics
              </ActiveNavLink>
            </nav>
          </>
        )}

        {/* ================= EMPLOYEE MENU ================= */}
        {user?.role === "employee" && (
          <>
            <h3 className="text-lg font-semibold mb-2">EMPLOYEE</h3>
            <nav className="space-y-3 flex flex-col">
              <ActiveNavLink
                to="/dashboard/my-assets"
                onClick={() => setSidebarOpen(false)}
              >
                📁 My Assets
              </ActiveNavLink>
              <ActiveNavLink
                to="/dashboard/request-assets"
                onClick={() => setSidebarOpen(false)}
              >
                📝 Request Asset
              </ActiveNavLink>
              <ActiveNavLink
                to="/dashboard/my-team"
                onClick={() => setSidebarOpen(false)}
              >
                🏢 My Team
              </ActiveNavLink>
              <ActiveNavLink
                to="/dashboard/profile"
                onClick={() => setSidebarOpen(false)}
              >
                🙍 Profile
              </ActiveNavLink>
            </nav>
          </>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="mt-10 w-full py-2 bg-[#00e5ff] hover:bg-[#00bcd4] text-white rounded font-medium"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </aside>

      {/* ================= Main Content ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className={`p-4 h-16 shadow flex justify-between items-center ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Mobile menu */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <h1 className="text-lg font-semibold">Dashboard Overview</h1>

          <div
            className={`w-10 h-10 rounded-full ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-300"
            }`}
          />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
