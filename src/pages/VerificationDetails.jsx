import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  MapPin,
  CalendarDays,
  User,
  Building2,
  FileCheck2,
} from "lucide-react";

// =========================================================
// VERIFICATION RECORDS
// Temporary frontend data.
// This will later be replaced with backend/API data.
// =========================================================

const verificationRecords = [
  {
    id: 1,
    project: "Ward 5 Road Improvement",
    location: "Lalitpur",
    ward: "Ward 5",
    contractor: "Himalayan Construction Pvt. Ltd.",
    verifier: "Ram Sharma",
    verificationDate: "2026-08-20",
    status: "Verified",
    progress: 72,
    remarks:
      "Construction progress matches the submitted field evidence.",
  },
  {
    id: 2,
    project: "Dhobighat Drainage Project",
    location: "Lalitpur",
    ward: "Ward 3",
    contractor: "Everest Infrastructure Pvt. Ltd.",
    verifier: "Sita Thapa",
    verificationDate: "2026-08-18",
    status: "Under Review",
    progress: 48,
    remarks:
      "Reported progress requires additional field evidence.",
  },
  {
    id: 3,
    project: "Community Building Construction",
    location: "Kathmandu",
    ward: "Ward 8",
    contractor: "Kathmandu Builders Pvt. Ltd.",
    verifier: "Hari Karki",
    verificationDate: "2026-08-15",
    status: "Pending",
    progress: 31,
    remarks:
      "Verification is waiting for the next field inspection.",
  },
];

// =========================================================
// STATUS STYLES
// =========================================================

const statusStyles = {
  Verified:
    "border-emerald-200 bg-emerald-50 text-emerald-700",

  "Under Review":
    "border-amber-200 bg-amber-50 text-amber-700",

  Pending:
    "border-slate-200 bg-slate-50 text-slate-600",

  Rejected:
    "border-red-200 bg-red-50 text-red-700",
};

// =========================================================
// STATUS ICON
// =========================================================

function StatusIcon({ status }) {
  if (status === "Verified") {
    return <CheckCircle2 size={16} />;
  }

  if (status === "Under Review") {
    return <AlertTriangle size={16} />;
  }

  return <Clock3 size={16} />;
}

// =========================================================
// INFORMATION ITEM
// =========================================================

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

// =========================================================
// VERIFICATION DETAILS PAGE
// =========================================================

export default function VerificationDetails() {
  const { id } = useParams();

  // Find the verification record based on URL parameter.
  const verification = verificationRecords.find(
    (record) => record.id === Number(id)
  );

  // =======================================================
  // RECORD NOT FOUND
  // =======================================================

  if (!verification) {
    return (
      <main className="w-full">
        <div className="mx-auto w-full max-w-[1800px] p-4 sm:p-5 md:p-6 lg:p-8">
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            {/* Error Icon */}

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <FileCheck2 size={22} />
            </div>

            {/* Error Title */}

            <h1 className="mt-4 text-lg font-bold text-slate-900">
              Verification Record Not Found
            </h1>

            {/* Error Description */}

            <p className="mt-2 text-sm text-slate-500">
              The requested verification record could not be found.
            </p>

            {/* Back Button */}

            <Link
              to="/verification"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <ArrowLeft size={16} />
              Back to Verification
            </Link>
          </div>
        </div>
      </main>
    );
  }

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
          {/* Back Navigation */}

          <Link
            to="/verification"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-blue-600 sm:text-sm"
          >
            <ArrowLeft size={15} />
            Back to Verification
          </Link>

          {/* Header Content */}

          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-blue-600 sm:text-sm">
                Verification Record
              </p>

              <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
                {verification.project}
              </h1>

              {/* Location */}

              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <MapPin size={15} />
                  {verification.location}
                </span>

                <span>•</span>

                <span>{verification.ward}</span>
              </div>
            </div>

            {/* Status */}

            <span
              className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                statusStyles[verification.status]
              }`}
            >
              <StatusIcon status={verification.status} />

              {verification.status}
            </span>
          </div>
        </section>

        {/* =================================================
            VERIFICATION PROGRESS
        ================================================= */}

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Verified Project Progress
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                {verification.progress}%
              </p>
            </div>

            <p className="text-xs text-slate-500">
              Progress reported during verification
            </p>
          </div>

          {/* Progress Bar */}

          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${verification.progress}%`,
              }}
            />
          </div>
        </section>

        {/* =================================================
            VERIFICATION INFORMATION
        ================================================= */}

        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
              Verification Information
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Administrative details associated with this verification
              record.
            </p>
          </div>

          {/* Information Cards */}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <InfoItem
              icon={Building2}
              label="Contractor"
              value={verification.contractor}
            />

            <InfoItem
              icon={User}
              label="Verified By"
              value={verification.verifier}
            />

            <InfoItem
              icon={CalendarDays}
              label="Verification Date"
              value={verification.verificationDate}
            />

            <InfoItem
              icon={MapPin}
              label="Location"
              value={`${verification.location}, ${verification.ward}`}
            />
          </div>
        </section>

        {/* =================================================
            VERIFICATION REMARKS
        ================================================= */}

        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
              Verification Remarks
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Notes recorded during the verification process.
            </p>
          </div>

          {/* Remarks Card */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <FileCheck2
                size={18}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <p className="text-sm leading-6 text-slate-600">
                {verification.remarks}
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            FUTURE FIELD EVIDENCE MODULE
        ================================================= */}

        <section className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <FileCheck2
              size={18}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <div>
              <p className="text-xs font-semibold text-blue-900 sm:text-sm">
                Field Evidence Workspace
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-700">
                This section will later contain field photographs,
                verification documents, GPS information, inspection
                history, and verification decisions from the backend.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}