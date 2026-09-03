import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import MobileHeader from "../components/common/MobileHeader";
import Topbar from "../components/common/Topbar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Application Area */}
      <div className="min-h-screen lg:ml-64">
        {/* Mobile Header */}
        <MobileHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Desktop Topbar */}
        <Topbar />

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
}