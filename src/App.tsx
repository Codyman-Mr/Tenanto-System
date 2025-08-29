import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from "react-router-dom";
import { Home as HomeIcon, Grid3X3, Users, Settings } from "lucide-react";

import Home from "./components/ui/Home";
import Login from "./components/ui/Login";
import Register from "./components/ui/Register";

import Dashboard from "./components/Dashboard";
import Units from "./components/Units"; // default import
import TenantDetails from "./components/TenantDetails";
import AssignTenant from "./components/AssignTenant";
import AddUnit from "./components/AddUnit";

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

// Layout with sidebar for protected pages
function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-800 text-white p-8 flex flex-col">
        <h1 className="text-3xl font-extrabold mb-10">Tenanto System</h1>
        <nav className="flex flex-col gap-6 text-lg">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg transition-colors ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700/50"
              }`
            }
          >
            <HomeIcon className="w-7 h-7" /> Dashboard
          </NavLink>

          <NavLink
            to="/units"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg transition-colors ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700/50"
              }`
            }
          >
            <Grid3X3 className="w-7 h-7" /> Units
          </NavLink>

          <NavLink
            to="/tenant-details"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg transition-colors ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700/50"
              }`
            }
          >
            <Users className="w-7 h-7" /> Tenant Details
          </NavLink>

          <NavLink
            to="/add-unit"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg transition-colors ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700/50"
              }`
            }
          >
            <Settings className="w-7 h-7" /> Add Unit
          </NavLink>

          <button
            onClick={() => {
              localStorage.removeItem("currentUser");
              window.location.href = "/login";
            }}
            className="mt-10 text-left text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-100 min-h-screen">{children}</main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages with sidebar */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/units"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Units />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tenant-details"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <TenantDetails />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assign-tenant"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <AssignTenant />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-unit"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <AddUnit />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
