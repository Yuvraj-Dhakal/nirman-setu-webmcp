import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  ChevronDown,
  CirclePlus,
  Eye,
  Filter,
  Loader2,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { createProject, getProjects } from "../api/projectApi";

/* -------------------------------------------------------------------------- */
/* Demo data                                                                  */
/* -------------------------------------------------------------------------- */

const demoProjects = [
  {
    id: 1,
    name: "Kathmandu Ring Road Expansion",
    location: "Kathmandu",
    contractor: "ABC Construction Pvt. Ltd.",
    status: "On Track",
    budget: "Rs. 25,00,00,000",
    progress: 45,
    ward: "Ward 4",
    type: "Road",
    engineer: "Er. Raj Sharma",
    startDate: "2026-01-15",
    completionDate: "2027-06-30",
  },
  {
    id: 2,
    name: "Lalitpur Drainage Improvement",
    location: "Lalitpur",
    contractor: "Himalayan Infrastructure",
    status: "At Risk",
    budget: "Rs. 8,50,00,000",
    progress: 38,
    ward: "Ward 10",
    type: "Drainage",
    engineer: "Er. Suman Karki",
    startDate: "2026-02-10",
    completionDate: "2026-12-20",
  },
  {
    id: 3,
    name: "Bhaktapur Municipal Building",
    location: "Bhaktapur",
    contractor: "Everest Builders Pvt. Ltd.",
    status: "Delayed",
    budget: "Rs. 12,00,00,000",
    progress: 31,
    ward: "Ward 6",
    type: "Building",
    engineer: "Er. Anil Shrestha",
    startDate: "2025-11-01",
    completionDate: "2026-08-15",
  },
  {
    id: 4,
    name: "Melamchi Water Supply Extension",
    location: "Kathmandu",
    contractor: "Nepal Water Infrastructure",
    status: "On Track",
    budget: "Rs. 18,75,00,000",
    progress: 67,
    ward: "Ward 15",
    type: "Water Supply",
    engineer: "Er. Bikash Thapa",
    startDate: "2025-09-15",
    completionDate: "2027-01-30",
  },
  {
    id: 5,
    name: "Koteshwor Road Rehabilitation",
    location: "Kathmandu",
    contractor: "Metro Road Works",
    status: "Delayed",
    budget: "Rs. 9,20,00,000",
    progress: 52,
    ward: "Ward 32",
    type: "Road",
    engineer: "Er. Prakash Gurung",
    startDate: "2025-12-01",
    completionDate: "2026-07-30",
  },
  {
    id: 6,
    name: "Community Health Center",
    location: "Kirtipur",
    contractor: "National Builders Nepal",
    status: "At Risk",
    budget: "Rs. 6,40,00,000",
    progress: 44,
    ward: "Ward 7",
    type: "Building",
    engineer: "Er. Deepak Adhikari",
    startDate: "2026-03-01",
    completionDate: "2027-02-28",
  },
];

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const statusStyles = {
  "On Track": {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
  },
  "At Risk": {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
  },
  Delayed: {
    badge: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
    bar: "bg-red-500",
  },
};

const formatStatus = (status) => {
  if (!status) return "On Track";

  const normalized = String(status).toLowerCase().replace(/[_-]/g, " ");

  if (normalized.includes("delay")) return "Delayed";
  if (normalized.includes("risk")) return "At Risk";
  if (
    normalized.includes("track") ||
    normalized.includes("progress") ||
    normalized.includes("ongoing")
  ) {
    return "On Track";
  }

  return status;
};

const backendStatus = (status) => {
  if (status === "Delayed") return "DELAYED";
  if (status === "At Risk") return "AT_RISK";
  return "ON_TRACK";
};

const formatBudget = (budget) => {
  if (budget === null || budget === undefined || budget === "") {
    return "Rs. 0";
  }

  if (typeof budget === "number") {
    return `Rs. ${budget.toLocaleString("en-IN")}`;
  }

  return String(budget);
};

