import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  Users,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MapPin,
  FolderKanban,
  ChevronRight,
  X,
  Building2,
  Phone,
  Mail,
} from "lucide-react";

// =========================================================
// CONTRACTOR RECORDS
// Temporary frontend data.
// This will later be replaced with backend/API data.
// =========================================================

const contractorRecords = [
  {
    id: 1,
    name: "Himalayan Construction Pvt. Ltd.",
    registrationNo: "CON-2026-001",
    location: "Lalitpur",
    contactPerson: "Ramesh Shrestha",
    phone: "+977-9841234567",
    email: "info@himalayanconstruction.com",
    projects: 4,
    activeProjects: 3,
    completedProjects: 1,
    status: "Active",
    rating: 4.6,
  },
  {
    id: 2,
    name: "Everest Infrastructure Pvt. Ltd.",
    registrationNo: "CON-2026-002",
    location: "Kathmandu",
    contactPerson: "Suresh Thapa",
    phone: "+977-9851234567",
    email: "contact@everestinfra.com",
    projects: 3,
    activeProjects: 2,
    completedProjects: 1,
    status: "Active",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Kathmandu Builders Pvt. Ltd.",
    registrationNo: "CON-2026-003",
    location: "Kathmandu",
    contactPerson: "Deepak Karki",
    phone: "+977-9861234567",
    email: "info@ktmbuilders.com",
    projects: 5,
    activeProjects: 3,
    completedProjects: 2,
    status: "At Risk",
    rating: 3.7,
  },
  {
    id: 4,
    name: "Green Valley Engineering",
    registrationNo: "CON-2026-004",
    location: "Bhaktapur",
    contactPerson: "Bikash Adhikari",
    phone: "+977-9871234567",
    email: "info@greenvalleyeng.com",
    projects: 2,
    activeProjects: 2,
    completedProjects: 0,
    status: "Active",
    rating: 4.4,
  },
  {
    id: 5,
    name: "Sagarmatha Builders",
    registrationNo: "CON-2026-005",
    location: "Kathmandu",
    contactPerson: "Anita Shrestha",
    phone: "+977-9881234567",
    email: "contact@sagarmathabuilders.com",
    projects: 3,
    activeProjects: 1,
    completedProjects: 2,
    status: "Suspended",
    rating: 3.1,
  },
  {
    id: 6,
    name: "Bright Nepal Engineering",
    registrationNo: "CON-2026-006",
    location: "Lalitpur",
    contactPerson: "Prakash KC",
    phone: "+977-9801234567",
    email: "info@brightnepal.com",
    projects: 4,
    activeProjects: 3,
    completedProjects: 1,
    status: "Active",
    rating: 4.5,
  },
];

// =========================================================
// STATUS STYLES
// =========================================================

const statusStyles = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",

  "At Risk": "border-amber-200 bg-amber-50 text-amber-700",

  Suspended: "border-red-200 bg-red-50 text-red-700",
};

// =========================================================
// STATISTICS
// =========================================================

const statistics = [
  {
    label: "Total Contractors",
    value: 42,
    description: "Registered contractors",
    icon: Users,
  },
  {
    label: "Active",
    value: 34,
    description: "Currently working",
    icon: CheckCircle2,
  },
  {
    label: "At Risk",
    value: 5,
    description: "Require monitoring",
    icon: AlertTriangle,
  },
  {
    label: "Suspended",
    value: 3,
    description: "Currently suspended",
    icon: XCircle,
  },
];

// =========================================================
// CONTRACTORS PAGE
// =========================================================

