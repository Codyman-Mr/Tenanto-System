import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Units from "./components/Units";
import TenantDetails from "./components/TenantDetails";
import AssignTenant from "./components/AssignTenant";
import AddUnit from "./components/AddUnit";
import Login from "./components/ui/Login";
import Register from "./components/ui/Register";
import Home from "./components/ui/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private routes */}
        <Route
          path="/dashboard"
          element={
            <div className="min-h-screen flex">
              <aside className="w-64 bg-gray-100 p-4 hidden md:block">
                <h1 className="text-lg font-bold mb-6">Tenanto system</h1>
                <nav className="space-y-2">
                  <Link to="/dashboard" className="block">Dashboard</Link>
                  <Link to="/units" className="block">Units</Link>
                  <Link to="/tenant-details" className="block">Tenant Details</Link>
                  <Link to="/assign-tenant" className="block">Assign Tenant</Link>
                  <Link to="/add-unit" className="block">Add Unit</Link>
                </nav>
              </aside>
              <main className="flex-1 p-4">
                <Dashboard />
              </main>
            </div>
          }
        />

        <Route
          path="/units"
          element={
            <div className="min-h-screen flex">
              <aside className="w-64 bg-gray-100 p-4 hidden md:block">
                <h1 className="text-lg font-bold mb-6">Tenanto system</h1>
                <nav className="space-y-2">
                  <Link to="/dashboard" className="block">Dashboard</Link>
                  <Link to="/units" className="block">Units</Link>
                  <Link to="/tenant-details" className="block">Tenant Details</Link>
                  <Link to="/assign-tenant" className="block">Assign Tenant</Link>
                  <Link to="/add-unit" className="block">Add Unit</Link>
                </nav>
              </aside>
              <main className="flex-1 p-4">
                <Units />
              </main>
            </div>
          }
        />

        <Route
          path="/tenant-details"
          element={
            <div className="min-h-screen flex">
              <aside className="w-64 bg-gray-100 p-4 hidden md:block">
                <h1 className="text-lg font-bold mb-6">Tenanto system</h1>
                <nav className="space-y-2">
                  <Link to="/dashboard" className="block">Dashboard</Link>
                  <Link to="/units" className="block">Units</Link>
                  <Link to="/tenant-details" className="block">Tenant Details</Link>
                  <Link to="/assign-tenant" className="block">Assign Tenant</Link>
                  <Link to="/add-unit" className="block">Add Unit</Link>
                </nav>
              </aside>
              <main className="flex-1 p-4">
                <TenantDetails />
              </main>
            </div>
          }
        />

        <Route
          path="/assign-tenant"
          element={
            <div className="min-h-screen flex">
              <aside className="w-64 bg-gray-100 p-4 hidden md:block">
                <h1 className="text-lg font-bold mb-6">Tenanto system</h1>
                <nav className="space-y-2">
                  <Link to="/dashboard" className="block">Dashboard</Link>
                  <Link to="/units" className="block">Units</Link>
                  <Link to="/tenant-details" className="block">Tenant Details</Link>
                  <Link to="/assign-tenant" className="block">Assign Tenant</Link>
                  <Link to="/add-unit" className="block">Add Unit</Link>
                </nav>
              </aside>
              <main className="flex-1 p-4">
                <AssignTenant />
              </main>
            </div>
          }
        />

        <Route
          path="/add-unit"
          element={
            <div className="min-h-screen flex">
              <aside className="w-64 bg-gray-100 p-4 hidden md:block">
                <h1 className="text-lg font-bold mb-6">Tenanto system</h1>
                <nav className="space-y-2">
                  <Link to="/dashboard" className="block">Dashboard</Link>
                  <Link to="/units" className="block">Units</Link>
                  <Link to="/tenant-details" className="block">Tenant Details</Link>
                  <Link to="/assign-tenant" className="block">Assign Tenant</Link>
                  <Link to="/add-unit" className="block">Add Unit</Link>
                </nav>
              </aside>
              <main className="flex-1 p-4">
                <AddUnit />
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