const normalizeProject = (project) => {
  const progressValue =
    project.completionPercentage ??
    project.progress ??
    project.completion ??
    0;

  return {
    ...project,
    id: project.id ?? project.projectId,
    name: project.name ?? project.projectName ?? "Unnamed Project",
    location: project.location ?? project.address ?? "Unknown",
    contractor: project.contractor ?? "Not Assigned",
    status: formatStatus(project.status),
    budget: formatBudget(project.budget),
    progress: Number(progressValue) || 0,
    ward: project.ward ?? "N/A",
    type: project.type ?? project.projectType ?? "Infrastructure",
    engineer: project.engineer ?? "Not Assigned",
    startDate: project.startDate ?? "",
    completionDate: project.completionDate ?? "",
  };
};

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function Projects() {
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [backendAvailable, setBackendAvailable] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [wardFilter, setWardFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const [projectForm, setProjectForm] = useState({
    name: "",
    location: "",
    contractor: "",
    status: "On Track",
    budget: "",
    progress: "",
  });

  /* ------------------------------------------------------------------------ */
  /* Load projects                                                            */
  /* ------------------------------------------------------------------------ */

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProjects();

      const normalizedProjects = Array.isArray(data)
        ? data.map(normalizeProject)
        : [];

      setProjectList(normalizedProjects);
      setBackendAvailable(true);
    } catch (err) {
      console.warn(
        "Backend unavailable. Using NirmanSetu demo data.",
        err
      );

      setProjectList(demoProjects);
      setBackendAvailable(false);
      setError("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Filter options                                                           */
  /* ------------------------------------------------------------------------ */

  const wards = useMemo(() => {
    const values = projectList
      .map((project) => project.ward)
      .filter(Boolean);

    return ["All", ...new Set(values)];
  }, [projectList]);

  const types = useMemo(() => {
    const values = projectList
      .map((project) => project.type)
      .filter(Boolean);

    return ["All", ...new Set(values)];
  }, [projectList]);

  /* ------------------------------------------------------------------------ */
  /* Filter projects                                                          */
  /* ------------------------------------------------------------------------ */

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return projectList.filter((project) => {
      const matchesSearch =
        !query ||
        project.name?.toLowerCase().includes(query) ||
        project.location?.toLowerCase().includes(query) ||
        project.contractor?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      const matchesWard =
        wardFilter === "All" || project.ward === wardFilter;

      const matchesType =
        typeFilter === "All" || project.type === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesWard &&
        matchesType
      );
    });
  }, [
    projectList,
    searchTerm,
    statusFilter,
    wardFilter,
    typeFilter,
  ]);

  /* ------------------------------------------------------------------------ */
  /* Statistics                                                               */
  /* ------------------------------------------------------------------------ */

  const statistics = useMemo(() => {
    const total = projectList.length;

    const onTrack = projectList.filter(
      (project) => project.status === "On Track"
    ).length;

    const atRisk = projectList.filter(
      (project) => project.status === "At Risk"
    ).length;

    const delayed = projectList.filter(
      (project) => project.status === "Delayed"
    ).length;

    return {
      total,
      onTrack,
      atRisk,
      delayed,
    };
  }, [projectList]);

  /* ------------------------------------------------------------------------ */
  /* Form handlers                                                            */
  /* ------------------------------------------------------------------------ */

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setProjectForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (formError) {
      setFormError("");
    }
  };

  const resetForm = () => {
    setProjectForm({
      name: "",
      location: "",
      contractor: "",
      status: "On Track",
      budget: "",
      progress: "",
    });

    setFormError("");
  };

  const closeModal = () => {
    if (saving) return;

    setIsAddModalOpen(false);
    resetForm();
  };

  /* ------------------------------------------------------------------------ */
  /* Add project                                                              */
  /* ------------------------------------------------------------------------ */

  const handleAddProject = async (event) => {
    event.preventDefault();

    const name = projectForm.name.trim();
    const location = projectForm.location.trim();

    const budgetNumber = Number(
      String(projectForm.budget).replace(/,/g, "")
    );

    const progressNumber = Number(projectForm.progress);

    if (!name) {
      setFormError("Project name is required.");
      return;
    }

    if (!location) {
      setFormError("Project location is required.");
      return;
    }

    if (
      projectForm.budget !== "" &&
      (!Number.isFinite(budgetNumber) || budgetNumber < 0)
    ) {
      setFormError("Please enter a valid budget.");
      return;
    }

    if (
      projectForm.progress !== "" &&
      (!Number.isFinite(progressNumber) ||
        progressNumber < 0 ||
        progressNumber > 100)
    ) {
      setFormError("Progress must be between 0 and 100.");
      return;
    }

    /* ---------------------------------------------------------------------- */
    /* Demo mode: save locally                                                */
    /* ---------------------------------------------------------------------- */

    if (!backendAvailable) {
      const newDemoProject = {
        id: Date.now(),
        name,
        location,
        contractor:
          projectForm.contractor.trim() || "Not Assigned",
        status: projectForm.status,
        budget:
          projectForm.budget !== ""
            ? formatBudget(budgetNumber)
            : "Rs. 0",
        progress:
          projectForm.progress !== ""
            ? progressNumber
            : 0,
        ward: "N/A",
        type: "Infrastructure",
        engineer: "Not Assigned",
        startDate: new Date().toISOString().slice(0, 10),
        completionDate: "",
      };

      setProjectList((previous) => [
        newDemoProject,
        ...previous,
      ]);

      setIsAddModalOpen(false);
      resetForm();
      return;
    }

    /* ---------------------------------------------------------------------- */
    /* Backend mode: save through Spring Boot                                */
    /* ---------------------------------------------------------------------- */

    const newProject = {
      name,
      location,
      contractor: projectForm.contractor.trim() || null,
      status: backendStatus(projectForm.status),
      budget: budgetNumber || 0,
      completionPercentage: progressNumber || 0,
    };

    try {
      setSaving(true);
      setFormError("");

      await createProject(newProject);
      await loadProjects();

      setIsAddModalOpen(false);
      resetForm();
    } catch (err) {
      console.error("Failed to save project:", err);

      /*
       * If the backend becomes unavailable while submitting,
       * switch to demonstration mode so the UI remains usable.
       */
      setBackendAvailable(false);

      const localProject = {
        id: Date.now(),
        name,
        location,
        contractor:
          projectForm.contractor.trim() || "Not Assigned",
        status: projectForm.status,
        budget:
          projectForm.budget !== ""
            ? formatBudget(budgetNumber)
            : "Rs. 0",
        progress:
          projectForm.progress !== ""
            ? progressNumber
            : 0,
        ward: "N/A",
        type: "Infrastructure",
        engineer: "Not Assigned",
        startDate: new Date().toISOString().slice(0, 10),
        completionDate: "",
      };

      setProjectList((previous) => [
        localProject,
        ...previous,
      ]);

      setIsAddModalOpen(false);
      resetForm();
    } finally {
      setSaving(false);
    }
  };

  /* ------------------------------------------------------------------------ */
  /* Loading state                                                            */
  /* ------------------------------------------------------------------------ */

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={30}
            className="animate-spin text-blue-600"
          />

          <p className="text-sm font-medium text-slate-600">
            Loading project records...
          </p>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* UI                                                                       */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Projects
            </h1>

            {!backendAvailable && (
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-700">
                Demo Mode
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Monitor public infrastructure projects and their progress.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          <CirclePlus size={18} />
          Add Project
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">
            Total Projects
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {statistics.total}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 shadow-sm">
          <p className="text-xs font-medium text-emerald-700">
            On Track
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-900">
            {statistics.onTrack}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 shadow-sm">
          <p className="text-xs font-medium text-amber-700">
            At Risk
          </p>

          <p className="mt-2 text-2xl font-bold text-amber-900">
            {statistics.atRisk}
          </p>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 shadow-sm">
          <p className="text-xs font-medium text-red-700">
            Delayed
          </p>

          <p className="mt-2 text-2xl font-bold text-red-900">
            {statistics.delayed}
          </p>
        </div>
      </div>

      {/* Search and filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search projects, locations, contractors..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Status */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All Status</option>
                <option value="On Track">On Track</option>
                <option value="At Risk">At Risk</option>
                <option value="Delayed">Delayed</option>
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            {/* Ward */}
            <div className="relative">
              <select
                value={wardFilter}
                onChange={(event) =>
                  setWardFilter(event.target.value)
                }
                className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              >
                {wards.map((ward) => (
                  <option key={ward} value={ward}>
                    {ward === "All" ? "All Wards" : ward}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            {/* Type */}
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(event.target.value)
                }
                className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type === "All" ? "All Types" : type}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <Filter size={14} />
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredProjects.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">
            {projectList.length}
          </span>{" "}
          projects
        </div>
      </section>

      {/* Backend error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Project list */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <Building2
            size={34}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 text-base font-semibold text-slate-800">
            No projects found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or filter options.
          </p>
        </div>
      ) : (
        <section className="grid gap-4 xl:grid-cols-2">
          {filteredProjects.map((project) => {
            const styles =
              statusStyles[project.status] ||
              statusStyles["On Track"];

            const progress = Math.min(
              Math.max(Number(project.progress) || 0, 0),
              100
            );

            return (
              <article
                key={project.id ?? project.name}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="truncate text-base font-bold text-slate-900">
                        {project.name}
                      </h2>

                      <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                        <MapPin
                          size={15}
                          className="shrink-0"
                        />

                        <span className="truncate">
                          {project.location}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${styles.badge}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${styles.dot}`}
                      />

                      {project.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Budget
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {project.budget}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Contractor
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                        {project.contractor}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Type
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {project.type}
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">
                        Project Progress
                      </span>

                      <span className="text-xs font-bold text-slate-800">
                        {progress}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all ${styles.bar}`}
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card footer */}
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-5 py-3">
                  <div className="text-xs text-slate-500">
                    {project.ward !== "N/A" && (
                      <span>{project.ward}</span>
                    )}
                  </div>

                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    <Eye size={16} />
                    View Details
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      )}

      {/* Data source information */}
      <section
        className={`flex items-start gap-3 rounded-xl border p-4 ${
          backendAvailable
            ? "border-emerald-100 bg-emerald-50"
            : "border-blue-100 bg-blue-50"
        }`}
      >
        <Building2
          size={18}
          className={`mt-0.5 shrink-0 ${
            backendAvailable
              ? "text-emerald-600"
              : "text-blue-600"
          }`}
        />

        <div>
          <p
            className={`text-xs font-semibold sm:text-sm ${
              backendAvailable
                ? "text-emerald-900"
                : "text-blue-900"
            }`}
          >
            {backendAvailable
              ? "Connected to NirmanSetu Backend"
              : "NirmanSetu Demonstration Mode"}
          </p>

          <p
            className={`mt-1 text-xs leading-5 ${
              backendAvailable
                ? "text-emerald-700"
                : "text-blue-700"
            }`}
          >
            {backendAvailable
              ? "Project records are loaded from the Spring Boot REST API and persisted in PostgreSQL."
              : "Showing verified demonstration project data. WebMCP tools remain available for AI-assisted project discovery and monitoring."}
          </p>
        </div>
      </section>

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div
            className="absolute inset-0"
            onClick={closeModal}
          />

          <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Add New Project
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Register a new infrastructure project.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleAddProject}
              className="space-y-4 p-5"
            >
              <div>
                <label
                  htmlFor="project-name"
                  className="mb-1.5 block text-xs font-semibold text-slate-700"
                >
                  Project Name *
                </label>

                <input
                  id="project-name"
                  name="name"
                  value={projectForm.name}
                  onChange={handleFormChange}
                  placeholder="e.g. Kathmandu Ring Road Expansion"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="project-location"
                  className="mb-1.5 block text-xs font-semibold text-slate-700"
                >
                  Location *
                </label>

                <input
                  id="project-location"
                  name="location"
                  value={projectForm.location}
                  onChange={handleFormChange}
                  placeholder="e.g. Kathmandu"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="project-contractor"
                  className="mb-1.5 block text-xs font-semibold text-slate-700"
                >
                  Contractor
                </label>

                <input
                  id="project-contractor"
                  name="contractor"
                  value={projectForm.contractor}
                  onChange={handleFormChange}
                  placeholder="e.g. ABC Construction Pvt. Ltd."
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="project-status"
                    className="mb-1.5 block text-xs font-semibold text-slate-700"
                  >
                    Status
                  </label>

                  <select
                    id="project-status"
                    name="status"
                    value={projectForm.status}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="On Track">
                      On Track
                    </option>
                    <option value="At Risk">
                      At Risk
                    </option>
                    <option value="Delayed">
                      Delayed
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="project-progress"
                    className="mb-1.5 block text-xs font-semibold text-slate-700"
                  >
                    Progress (%)
                  </label>

                  <input
                    id="project-progress"
                    name="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={projectForm.progress}
                    onChange={handleFormChange}
                    placeholder="0 - 100"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="project-budget"
                  className="mb-1.5 block text-xs font-semibold text-slate-700"
                >
                  Budget
                </label>

                <input
                  id="project-budget"
                  name="budget"
                  type="number"
                  min="0"
                  value={projectForm.budget}
                  onChange={handleFormChange}
                  placeholder="e.g. 250000000"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-700">
                  {formError}
                </div>
              )}

              {/* Mode note */}
              <div
                className={`rounded-xl border p-3 ${
                  backendAvailable
                    ? "border-emerald-100 bg-emerald-50"
                    : "border-blue-100 bg-blue-50"
                }`}
              >
                <p
                  className={`text-xs font-semibold ${
                    backendAvailable
                      ? "text-emerald-800"
                      : "text-blue-800"
                  }`}
                >
                  {backendAvailable
                    ? "Database Connected"
                    : "Demonstration Mode"}
                </p>

                <p
                  className={`mt-1 text-xs leading-5 ${
                    backendAvailable
                      ? "text-emerald-700"
                      : "text-blue-700"
                  }`}
                >
                  {backendAvailable
                    ? "This project will be saved through the Spring Boot REST API."
                    : "This project will be added locally for the current demonstration session."}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                  )}

                  {saving ? "Saving..." : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}