import { NavLink } from "react-router-dom";
import {
  FolderKanban,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

const statistics = [
  {
    title: "Total Projects",
    value: "42",
    description: "Currently monitored",
    icon: FolderKanban,
  },
  {
    title: "On Track",
    value: "27",
    description: "Projects progressing normally",
    icon: CheckCircle2,
  },
  {
    title: "At Risk",
    value: "8",
    description: "Require attention",
    icon: AlertTriangle,
  },
  {
    title: "Delayed",
    value: "7",
    description: "Past expected milestone",
    icon: Clock3,
  },
];

const projects = [
  {
    name: "Ward 5 Road Improvement",
    location: "Lalitpur",
    progress: 72,
    status: "On Track",
    statusStyle: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Dhobighat Drainage Project",
    location: "Lalitpur",
    progress: 48,
    status: "At Risk",
    statusStyle: "bg-amber-100 text-amber-700",
  },
  {
    name: "Community Building Construction",
    location: "Kathmandu",
    progress: 31,
    status: "Delayed",
    statusStyle: "bg-red-100 text-red-700",
  },
];

const projectStatusSummary = [
  {
    label: "On Track",
    count: 27,
    percentage: 64,
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
  },
  {
    label: "At Risk",
    count: 8,
    percentage: 19,
    dot: "bg-amber-500",
    bar: "bg-amber-500",
  },
  {
    label: "Delayed",
    count: 7,
    percentage: 17,
    dot: "bg-red-500",
    bar: "bg-red-500",
  },
];

const upcomingMilestones = [
  {
    project: "Ward 5 Road Improvement",
    milestone: "Road base completion",
    due: "2 days",
    progress: 80,
    priority: "High",
    priorityStyle: "bg-red-100 text-red-700",
  },
  {
    project: "Dhobighat Drainage Project",
    milestone: "Pipeline installation",
    due: "5 days",
    progress: 60,
    priority: "Medium",
    priorityStyle: "bg-amber-100 text-amber-700",
  },
  {
    project: "Community Building Construction",
    milestone: "Foundation completion",
    due: "9 days",
    progress: 45,
    priority: "Normal",
    priorityStyle: "bg-emerald-100 text-emerald-700",
  },
];

export default function Dashboard() {
  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-[1800px] p-4 sm:p-5 md:p-6 lg:p-8">

        {/* Page Header */}
        <section className="mb-6 sm:mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-blue-600 sm:text-sm">
            Infrastructure Monitoring
          </p>

          <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
            Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
            Overview of monitored public infrastructure projects.
          </p>
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          {statistics.map((statistic) => {
            const Icon = statistic.icon;

            return (
              <article
                key={statistic.title}
                className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-500 sm:text-sm">
                      {statistic.title}
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                      {statistic.value}
                    </p>
                  </div>

                  <div className="shrink-0 rounded-lg bg-slate-100 p-2 text-slate-700 sm:p-2.5">
                    <Icon size={19} className="sm:h-[21px] sm:w-[21px]" />
                  </div>
                </div>

                <p className="mt-3 text-[11px] leading-4 text-slate-500 sm:mt-4 sm:text-xs">
                  {statistic.description}
                </p>
              </article>
            );
          })}
        </section>

        {/* Project Status Overview */}
        <section className="mt-6 sm:mt-8">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
              Project Status Overview
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Current health of monitored infrastructure projects.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {projectStatusSummary.map((status) => (
              <article
                key={status.label}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${status.dot}`}
                    />

                    <span className="truncate text-xs font-medium text-slate-600 sm:text-sm">
                      {status.label}
                    </span>
                  </div>

                  <span className="text-lg font-bold text-slate-900 sm:text-xl">
                    {status.count}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${status.bar}`}
                      style={{
                        width: `${status.percentage}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-[11px] text-slate-400 sm:text-xs">
                    {status.percentage}% of monitored projects
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Upcoming Milestones */}
        <section className="mt-6 sm:mt-8">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
              Upcoming Milestones
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Construction milestones requiring attention in the coming days.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {upcomingMilestones.map((milestone, index) => (
              <article
                key={milestone.project}
                className={`p-4 sm:p-5 ${
                  index !== upcomingMilestones.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  {/* Project Information */}
                  <div className="min-w-0 lg:w-5/12">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {milestone.project}
                      </h3>

                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${milestone.priorityStyle}`}
                      >
                        {milestone.priority}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      {milestone.milestone}
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="w-full lg:w-4/12">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-slate-500">
                        Current progress
                      </span>

                      <span className="text-xs font-semibold text-slate-700">
                        {milestone.progress}%
                      </span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{
                          width: `${milestone.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Target */}
                  <div className="flex items-center justify-between gap-4 lg:w-2/12 lg:justify-end">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                        Target
                      </p>

                      <p className="mt-0.5 text-xs font-semibold text-slate-700">
                        Due in {milestone.due}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                    >
                      View
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Project Monitoring */}
        <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:mt-8">

          {/* Section Header */}
          <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                Project Monitoring
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Current status of selected infrastructure projects.
              </p>
            </div>

            <button
              type="button"
              className="flex w-fit items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
            >
              View All
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Desktop / Tablet Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold lg:px-6">
                    Project
                  </th>

                  <th className="px-5 py-4 font-semibold lg:px-6">
                    Location
                  </th>

                  <th className="px-5 py-4 font-semibold lg:px-6">
                    Progress
                  </th>

                  <th className="px-5 py-4 font-semibold lg:px-6">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {projects.map((project) => (
                  <tr
                    key={project.name}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-medium text-slate-900 lg:px-6">
                      {project.name}
                    </td>

                    <td className="px-5 py-4 text-slate-500 lg:px-6">
                      {project.location}
                    </td>

                    <td className="px-5 py-4 lg:px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{
                              width: `${project.progress}%`,
                            }}
                          />
                        </div>

                        <span className="text-xs font-medium text-slate-600">
                          {project.progress}%
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 lg:px-6">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${project.statusStyle}`}
                      >
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Project Cards */}
          <div className="divide-y divide-slate-100 md:hidden">
            {projects.map((project) => (
              <article
                key={project.name}
                className="p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-5 text-slate-900">
                      {project.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {project.location}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium ${project.statusStyle}`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">
                      Progress
                    </span>

                    <span className="text-xs font-semibold text-slate-700">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}