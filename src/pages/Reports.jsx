import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  FileText,
  FolderKanban,
  CheckCircle2,
  Users,
  Clock3,
  Eye,
  Download,
  X,
  CalendarDays,
} from "lucide-react";

// =========================================================
// REPORT RECORDS
// =========================================================
// Temporary frontend-only data.
//
// IMPORTANT:
// These are mock records for development.
//
// Production reports must be generated and retrieved from
// authenticated backend services with proper authorization,
// validation, secure document handling, and audit logging.
// =========================================================

const reportRecords = [
  {
    id: 1,
    title: "Ward 5 Road Improvement - Progress Report",
    type: "Project Progress",
    project: "Ward 5 Road Improvement",
    location: "Lalitpur",
    generatedDate: "2026-08-20",
    status: "Ready",
    generatedBy: "Ram Sharma",
    period: "August 2026",
  },
  {
    id: 2,
    title: "Dhobighat Drainage Project - Verification Report",
    type: "Verification",
    project: "Dhobighat Drainage Project",
    location: "Lalitpur",
    generatedDate: "2026-08-18",
    status: "Ready",
    generatedBy: "Sita Thapa",
    period: "August 2026",
  },
  {
    id: 3,
    title: "Kathmandu Builders - Performance Report",
    type: "Contractor Performance",
    project: "Multiple Projects",
    location: "Kathmandu",
    generatedDate: "2026-08-15",
    status: "Ready",
    generatedBy: "Admin",
    period: "July 2026",
  },
  {
    id: 4,
    title: "Community Building Construction - Progress Report",
    type: "Project Progress",
    project: "Community Building Construction",
    location: "Kathmandu",
    generatedDate: "2026-08-12",
    status: "Processing",
    generatedBy: "Hari Karki",
    period: "August 2026",
  },
  {
    id: 5,
    title: "Municipal Infrastructure Verification Summary",
    type: "Verification",
    project: "Multiple Projects",
    location: "Kathmandu Valley",
    generatedDate: "2026-08-10",
    status: "Ready",
    generatedBy: "Admin",
    period: "July 2026",
  },
  {
    id: 6,
    title: "Contractor Compliance Summary",
    type: "Contractor Performance",
    project: "Multiple Projects",
    location: "Kathmandu Valley",
    generatedDate: "2026-08-05",
    status: "Ready",
    generatedBy: "Admin",
    period: "July 2026",
  },
];

// =========================================================
// STATUS STYLES
// =========================================================

const statusStyles = {
  Ready:
    "border-emerald-200 bg-emerald-50 text-emerald-700",

  Processing:
    "border-amber-200 bg-amber-50 text-amber-700",
};

// =========================================================
// REPORT TYPE STYLES
// =========================================================

const reportTypeStyles = {
  "Project Progress":
    "border-blue-200 bg-blue-50 text-blue-700",

  Verification:
    "border-purple-200 bg-purple-50 text-purple-700",

  "Contractor Performance":
    "border-slate-200 bg-slate-50 text-slate-700",
};

// =========================================================
// REPORT STATISTICS
// =========================================================

const statistics = [
  {
    label: "Total Reports",
    value: 128,
    description: "Reports generated",
    icon: FileText,
  },
  {
    label: "Project Reports",
    value: 64,
    description: "Progress reports",
    icon: FolderKanban,
  },
  {
    label: "Verification Reports",
    value: 38,
    description: "Verification records",
    icon: CheckCircle2,
  },
  {
    label: "Contractor Reports",
    value: 26,
    description: "Performance reports",
    icon: Users,
  },
];

