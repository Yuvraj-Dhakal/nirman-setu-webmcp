import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ClipboardCheck,
  CheckCircle2,
  Clock3,
  XCircle,
  MapPin,
  CalendarDays,
  ChevronRight,
  X,
} from "lucide-react";

const verificationRecords = [
  {
    id: 1,
    project: "Ward 5 Road Improvement",
    location: "Lalitpur",
    type: "Milestone Verification",
    submittedBy: "Ram Sharma",
    submittedDate: "2026-08-20",
    milestone: "Road base completion",
    status: "Pending",
  },
  {
    id: 2,
    project: "Dhobighat Drainage Project",
    location: "Lalitpur",
    type: "Field Verification",
    submittedBy: "Sita Thapa",
    submittedDate: "2026-08-18",
    milestone: "Pipeline installation",
    status: "Under Review",
  },
  {
    id: 3,
    project: "Community Building Construction",
    location: "Kathmandu",
    type: "Milestone Verification",
    submittedBy: "Hari Karki",
    submittedDate: "2026-08-15",
    milestone: "Foundation completion",
    status: "Rejected",
  },
  {
    id: 4,
    project: "Ward 7 Drinking Water Pipeline",
    location: "Bhaktapur",
    type: "Field Verification",
    submittedBy: "Bikash Adhikari",
    submittedDate: "2026-08-12",
    milestone: "Pipeline laying",
    status: "Verified",
  },
  {
    id: 5,
    project: "Municipal Health Post Construction",
    location: "Kathmandu",
    type: "Milestone Verification",
    submittedBy: "Anita Shrestha",
    submittedDate: "2026-08-10",
    milestone: "Structural work",
    status: "Pending",
  },
  {
    id: 6,
    project: "Ward 2 Street Lighting Project",
    location: "Lalitpur",
    type: "Field Verification",
    submittedBy: "Prakash KC",
    submittedDate: "2026-08-08",
    milestone: "Lighting installation",
    status: "Verified",
  },
];

const statusStyles = {
  Pending:
    "border-amber-200 bg-amber-50 text-amber-700",

  "Under Review":
    "border-blue-200 bg-blue-50 text-blue-700",

  Verified:
    "border-emerald-200 bg-emerald-50 text-emerald-700",

  Rejected:
    "border-red-200 bg-red-50 text-red-700",
};

const statistics = [
  {
    label: "Total Requests",
    value: 24,
    description: "Verification records",
    icon: ClipboardCheck,
  },
  {
    label: "Pending",
    value: 7,
    description: "Awaiting verification",
    icon: Clock3,
  },
  {
    label: "Verified",
    value: 14,
    description: "Successfully verified",
    icon: CheckCircle2,
  },
  {
    label: "Rejected",
    value: 3,
    description: "Require correction",
    icon: XCircle,
  },
];