export default function Contractors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // =======================================================
  // FILTER CONTRACTORS
  // =======================================================

  const filteredContractors = useMemo(() => {
    return contractorRecords.filter((contractor) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        contractor.name.toLowerCase().includes(search) ||
        contractor.registrationNo.toLowerCase().includes(search) ||
        contractor.location.toLowerCase().includes(search) ||
        contractor.contactPerson.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        contractor.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // =======================================================
  // CLEAR FILTERS
  // =======================================================

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
  };

  const hasActiveFilters =
    searchTerm || statusFilter !== "All";

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
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-blue-600 sm:text-sm">
              Contractor Management
            </p>

            <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
              Contractors
            </h1>

            <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
              Manage registered contractors, monitor their project
              assignments, and track contractor performance.
            </p>
          </div>
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

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

            {/* Search */}

            <div className="relative">
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
                placeholder="Search contractors..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Status Filter */}

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">
                All Contractor Statuses
              </option>

              <option value="Active">
                Active
              </option>

              <option value="At Risk">
                At Risk
              </option>

              <option value="Suspended">
                Suspended
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
            CONTRACTOR REGISTER
        ================================================= */}

        <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:mt-8">

          {/* Section Header */}

          <div className="flex flex-col gap-2 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                Contractor Register
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {filteredContractors.length} contractor
                {filteredContractors.length !== 1 ? "s" : ""} shown
              </p>
            </div>
          </div>

          {/* =================================================
              DESKTOP TABLE
          ================================================= */}

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1100px] text-left text-sm">

              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">
                    Contractor
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Contact
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Projects
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Performance
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

                {filteredContractors.length > 0 ? (
                  filteredContractors.map((contractor) => (
                    <tr
                      key={contractor.id}
                      className="transition hover:bg-slate-50"
                    >

                      {/* Contractor */}

                      <td className="px-6 py-5">
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <Building2 size={18} />
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {contractor.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {contractor.registrationNo}
                            </p>

                            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                              <MapPin size={13} />
                              {contractor.location}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}

                      <td className="px-6 py-5">
                        <p className="font-medium text-slate-700">
                          {contractor.contactPerson}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                          <Phone size={12} />
                          {contractor.phone}
                        </div>

                        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                          <Mail size={12} />
                          {contractor.email}
                        </div>
                      </td>

                      {/* Projects */}

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <FolderKanban
                            size={15}
                            className="text-slate-400"
                          />

                          <span className="font-semibold text-slate-800">
                            {contractor.projects}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          {contractor.activeProjects} active
                        </p>
                      </td>

                      {/* Performance */}

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800">
                            {contractor.rating}
                          </span>

                          <span className="text-xs text-slate-400">
                            / 5.0
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          {contractor.completedProjects} completed
                        </p>
                      </td>

                      {/* Status */}

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                            statusStyles[contractor.status]
                          }`}
                        >
                          {contractor.status}
                        </span>
                      </td>

                      {/* Action */}

                      <td className="px-6 py-5 text-right">
                        <Link
                          to={`/contractors/${contractor.id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          View
                          <ChevronRight size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center"
                    >
                      <p className="text-sm font-medium text-slate-700">
                        No contractors found
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

            {filteredContractors.length > 0 ? (
              filteredContractors.map((contractor) => (
                <article
                  key={contractor.id}
                  className="p-4 sm:p-5"
                >

                  {/* Header */}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <Building2 size={18} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold leading-5 text-slate-900">
                          {contractor.name}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {contractor.registrationNo}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                          <MapPin size={13} />
                          {contractor.location}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                        statusStyles[contractor.status]
                      }`}
                    >
                      {contractor.status}
                    </span>
                  </div>

                  {/* Information */}

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Contact
                      </p>

                      <p className="mt-1 truncate text-xs font-medium text-slate-700">
                        {contractor.contactPerson}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Projects
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-700">
                        {contractor.projects}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Active
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-700">
                        {contractor.activeProjects}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Rating
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-700">
                        {contractor.rating} / 5
                      </p>
                    </div>

                  </div>

                  {/* Contact Details */}

                  <div className="mt-4 rounded-lg bg-slate-50 p-3">
                    <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:gap-5">
                      <span className="flex items-center gap-1.5">
                        <Phone size={13} />
                        {contractor.phone}
                      </span>

                      <span className="flex items-center gap-1.5 truncate">
                        <Mail size={13} />
                        {contractor.email}
                      </span>
                    </div>
                  </div>

                  {/* Action */}

                  <div className="mt-5 flex items-center justify-end border-t border-slate-100 pt-4">
                    <Link
                      to={`/contractors/${contractor.id}`}
                      className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      View Contractor
                      <ChevronRight size={14} />
                    </Link>
                  </div>

                </article>
              ))
            ) : (
              <div className="px-4 py-12 text-center">
                <p className="text-sm font-medium text-slate-700">
                  No contractors found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}

          </div>
        </section>

        {/* =================================================
            INFORMATION NOTE
        ================================================= */}

        <section className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:mt-8">
          <Users
            size={18}
            className="mt-0.5 shrink-0 text-blue-600"
          />

          <div>
            <p className="text-xs font-semibold text-blue-900 sm:text-sm">
              Contractor Monitoring
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              Contractor records will later connect with project
              assignments, verification history, contract information,
              performance metrics, compliance records, and backend
              monitoring data.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}