// =========================================================
// REPORTS PAGE
// =========================================================

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Report preview
  const [selectedReport, setSelectedReport] = useState(null);

  // Generate report modal
  const [isGenerateModalOpen, setIsGenerateModalOpen] =
    useState(false);

  const [generationMessage, setGenerationMessage] =
    useState("");

  // =======================================================
  // FILTER REPORTS
  // =======================================================

  const filteredReports = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return reportRecords.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(search) ||
        report.project.toLowerCase().includes(search) ||
        report.location.toLowerCase().includes(search) ||
        report.generatedBy.toLowerCase().includes(search);

      const matchesType =
        typeFilter === "All" ||
        report.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" ||
        report.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [searchTerm, typeFilter, statusFilter]);

  // =======================================================
  // CLEAR FILTERS
  // =======================================================

  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("All");
    setStatusFilter("All");
  };

  const hasActiveFilters =
    searchTerm ||
    typeFilter !== "All" ||
    statusFilter !== "All";

  // =======================================================
  // OPEN GENERATE MODAL
  // =======================================================

  const openGenerateModal = () => {
    setGenerationMessage("");
    setIsGenerateModalOpen(true);
  };

  // =======================================================
  // CLOSE GENERATE MODAL
  // =======================================================

  const closeGenerateModal = () => {
    setGenerationMessage("");
    setIsGenerateModalOpen(false);
  };

  // =======================================================
  // GENERATE REPORT
  // =======================================================

  const handleGenerateReport = (event) => {
    event.preventDefault();

    // -------------------------------------------------------
    // FRONTEND DEVELOPMENT ONLY
    //
    // Later this action will call a secure backend API.
    // The backend will:
    //
    // - authenticate the user
    // - verify permissions
    // - validate request data
    // - retrieve authorized project data
    // - generate the report
    // - store audit information
    // - return a secure report reference
    // -------------------------------------------------------

    setGenerationMessage(
      "Report generation request submitted successfully."
    );
  };

  // =======================================================
  // MAIN PAGE
  // =======================================================

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-[1800px] p-4 sm:p-5 md:p-6 lg:p-8">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <section className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wider text-blue-600 sm:text-sm">
            Reporting & Documentation
          </p>

          <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
            Reports
          </h1>

          <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
            Generate, review, and manage infrastructure project,
            verification, and contractor performance reports.
          </p>
        </section>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 sm:gap-4">
          {statistics.map((statistic) => {
            const Icon = statistic.icon;

            return (
              <article
                key={statistic.label}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">

                  <div>
                    <p className="text-xs font-medium text-slate-500 sm:text-sm">
                      {statistic.label}
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                      {statistic.value}
                    </p>

                    <p className="mt-2 text-[11px] text-slate-500 sm:text-xs">
                      {statistic.description}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-100 p-2.5 text-slate-600">
                    <Icon size={20} />
                  </div>

                </div>
              </article>
            );
          })}
        </section>

        {/* =================================================
            SEARCH & FILTERS
        ================================================= */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-5">

          <div className="flex items-center gap-2">
            <SlidersHorizontal
              size={17}
              className="text-slate-500"
            />

            <h2 className="text-sm font-semibold text-slate-800">
              Search & Filters
            </h2>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">

            {/* Search */}

            <div className="relative md:col-span-1">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search reports..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Report Type */}

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value)
              }
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">
                All Report Types
              </option>

              <option value="Project Progress">
                Project Progress
              </option>

              <option value="Verification">
                Verification
              </option>

              <option value="Contractor Performance">
                Contractor Performance
              </option>
            </select>

            {/* Status */}

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">
                All Report Statuses
              </option>

              <option value="Ready">
                Ready
              </option>

              <option value="Processing">
                Processing
              </option>
            </select>

          </div>

          {/* Active Filters */}

          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2">

              <span className="text-xs text-slate-500">
                Filters applied
              </span>

              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
              >
                Clear all
                <X size={13} />
              </button>

            </div>
          )}
        </section>

        {/* =================================================
            REPORT REGISTER
        ================================================= */}

        <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:mt-8">

          {/* Header */}

          <div className="flex flex-col gap-2 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

            <div>
              <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                Report Register
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {filteredReports.length} report
                {filteredReports.length !== 1
                  ? "s"
                  : ""}{" "}
                shown
              </p>
            </div>

            {/* Generate Report */}

            <button
              type="button"
              onClick={openGenerateModal}
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
            >
              <FileText size={14} />
              Generate Report
            </button>

          </div>

          {/* =================================================
              DESKTOP TABLE
          ================================================= */}

          <div className="hidden overflow-x-auto lg:block">

            <table className="w-full min-w-[1100px] text-left text-sm">

              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">

                <tr>

                  <th className="px-6 py-4 font-semibold">
                    Report
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Type
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Project
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Generated
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right font-semibold">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <tr
                      key={report.id}
                      className="transition hover:bg-slate-50"
                    >

                      {/* Report */}

                      <td className="px-6 py-5">

                        <div className="flex items-start gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <FileText size={18} />
                          </div>

                          <div>

                            <p className="font-semibold text-slate-900">
                              {report.title}
                            </p>

                            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                              <CalendarDays size={12} />
                              {report.period}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Type */}

                      <td className="px-6 py-5">

                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                            reportTypeStyles[report.type]
                          }`}
                        >
                          {report.type}
                        </span>

                      </td>

                      {/* Project */}

                      <td className="px-6 py-5">

                        <p className="font-medium text-slate-700">
                          {report.project}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {report.location}
                        </p>

                      </td>

                      {/* Generated */}

                      <td className="px-6 py-5">

                        <p className="text-xs font-medium text-slate-700">
                          {report.generatedDate}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          By {report.generatedBy}
                        </p>

                      </td>

                      {/* Status */}

                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                            statusStyles[report.status]
                          }`}
                        >
                          {report.status === "Ready" ? (
                            <CheckCircle2 size={13} />
                          ) : (
                            <Clock3 size={13} />
                          )}

                          {report.status}
                        </span>

                      </td>

                      {/* Action */}

                      <td className="px-6 py-5 text-right">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedReport(report)
                            }
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Eye size={14} />
                            View
                          </button>

                          <button
                            type="button"
                            disabled={report.status !== "Ready"}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Download size={14} />
                            Export
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>

                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center"
                    >

                      <FileText
                        size={24}
                        className="mx-auto text-slate-400"
                      />

                      <p className="mt-3 text-sm font-medium text-slate-700">
                        No reports found
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Try changing your search or filters.
                      </p>

                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>

          {/* =================================================
              MOBILE + TABLET CARDS
          ================================================= */}

          <div className="divide-y divide-slate-100 lg:hidden">

            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <article
                  key={report.id}
                  className="p-4 sm:p-5"
                >

                  {/* Header */}

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex min-w-0 items-start gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <FileText size={18} />
                      </div>

                      <div className="min-w-0">

                        <h3 className="text-sm font-semibold leading-5 text-slate-900">
                          {report.title}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {report.project}
                        </p>

                      </div>

                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                        statusStyles[report.status]
                      }`}
                    >
                      {report.status}
                    </span>

                  </div>

                  {/* Information */}

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">

                    <div>

                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Type
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-700">
                        {report.type}
                      </p>

                    </div>

                    <div>

                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Location
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-700">
                        {report.location}
                      </p>

                    </div>

                    <div>

                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Period
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-700">
                        {report.period}
                      </p>

                    </div>

                    <div>

                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Generated
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-700">
                        {report.generatedDate}
                      </p>

                    </div>

                  </div>

                  {/* Action */}

                  <div className="mt-5 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedReport(report)
                      }
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={14} />
                      View
                    </button>

                    <button
                      type="button"
                      disabled={report.status !== "Ready"}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Download size={14} />
                      Export
                    </button>

                  </div>

                </article>
              ))
            ) : (
              <div className="px-4 py-12 text-center">

                <FileText
                  size={24}
                  className="mx-auto text-slate-400"
                />

                <p className="mt-3 text-sm font-medium text-slate-700">
                  No reports found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Try changing your search or filters.
                </p>

              </div>
            )}

          </div>

        </section>

        {/* =================================================
            SECURITY / DATA NOTE
        ================================================= */}

        <section className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:mt-8">

          <FileText
            size={18}
            className="mt-0.5 shrink-0 text-blue-600"
          />

          <div>

            <p className="text-xs font-semibold text-blue-900 sm:text-sm">
              Secure Reporting
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              Report records are currently mock development data.
              Production reports must be generated through
              authenticated backend services with role-based access
              control, server-side authorization, secure document
              handling, and audit logging.
            </p>

          </div>

        </section>

        {/* =================================================
            REPORT PREVIEW MODAL
        ================================================= */}

        {selectedReport && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
            onClick={() => setSelectedReport(null)}
          >

            <div
              className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white shadow-2xl"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* Modal Header */}

              <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5 sm:p-6">

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FileText size={19} />
                  </div>

                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                      Report Preview
                    </p>

                    <h2 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                      {selectedReport.title}
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedReport(null)
                  }
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Close report preview"
                >
                  <X size={18} />
                </button>

              </div>

              {/* Modal Content */}

              <div className="p-5 sm:p-6">

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Report Type
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedReport.type}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Status
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedReport.status}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Project
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedReport.project}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedReport.location}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Reporting Period
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedReport.period}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Generated By
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedReport.generatedBy}
                    </p>
                  </div>

                </div>

                {/* Future Report Content */}

                <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-4">

                  <p className="text-xs font-semibold text-blue-900">
                    Report Content
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-700">
                    Detailed report content, project metrics,
                    verification evidence, financial information,
                    supporting documents, and audit information
                    will be loaded from the secure backend in the
                    production version.
                  </p>

                </div>

              </div>

              {/* Modal Footer */}

              <div className="flex flex-col-reverse gap-2 border-t border-slate-200 p-5 sm:flex-row sm:justify-end sm:p-6">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedReport(null)
                  }
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Close
                </button>

                <button
                  type="button"
                  disabled={
                    selectedReport.status !== "Ready"
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Download size={14} />
                  Export Report
                </button>

              </div>

            </div>

          </div>
        )}

        {/* =================================================
            GENERATE REPORT MODAL
        ================================================= */}

        {isGenerateModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
            onClick={closeGenerateModal}
          >

            <div
              className="w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-2xl"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* Modal Header */}

              <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5 sm:p-6">

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FileText size={19} />
                  </div>

                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                      Report Generation
                    </p>

                    <h2 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                      Generate New Report
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Select the information required for the report.
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={closeGenerateModal}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Close generate report modal"
                >
                  <X size={18} />
                </button>

              </div>

              {/* Modal Form */}

              <form
                onSubmit={handleGenerateReport}
                className="p-5 sm:p-6"
              >

                <div className="space-y-4">

                  {/* Report Type */}

                  <div>

                    <label
                      htmlFor="reportType"
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                    >
                      Report Type
                    </label>

                    <select
                      id="reportType"
                      defaultValue="Project Progress"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Project Progress">
                        Project Progress
                      </option>

                      <option value="Verification">
                        Verification
                      </option>

                      <option value="Contractor Performance">
                        Contractor Performance
                      </option>
                    </select>

                  </div>

                  {/* Project */}

                  <div>

                    <label
                      htmlFor="reportProject"
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                    >
                      Project
                    </label>

                    <select
                      id="reportProject"
                      defaultValue="Ward 5 Road Improvement"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Ward 5 Road Improvement">
                        Ward 5 Road Improvement
                      </option>

                      <option value="Dhobighat Drainage Project">
                        Dhobighat Drainage Project
                      </option>

                      <option value="Community Building Construction">
                        Community Building Construction
                      </option>

                      <option value="Multiple Projects">
                        Multiple Projects
                      </option>
                    </select>

                  </div>

                  {/* Reporting Period */}

                  <div>

                    <label
                      htmlFor="reportPeriod"
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                    >
                      Reporting Period
                    </label>

                    <select
                      id="reportPeriod"
                      defaultValue="August 2026"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="August 2026">
                        August 2026
                      </option>

                      <option value="July 2026">
                        July 2026
                      </option>

                      <option value="June 2026">
                        June 2026
                      </option>

                      <option value="May 2026">
                        May 2026
                      </option>
                    </select>

                  </div>

                  {/* Date Range */}

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                    <div>

                      <label
                        htmlFor="reportFrom"
                        className="mb-1.5 block text-xs font-semibold text-slate-700"
                      >
                        From Date
                      </label>

                      <input
                        id="reportFrom"
                        type="date"
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />

                    </div>

                    <div>

                      <label
                        htmlFor="reportTo"
                        className="mb-1.5 block text-xs font-semibold text-slate-700"
                      >
                        To Date
                      </label>

                      <input
                        id="reportTo"
                        type="date"
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />

                    </div>

                  </div>

                  {/* Format */}

                  <div>

                    <p className="mb-2 text-xs font-semibold text-slate-700">
                      Report Format
                    </p>

                    <div className="grid grid-cols-2 gap-3">

                      <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 p-3 transition hover:border-blue-200 hover:bg-blue-50">

                        <input
                          type="radio"
                          name="reportFormat"
                          value="PDF"
                          defaultChecked
                          className="accent-blue-600"
                        />

                        <span className="text-xs font-medium text-slate-700">
                          PDF
                        </span>

                      </label>

                      <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 p-3 transition hover:border-blue-200 hover:bg-blue-50">

                        <input
                          type="radio"
                          name="reportFormat"
                          value="Excel"
                          className="accent-blue-600"
                        />

                        <span className="text-xs font-medium text-slate-700">
                          Excel
                        </span>

                      </label>

                    </div>

                  </div>

                </div>

                {/* Success Message */}

                {generationMessage && (
                  <div className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50 p-3">

                    <p className="text-xs font-medium text-emerald-700">
                      {generationMessage}
                    </p>

                  </div>
                )}

                {/* Footer */}

                <div className="mt-6 flex flex-col-reverse gap-2 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">

                  <button
                    type="button"
                    onClick={closeGenerateModal}
                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                  >
                    <FileText size={14} />
                    Generate Report
                  </button>

                </div>

              </form>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}