export default function Verification() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredRecords = useMemo(() => {
    return verificationRecords.filter((record) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        record.project.toLowerCase().includes(search) ||
        record.location.toLowerCase().includes(search) ||
        record.submittedBy.toLowerCase().includes(search) ||
        record.milestone.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        record.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        record.type === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [searchTerm, statusFilter, typeFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setTypeFilter("All");
  };

  const hasActiveFilters =
    searchTerm ||
    statusFilter !== "All" ||
    typeFilter !== "All";

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-[1800px] p-4 sm:p-5 md:p-6 lg:p-8">

        {/* =========================================================
            PAGE HEADER
        ========================================================= */}

        <section className="mb-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-blue-600 sm:text-sm">
              Project Quality & Accountability
            </p>

            <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
              Verification
            </h1>

            <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
              Review field submissions, milestone evidence, and
              verification records for monitored infrastructure projects.
            </p>
          </div>
        </section>

        {/* =========================================================
            STATISTICS
        ========================================================= */}

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

        {/* =========================================================
            SEARCH & FILTERS
        ========================================================= */}

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

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

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
                placeholder="Search verification records..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Status */}

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Statuses</option>

              <option value="Pending">Pending</option>

              <option value="Under Review">
                Under Review
              </option>

              <option value="Verified">Verified</option>

              <option value="Rejected">Rejected</option>
            </select>

            {/* Type */}

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value)
              }
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">
                All Verification Types
              </option>

              <option value="Milestone Verification">
                Milestone Verification
              </option>

              <option value="Field Verification">
                Field Verification
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

        {/* =========================================================
            VERIFICATION REGISTER
        ========================================================= */}

        <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:mt-8">

          {/* Section Header */}

          <div className="flex flex-col gap-2 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                Verification Register
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {filteredRecords.length} verification record
                {filteredRecords.length !== 1 ? "s" : ""} shown
              </p>
            </div>
          </div>

          {/* =======================================================
              DESKTOP TABLE
          ======================================================= */}

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">
                    Project
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Verification
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Submitted By
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Date
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
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="transition hover:bg-slate-50"
                    >
                      {/* Project */}

                      <td className="px-6 py-5">
                        <p className="font-semibold text-slate-900">
                          {record.project}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                          <MapPin size={13} />
                          {record.location}
                        </div>
                      </td>

                      {/* Verification */}

                      <td className="px-6 py-5">
                        <p className="font-medium text-slate-800">
                          {record.milestone}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {record.type}
                        </p>
                      </td>

                      {/* Submitted By */}

                      <td className="px-6 py-5">
                        <p className="text-slate-700">
                          {record.submittedBy}
                        </p>
                      </td>

                      {/* Date */}

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-slate-600">
                          <CalendarDays
                            size={14}
                            className="text-slate-400"
                          />

                          <span>
                            {record.submittedDate}
                          </span>
                        </div>
                      </td>

                      {/* Status */}

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[record.status]}`}
                        >
                          {record.status}
                        </span>
                      </td>

                      {/* Action */}

                      <td className="px-6 py-5 text-right">
                        <Link
                          to={`/verification/${record.id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          Review
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
                        No verification records found
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

          {/* =======================================================
              MOBILE + TABLET CARDS
          ======================================================= */}

          <div className="divide-y divide-slate-100 lg:hidden">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <article
                  key={record.id}
                  className="p-4 sm:p-5"
                >
                  {/* Header */}

                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold leading-5 text-slate-900">
                        {record.project}
                      </h3>

                      <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin size={13} />
                        {record.location}
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium ${statusStyles[record.status]}`}
                    >
                      {record.status}
                    </span>
                  </div>

                  {/* Information */}

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Type
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-700">
                        {record.type}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Milestone
                      </p>

                      <p className="mt-1 truncate text-xs font-medium text-slate-700">
                        {record.milestone}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Submitted By
                      </p>

                      <p className="mt-1 truncate text-xs font-medium text-slate-700">
                        {record.submittedBy}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Date
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-700">
                        {record.submittedDate}
                      </p>
                    </div>
                  </div>

                  {/* Action */}

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <CalendarDays size={14} />

                      <span>
                        Submitted{" "}
                        <span className="font-medium text-slate-700">
                          {record.submittedDate}
                        </span>
                      </span>
                    </div>

                    <Link
                      to={`/verification/${record.id}`}
                      className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Review
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className="px-4 py-12 text-center">
                <p className="text-sm font-medium text-slate-700">
                  No verification records found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================
            INFORMATION NOTE
        ========================================================= */}

        <section className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:mt-8">
          <ClipboardCheck
            size={18}
            className="mt-0.5 shrink-0 text-blue-600"
          />

          <div>
            <p className="text-xs font-semibold text-blue-900 sm:text-sm">
              Verification Workflow
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              Verification records will later connect field evidence,
              milestone submissions, engineer reviews, approval history,
              and project progress. This will provide an auditable
              verification trail for every monitored project.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}