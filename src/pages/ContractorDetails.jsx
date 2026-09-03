import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  MapPin,
  User,
  Phone,
  Mail,
  FolderKanban,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Star,
} from "lucide-react";

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

const statusStyles = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "At Risk": "border-amber-200 bg-amber-50 text-amber-700",
  Suspended: "border-red-200 bg-red-50 text-red-700",
};

function StatusIcon({ status }) {
  if (status === "Active") {
    return <CheckCircle2 size={16} />;
  }

  if (status === "At Risk") {
    return <AlertTriangle size={16} />;
  }

  return <XCircle size={16} />;
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon size={16} />

        <p className="text-[10px] font-semibold uppercase tracking-wide">
          {label}
        </p>
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

export default function ContractorDetails() {
  const { id } = useParams();

  const contractor = contractorRecords.find(
    (record) => record.id === Number(id)
  );

  if (!contractor) {
    return (
      <main className="w-full">
        <div className="mx-auto w-full max-w-[1800px] p-4 sm:p-5 md:p-6 lg:p-8">
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Building2 size={22} />
            </div>

            <h1 className="mt-4 text-lg font-bold text-slate-900">
              Contractor Not Found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              The requested contractor could not be found.
            </p>

            <Link
              to="/contractors"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <ArrowLeft size={16} />
              Back to Contractors
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-[1800px] p-4 sm:p-5 md:p-6 lg:p-8">

        {/* =========================================================
            PAGE HEADER
        ========================================================= */}

        <section className="mb-6">
          <Link
            to="/contractors"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-blue-600 sm:text-sm"
          >
            <ArrowLeft size={15} />
            Back to Contractors
          </Link>

          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-blue-600 sm:text-sm">
                Contractor Profile
              </p>

              <div className="mt-2 flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Building2 size={24} />
                </div>

                <div>
                  <h1 className="text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
                    {contractor.name}
                  </h1>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 sm:text-sm">
                    <span>{contractor.registrationNo}</span>

                    <span>•</span>

                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} />
                      {contractor.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <span
              className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                statusStyles[contractor.status]
              }`}
            >
              <StatusIcon status={contractor.status} />
              {contractor.status}
            </span>
          </div>
        </section>

        {/* =========================================================
            CONTRACTOR SUMMARY
        ========================================================= */}

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <InfoItem
            icon={FolderKanban}
            label="Total Projects"
            value={contractor.projects}
          />

          <InfoItem
            icon={CheckCircle2}
            label="Active Projects"
            value={contractor.activeProjects}
          />

          <InfoItem
            icon={CheckCircle2}
            label="Completed Projects"
            value={contractor.completedProjects}
          />

          <InfoItem
            icon={Star}
            label="Performance Rating"
            value={`${contractor.rating} / 5.0`}
          />
        </section>

        {/* =========================================================
            CONTACT INFORMATION
        ========================================================= */}

        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
              Contact Information
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Registered contractor contact information.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <InfoItem
              icon={User}
              label="Contact Person"
              value={contractor.contactPerson}
            />

            <InfoItem
              icon={Phone}
              label="Phone"
              value={contractor.phone}
            />

            <InfoItem
              icon={Mail}
              label="Email"
              value={contractor.email}
            />

            <InfoItem
              icon={MapPin}
              label="Location"
              value={contractor.location}
            />
          </div>
        </section>

        {/* =========================================================
            PROJECT PERFORMANCE
        ========================================================= */}

        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
              Project Performance
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Current contractor project performance overview.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">

              <div>
                <p className="text-xs text-slate-500">
                  Total Assigned
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {contractor.projects}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Active
                </p>

                <p className="mt-1 text-2xl font-bold text-emerald-600">
                  {contractor.activeProjects}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Completed
                </p>

                <p className="mt-1 text-2xl font-bold text-blue-600">
                  {contractor.completedProjects}
                </p>
              </div>

            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-600">
                  Completion Rate
                </p>

                <p className="text-xs font-semibold text-slate-800">
                  {contractor.projects > 0
                    ? Math.round(
                        (contractor.completedProjects /
                          contractor.projects) *
                          100
                      )
                    : 0}
                  %
                </p>
              </div>

              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{
                    width: `${
                      contractor.projects > 0
                        ? (contractor.completedProjects /
                            contractor.projects) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            PERFORMANCE RATING
        ========================================================= */}

        <section className="mt-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Contractor Performance
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <Star
                    size={22}
                    className="text-amber-500"
                  />

                  <span className="text-2xl font-bold text-slate-900">
                    {contractor.rating}
                  </span>

                  <span className="text-sm text-slate-400">
                    / 5.0
                  </span>
                </div>
              </div>

              <div
                className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                  statusStyles[contractor.status]
                }`}
              >
                <StatusIcon status={contractor.status} />
                {contractor.status}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FUTURE MODULE
        ========================================================= */}

        <section className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <Building2
              size={18}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <div>
              <p className="text-xs font-semibold text-blue-900 sm:text-sm">
                Contractor Monitoring Workspace
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-700">
                This workspace will later connect contractor projects,
                contract documents, verification history, compliance
                records, performance trends, payment information, and
                backend monitoring data.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}