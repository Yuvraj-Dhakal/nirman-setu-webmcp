import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/Dashboard";

import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";

import Verification from "../pages/Verification";
import VerificationDetails from "../pages/VerificationDetails";

import Contractors from "../pages/Contractors";
import ContractorDetails from "../pages/ContractorDetails";

import ProjectMap from "../pages/ProjectMap";
import AIMonitor from "../pages/AIMonitor";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";

// =========================================================
// APPLICATION ROUTES
// =========================================================

export default function AppRoutes() {
  return (
    <Routes>

      {/* =====================================================
          ADMIN APPLICATION LAYOUT
      ===================================================== */}

      <Route element={<AdminLayout />}>

        {/* ===================================================
            DASHBOARD
        =================================================== */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* ===================================================
            PROJECTS
        =================================================== */}

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/projects/:id"
          element={<ProjectDetails />}
        />

        {/* ===================================================
            VERIFICATION
        =================================================== */}

        <Route
          path="/verification"
          element={<Verification />}
        />

        <Route
          path="/verification/:id"
          element={<VerificationDetails />}
        />

        {/* ===================================================
            CONTRACTORS
        =================================================== */}

        <Route
          path="/contractors"
          element={<Contractors />}
        />

        <Route
          path="/contractors/:id"
          element={<ContractorDetails />}
        />

        {/* ===================================================
            PROJECT MAP
        =================================================== */}

        <Route
          path="/project-map"
          element={<ProjectMap />}
        />

        {/* ===================================================
            AI MONITOR
        =================================================== */}

        <Route
          path="/ai-monitor"
          element={<AIMonitor />}
        />

        {/* ===================================================
            REPORTS
        =================================================== */}

        <Route
          path="/reports"
          element={<Reports />}
        />

        {/* ===================================================
            SETTINGS
        =================================================== */}

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>

      {/* =====================================================
          DEFAULT ROUTE
      ===================================================== */}

      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

      {/* =====================================================
          UNKNOWN ROUTES
      ===================================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

    </Routes>
  );
}