/**
 * NirmanSetu WebMCP tools
 *
 * WebMCP is progressively enhanced: normal browsers continue to work,
 * while WebMCP-aware agents can discover these read-only project tools.
 */

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
    plannedProgress: 78,
    budgetUtilization: 68,
    riskScore: 28,
    riskLevel: "Low",
    anomaly: "No significant anomaly detected",
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
    plannedProgress: 65,
    budgetUtilization: 61,
    riskScore: 64,
    riskLevel: "Medium",
    anomaly: "Progress is below planned schedule",
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
    plannedProgress: 58,
    budgetUtilization: 76,
    riskScore: 87,
    riskLevel: "High",
    anomaly: "Significant schedule and expenditure deviation",
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
    plannedProgress: 64,
    budgetUtilization: 70,
    riskScore: 18,
    riskLevel: "Low",
    anomaly: "No significant anomaly detected",
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
    plannedProgress: 71,
    budgetUtilization: 82,
    riskScore: 73,
    riskLevel: "High",
    anomaly: "High budget utilization relative to physical progress",
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
    plannedProgress: 81,
    budgetUtilization: 79,
    riskScore: 18,
    riskLevel: "Low",
    anomaly: "Progress is slightly ahead of schedule",
  },
];

const normalize = (project) => ({ ...project });

const findProject = (id) =>
  projects.find((project) => project.id === Number(id));

const matchesQuery = (project, query) => {
  if (!query) return true;
  const haystack = [
    project.name,
    project.location,
    project.ward,
    project.type,
    project.contractor,
    project.engineer,
    project.status,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(String(query).toLowerCase().trim());
};

const register = async () => {
  if (
    typeof document === "undefined" ||
    !document.modelContext ||
    typeof document.modelContext.registerTool !== "function"
  ) {
    return false;
  }

  await document.modelContext.registerTool({
    name: "search_projects",
    title: "Search infrastructure projects",
    description:
      "Search NirmanSetu public infrastructure projects by name, location, type, contractor, or status. Returns matching project summaries.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Optional text to search across project information.",
        },
        status: {
          type: "string",
          enum: ["All", "On Track", "At Risk", "Delayed"],
          description: "Optional project status filter.",
        },
        location: {
          type: "string",
          description: "Optional city or location filter.",
        },
        type: {
          type: "string",
          description: "Optional project type filter, such as Road or Building.",
        },
      },
    },
    annotations: { readOnlyHint: true },
    execute: async ({ query = "", status = "All", location = "", type = "" }) => {
      const results = projects
        .filter((project) => matchesQuery(project, query))
        .filter((project) => status === "All" || !status || project.status === status)
        .filter((project) => !location || project.location.toLowerCase().includes(location.toLowerCase()))
        .filter((project) => !type || project.type.toLowerCase() === type.toLowerCase())
        .map((project) => ({
          id: project.id,
          name: project.name,
          location: project.location,
          type: project.type,
          progress: project.progress,
          status: project.status,
          contractor: project.contractor,
        }));

      return JSON.stringify({
        count: results.length,
        projects: results,
      });
    },
  });

  await document.modelContext.registerTool({
    name: "get_project_details",
    title: "Get infrastructure project details",
    description:
      "Get detailed information about one NirmanSetu infrastructure project, including progress, budget, contractor, schedule, and risk indicators.",
    inputSchema: {
      type: "object",
      properties: {
        projectId: {
          type: "integer",
          description: "The numeric NirmanSetu project ID.",
        },
      },
      required: ["projectId"],
    },
    annotations: { readOnlyHint: true },
    execute: async ({ projectId }) => {
      const project = findProject(projectId);

      if (!project) {
        return JSON.stringify({
          error: `Project ${projectId} was not found.`,
          availableProjectIds: projects.map((item) => item.id),
        });
      }

      return JSON.stringify(normalize(project));
    },
  });

  await document.modelContext.registerTool({
    name: "find_delayed_projects",
    title: "Find delayed infrastructure projects",
    description:
      "Find NirmanSetu projects whose current status is Delayed. Optionally filter by location.",
    inputSchema: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "Optional location filter.",
        },
      },
    },
    annotations: { readOnlyHint: true },
    execute: async ({ location = "" }) => {
      const delayed = projects
        .filter((project) => project.status === "Delayed")
        .filter(
          (project) =>
            !location ||
            project.location.toLowerCase().includes(location.toLowerCase())
        )
        .map((project) => ({
          id: project.id,
          name: project.name,
          location: project.location,
          progress: project.progress,
          plannedProgress: project.plannedProgress,
          completionDate: project.completionDate,
          riskLevel: project.riskLevel,
          riskScore: project.riskScore,
          anomaly: project.anomaly,
        }));

      return JSON.stringify({
        count: delayed.length,
        projects: delayed,
      });
    },
  });

  await document.modelContext.registerTool({
    name: "get_project_risk",
    title: "Get project risk assessment",
    description:
      "Return the current AI-monitoring risk indicators for a NirmanSetu project.",
    inputSchema: {
      type: "object",
      properties: {
        projectId: {
          type: "integer",
          description: "The numeric NirmanSetu project ID.",
        },
      },
      required: ["projectId"],
    },
    annotations: { readOnlyHint: true },
    execute: async ({ projectId }) => {
      const project = findProject(projectId);

      if (!project) {
        return JSON.stringify({ error: `Project ${projectId} was not found.` });
      }

      return JSON.stringify({
        projectId: project.id,
        project: project.name,
        riskScore: project.riskScore,
        riskLevel: project.riskLevel,
        progress: project.progress,
        plannedProgress: project.plannedProgress,
        budgetUtilization: project.budgetUtilization,
        anomaly: project.anomaly,
      });
    },
  });

  return true;
};

export default register;
