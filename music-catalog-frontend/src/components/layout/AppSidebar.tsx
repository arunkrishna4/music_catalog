import {
  BarChart3,
  Library,
  LogOut,
  Music2,
  Search,
  UserCircle2Icon,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { logout } from "../../services/auth";
import { ConfirmDialog } from "../ui/ConfirmDialog";

const navItems = [
  { label: "Search", icon: Search, href: "/search" },
  { label: "My Library", icon: Library, href: "/library" },
  { label: "Analytics", icon: BarChart3, href: "/analytics" },
];

export function AppSidebar() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLogoutLoading(false);
      setShowLogoutDialog(false);
    }
  };

  return (
    <>
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
        <div className="border-b border-slate-100 px-6 py-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-sm">
              <Music2 className="h-5 w-5" aria-hidden="true" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">Music Catalog</h2>
              <p className="text-xs text-slate-500">Apple Music Explorer</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 flex-1 space-y-2 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) =>
                `group relative flex h-12 items-center gap-3 rounded-xl px-4 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-[#2563EB]"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-2 h-8 w-1 rounded-r-full bg-[#2563EB]" />
                  )}

                  <item.icon
                    className={`h-5 w-5 transition-transform duration-200 ${
                      isActive ? "" : "group-hover:scale-110"
                    }`}
                    aria-hidden="true"
                  />

                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <UserCircle2Icon
              className="h-8 w-8 text-slate-400"
              aria-hidden="true"
            />

            <p className="truncate text-sm font-semibold text-slate-900">
              Arun Krishna
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowLogoutDialog(true)}
            className="flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </button>
        </div>
      </aside>

      <ConfirmDialog
        open={showLogoutDialog}
        title="Logout"
        description="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        loading={logoutLoading}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutDialog(false)}
      />
    </>
  );
}
