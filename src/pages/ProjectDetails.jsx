import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  Building2,
  User,
  Wallet,
  CheckCircle2,
  AlertTriangle,
  Clock3,
} from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Ward 5 Road Improvement",
    location: "Lalitpur",
    ward: "Ward 5",
    type: "Road",
    budget: "Rs. 2.40 Cr",
    contractor: "Himalayan Construction Pvt. Ltd.",
    engineer: "Ram Sharma",
    progress: 72,
    status: "On Track",
    startDate: "2026-04-15",
    completionDate: "2026-12-20",
  },
  {
    id: 2,
    name: "Dhobighat Drainage Project",
    location: "Lalitpur",
    ward: "Ward 3",
    type: "Drainage",
    budget: "Rs. 1.85 Cr",
    contractor: "Everest Infrastructure Pvt. Ltd.",
    engineer: "Sita Thapa",
    progress: 48,
    status: "At Risk",
    startDate: "2026-03-10",
    completionDate: "2026-10-30",
  },
  {
    id: 3,
    name: "Community Building Construction",
    location: "Kathmandu",
    ward: "Ward 8",
    type: "Building",
    budget: "Rs. 3.20 Cr",
    contractor: "Kathmandu Builders Pvt. Ltd.",
    engineer: "Hari Karki",
    progress: 31,
    status: "Delayed",
    startDate: "2026-02-01",
    completionDate: "2026-09-15",
  },
  {
    id: 4,
    name: "Ward 7 Drinking Water Pipeline",
    location: "Bhaktapur",
    ward: "Ward 7",
    type: "Water Supply",
    budget: "Rs. 1.45 Cr",
    contractor: "Green Valley Engineering",
    engineer: "Bikash Adhikari",
    progress: 64,
    status: "On Track",
    startDate: "2026-05-05",
    completionDate: "2026-11-25",
  },
  {
    id: 5,
    name: "Municipal Health Post Construction",
    location: "Kathmandu",
    ward: "Ward 12",
    type: "Building",
    budget: "Rs. 4.10 Cr",
    contractor: "Sagarmatha Builders",
    engineer: "Anita Shrestha",
    progress: 22,
    status: "Delayed",
    startDate: "2026-01-20",
    completionDate: "2026-08-30",
  },
  {
    id: 6,
    name: "Ward 2 Street Lighting Project",
    location: "Lalitpur",
    ward: "Ward 2",
    type: "Electrical",
    budget: "Rs. 92 Lakh",
    contractor: "Bright Nepal Engineering",
    engineer: "Prakash KC",
    progress: 83,
    status: "On Track",
    startDate: "2026-05-20",
    completionDate: "2026-09-30",
  },
];

const statusStyles = {
  "On Track": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "At Risk": "bg-amber-50 text-amber-700 border-amber-200",
  Delayed: "bg-red-50 text-red-700 border-red-200",
};

function StatusIcon({ status }) {
  if (status === "On Track") {
    return <CheckCircle2 size={16} />;
  }

  if (status === "At Risk") {
    return <AlertTriangle size={16} />;
  }

  return <Clock3 size={16} />;
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

export default function ProjectDetails() {
  const { id } = useParams();

  const project = projects.find(
    (item) => item.id === Number(id)
  );

  if (!project) {
    return (
      <main className="w-full">
        <div className="mx-auto w-full max-w-[1800px] p-4 sm:p-5 md:p-6 lg:p-8">
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-lg font-bold text-slate-900">
              Project Not Found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              The requested project could not be found.
            </p>

            <Link
              to="/projects"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <ArrowLeft size={16} />
              Back to Projects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-[1800px] p-4 sm:p-5 md:p-6 lg:p-8">

        {/* Page Header */}
        <section className="mb-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-blue-600 sm:text-sm"
          >
            <ArrowLeft size={15} />
            Back to Projects
          </Link>

          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-blue-600 sm:text-sm">
                Infrastructure Project
              </p>

              <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
                {project.name}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <MapPin size={15} />
                  {project.location}
                </span>

                <span>•</span>

                <span>{project.ward}</span>

                <span>•</span>

                <span>{project.type} Project</span>
              </div>
            </div>

            <span
              className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles[project.status]}`}
            >
              <StatusIcon status={project.status} />
              {project.status}
            </span>
          </div>
        </section>

        {/* Progress */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Overall Progress
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                {project.progress}%
              </p>
            </div>

            <p className="text-xs text-slate-500">
              Project completion progress
            </p>
          </div>

          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${project.progress}%`,
              }}
            />
          </div>
        </section>

        {/* Project Information */}
        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
              Project Information
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Basic administrative and project information.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <InfoItem
              icon={Wallet}
              label="Project Budget"
              value={project.budget}
            />

            <InfoItem
              icon={Building2}
              label="Contractor"
              value={project.contractor}
            />

            <InfoItem
              icon={User}
              label="Project Engineer"
              value={project.engineer}
            />

            <InfoItem
              icon={MapPin}
              label="Location"
              value={`${project.location}, ${project.ward}`}
            />
          </div>
        </section>

        {/* Timeline */}
        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
              Project Timeline
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Planned project schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoItem
              icon={CalendarDays}
              label="Start Date"
              value={project.startDate}
            />

            <InfoItem
              icon={CalendarDays}
              label="Expected Completion"
              value={project.completionDate}
            />
          </div>
        </section>

        {/* Future Modules */}
        <section className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <Building2
              size={18}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <div>
              <p className="text-xs font-semibold text-blue-900 sm:text-sm">
                Project Monitoring Workspace
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-700">
                This project workspace will later contain milestones,
                verification records, field evidence, financial progress,
                contractor information, and AI monitoring results.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}