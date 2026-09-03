// import { useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Search,
//   SlidersHorizontal,
//   MapPin,
//   FolderKanban,
//   CheckCircle2,
//   Clock3,
//   AlertTriangle,
//   XCircle,
//   ChevronRight,
//   X,
//   Map,
// } from "lucide-react";

// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
// } from "react-leaflet";

// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // =========================================================
// // LEAFLET MARKER ICON
// // =========================================================

// const projectMarkerIcon = new L.Icon({
//   iconUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

//   shadowUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// // =========================================================
// // PROJECT MAP DATA
// // =========================================================
// // Temporary frontend-only data.
// //
// // Later this data should come from the authenticated backend.
// // =========================================================

// const projectRecords = [
//   {
//     id: 1,
//     name: "Ward 5 Road Improvement",
//     location: "Lalitpur",
//     ward: "Ward 5",
//     contractor: "Himalayan Construction Pvt. Ltd.",
//     status: "In Progress",
//     progress: 72,
//     latitude: 27.6588,
//     longitude: 85.3247,
//     budget: "NPR 18,500,000",
//   },
//   {
//     id: 2,
//     name: "Dhobighat Drainage Project",
//     location: "Lalitpur",
//     ward: "Ward 3",
//     contractor: "Everest Infrastructure Pvt. Ltd.",
//     status: "In Progress",
//     progress: 48,
//     latitude: 27.675,
//     longitude: 85.315,
//     budget: "NPR 12,800,000",
//   },
//   {
//     id: 3,
//     name: "Community Building Construction",
//     location: "Kathmandu",
//     ward: "Ward 8",
//     contractor: "Kathmandu Builders Pvt. Ltd.",
//     status: "Delayed",
//     progress: 31,
//     latitude: 27.7172,
//     longitude: 85.324,
//     budget: "NPR 25,000,000",
//   },
//   {
//     id: 4,
//     name: "Ward 7 Drinking Water Pipeline",
//     location: "Bhaktapur",
//     ward: "Ward 7",
//     contractor: "Green Valley Engineering",
//     status: "Completed",
//     progress: 100,
//     latitude: 27.671,
//     longitude: 85.4298,
//     budget: "NPR 9,600,000",
//   },
//   {
//     id: 5,
//     name: "Municipal Health Post Construction",
//     location: "Kathmandu",
//     ward: "Ward 4",
//     contractor: "Sagarmatha Builders",
//     status: "At Risk",
//     progress: 56,
//     latitude: 27.7045,
//     longitude: 85.329,
//     budget: "NPR 21,300,000",
//   },
//   {
//     id: 6,
//     name: "Ward 2 Street Lighting Project",
//     location: "Lalitpur",
//     ward: "Ward 2",
//     contractor: "Bright Nepal Engineering",
//     status: "In Progress",
//     progress: 84,
//     latitude: 27.666,
//     longitude: 85.322,
//     budget: "NPR 7,400,000",
//   },
// ];

// // =========================================================
// // STATUS CONFIGURATION
// // =========================================================

// const statusStyles = {
//   "In Progress": {
//     badge: "border-blue-200 bg-blue-50 text-blue-700",
//     marker: "bg-blue-600",
//     icon: Clock3,
//   },

//   Completed: {
//     badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
//     marker: "bg-emerald-600",
//     icon: CheckCircle2,
//   },

//   Delayed: {
//     badge: "border-red-200 bg-red-50 text-red-700",
//     marker: "bg-red-600",
//     icon: XCircle,
//   },

//   "At Risk": {
//     badge: "border-amber-200 bg-amber-50 text-amber-700",
//     marker: "bg-amber-500",
//     icon: AlertTriangle,
//   },
// };

// // =========================================================
// // STATISTICS
// // =========================================================

// const statistics = [
//   {
//     label: "Total Projects",
//     value: 42,
//     description: "Projects being monitored",
//     icon: FolderKanban,
//   },
//   {
//     label: "In Progress",
//     value: 24,
//     description: "Currently under construction",
//     icon: Clock3,
//   },
//   {
//     label: "Completed",
//     value: 12,
//     description: "Successfully completed",
//     icon: CheckCircle2,
//   },
//   {
//     label: "At Risk",
//     value: 6,
//     description: "Require closer monitoring",
//     icon: AlertTriangle,
//   },
// ];

// // =========================================================
// // PROJECT MAP PAGE
// // =========================================================

// export default function ProjectMap() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [selectedProject, setSelectedProject] = useState(null);

//   // =======================================================
//   // FILTER PROJECTS
//   // =======================================================

//   const filteredProjects = useMemo(() => {
//     const search = searchTerm.toLowerCase().trim();

//     return projectRecords.filter((project) => {
//       const matchesSearch =
//         project.name.toLowerCase().includes(search) ||
//         project.location.toLowerCase().includes(search) ||
//         project.ward.toLowerCase().includes(search) ||
//         project.contractor.toLowerCase().includes(search);

//       const matchesStatus =
//         statusFilter === "All" ||
//         project.status === statusFilter;

//       return matchesSearch && matchesStatus;
//     });
//   }, [searchTerm, statusFilter]);

//   // =======================================================
//   // CLEAR FILTERS
//   // =======================================================

//   const clearFilters = () => {
//     setSearchTerm("");
//     setStatusFilter("All");
//   };

//   const hasActiveFilters =
//     searchTerm || statusFilter !== "All";

//   // =======================================================
//   // MAIN PAGE
//   // =======================================================

//   return (
//     <main className="w-full">
//       <div className="mx-auto w-full max-w-[1800px] p-4 sm:p-5 md:p-6 lg:p-8">

//         {/* =================================================
//             PAGE HEADER
//         ================================================= */}

//         <section className="mb-6">
//           <p className="text-xs font-medium uppercase tracking-wider text-blue-600 sm:text-sm">
//             Infrastructure Monitoring
//           </p>

//           <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
//             Project Map
//           </h1>

//           <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
//             Monitor the geographic distribution, progress, and
//             status of registered infrastructure projects across
//             Nepal.
//           </p>
//         </section>

//         {/* =================================================
//             STATISTICS
//         ================================================= */}

//         <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 sm:gap-4">
//           {statistics.map((statistic) => {
//             const Icon = statistic.icon;

//             return (
//               <article
//                 key={statistic.label}
//                 className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
//               >
//                 <div className="flex items-start justify-between gap-3">

//                   <div>
//                     <p className="text-xs font-medium text-slate-500 sm:text-sm">
//                       {statistic.label}
//                     </p>

//                     <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
//                       {statistic.value}
//                     </p>

//                     <p className="mt-2 text-[11px] text-slate-500 sm:text-xs">
//                       {statistic.description}
//                     </p>
//                   </div>

//                   <div className="rounded-lg bg-slate-100 p-2.5 text-slate-600">
//                     <Icon size={20} />
//                   </div>

//                 </div>
//               </article>
//             );
//           })}
//         </section>

//         {/* =================================================
//             SEARCH & FILTERS
//         ================================================= */}

//         <section className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-5">

//           <div className="flex items-center gap-2">

//             <SlidersHorizontal
//               size={17}
//               className="text-slate-500"
//             />

//             <h2 className="text-sm font-semibold text-slate-800">
//               Search & Filters
//             </h2>

//           </div>

//           <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

//             {/* Search */}

//             <div className="relative">

//               <Search
//                 size={17}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//               />

//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(event) =>
//                   setSearchTerm(event.target.value)
//                 }
//                 placeholder="Search projects, locations, wards..."
//                 className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//               />

//             </div>

//             {/* Status */}

//             <select
//               value={statusFilter}
//               onChange={(event) =>
//                 setStatusFilter(event.target.value)
//               }
//               className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//             >
//               <option value="All">
//                 All Project Statuses
//               </option>

//               <option value="In Progress">
//                 In Progress
//               </option>

//               <option value="Completed">
//                 Completed
//               </option>

//               <option value="Delayed">
//                 Delayed
//               </option>

//               <option value="At Risk">
//                 At Risk
//               </option>
//             </select>

//           </div>

//           {/* Active Filters */}

//           {hasActiveFilters && (
//             <div className="mt-4 flex flex-wrap items-center gap-2">

//               <span className="text-xs text-slate-500">
//                 Filters applied
//               </span>

//               <button
//                 type="button"
//                 onClick={clearFilters}
//                 className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
//               >
//                 Clear all
//                 <X size={13} />
//               </button>

//             </div>
//           )}

//         </section>

//         {/* =================================================
//             MAP + PROJECT LIST
//         ================================================= */}

//         <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">

//           {/* =================================================
//               REAL MAP
//           ================================================= */}

//           <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

//             {/* Map Header */}

//             <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-5">

//               <div>

//                 <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
//                   Infrastructure Project Locations
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500">
//                   Real-time map view of registered project
//                   locations.
//                 </p>

//               </div>

//               <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
//                 <Map size={18} />
//               </div>

//             </div>

//             {/* =================================================
//                 LEAFLET MAP
//             ================================================= */}

//             <div className="relative h-[520px] overflow-hidden sm:h-[600px]">

//               <MapContainer
//                 center={[28.3949, 84.124]}
//                 zoom={7}
//                 scrollWheelZoom={true}
//                 className="h-full w-full"
//               >

//                 {/* OpenStreetMap */}

//                 <TileLayer
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />

//                 {/* Project Markers */}

//                 {filteredProjects.map((project) => (
//                   <Marker
//                     key={project.id}
//                     position={[
//                       project.latitude,
//                       project.longitude,
//                     ]}
//                     icon={projectMarkerIcon}
//                     eventHandlers={{
//                       click: () => {
//                         setSelectedProject(project);
//                       },
//                     }}
//                   >

//                     <Popup>

//                       <div className="min-w-[220px]">

//                         <h3 className="text-sm font-bold text-slate-900">
//                           {project.name}
//                         </h3>

//                         <div className="mt-2 space-y-1">

//                           <p className="text-xs text-slate-600">
//                             <strong>Location:</strong>{" "}
//                             {project.location},{" "}
//                             {project.ward}
//                           </p>

//                           <p className="text-xs text-slate-600">
//                             <strong>Status:</strong>{" "}
//                             {project.status}
//                           </p>

//                           <p className="text-xs text-slate-600">
//                             <strong>Progress:</strong>{" "}
//                             {project.progress}%
//                           </p>

//                           <p className="text-xs text-slate-600">
//                             <strong>Contractor:</strong>{" "}
//                             {project.contractor}
//                           </p>

//                           <p className="text-xs text-slate-600">
//                             <strong>Budget:</strong>{" "}
//                             {project.budget}
//                           </p>

//                         </div>

//                         <Link
//                           to={`/projects/${project.id}`}
//                           className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
//                         >
//                           View Project
//                           <ChevronRight size={13} />
//                         </Link>

//                       </div>

//                     </Popup>

//                   </Marker>
//                 ))}

//               </MapContainer>

//               {/* Map Label */}

//               <div className="pointer-events-none absolute left-4 top-4 z-[1000] rounded-lg border border-slate-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur">

//                 <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
//                   Infrastructure Map
//                 </p>

//                 <p className="mt-1 text-xs font-medium text-slate-700">
//                   Nepal
//                 </p>

//               </div>

//               {/* Project Count */}

//               <div className="pointer-events-none absolute bottom-4 left-4 z-[1000] rounded-lg border border-slate-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur">

//                 <p className="text-xs font-semibold text-slate-800">
//                   {filteredProjects.length} Projects
//                 </p>

//                 <p className="mt-0.5 text-[10px] text-slate-500">
//                   Currently displayed
//                 </p>

//               </div>

//             </div>

//             {/* Map Legend */}

//             <div className="flex flex-wrap items-center gap-4 border-t border-slate-200 px-4 py-4 sm:px-5">

//               <span className="text-xs font-semibold text-slate-600">
//                 Status:
//               </span>

//               {Object.entries(statusStyles).map(
//                 ([status, config]) => (
//                   <div
//                     key={status}
//                     className="flex items-center gap-1.5"
//                   >

//                     <span
//                       className={`h-2.5 w-2.5 rounded-full ${config.marker}`}
//                     />

//                     <span className="text-xs text-slate-500">
//                       {status}
//                     </span>

//                   </div>
//                 )
//               )}

//             </div>

//           </div>

//           {/* =================================================
//               PROJECT LIST
//           ================================================= */}

//           <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

//             <div className="border-b border-slate-200 px-4 py-4 sm:px-5">

//               <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
//                 Projects on Map
//               </h2>

//               <p className="mt-1 text-xs text-slate-500">
//                 {filteredProjects.length} project
//                 {filteredProjects.length !== 1 ? "s" : ""} shown
//               </p>

//             </div>

//             <div className="max-h-[600px] divide-y divide-slate-100 overflow-y-auto">

//               {filteredProjects.length > 0 ? (
//                 filteredProjects.map((project) => {

//                   const config =
//                     statusStyles[project.status];

//                   const Icon = config.icon;

//                   return (
//                     <article
//                       key={project.id}
//                       className="p-4 transition hover:bg-slate-50 sm:p-5"
//                     >

//                       <div className="flex items-start gap-3">

//                         {/* Locate Marker */}

//                         <button
//                           type="button"
//                           onClick={() =>
//                             setSelectedProject(project)
//                           }
//                           className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${config.marker} text-white transition hover:scale-105`}
//                           aria-label={`Locate ${project.name} on map`}
//                         >
//                           <MapPin size={16} />
//                         </button>

//                         <div className="min-w-0 flex-1">

//                           <div className="flex items-start justify-between gap-2">

//                             <div className="min-w-0">

//                               <h3 className="truncate text-sm font-semibold text-slate-900">
//                                 {project.name}
//                               </h3>

//                               <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
//                                 <MapPin size={12} />
//                                 {project.location},{" "}
//                                 {project.ward}
//                               </p>

//                             </div>

//                             <span
//                               className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-medium ${config.badge}`}
//                             >
//                               {project.status}
//                             </span>

//                           </div>

//                           {/* Progress */}

//                           <div className="mt-3">

//                             <div className="flex items-center justify-between">

//                               <span className="text-[10px] text-slate-400">
//                                 Progress
//                               </span>

//                               <span className="text-[10px] font-semibold text-slate-700">
//                                 {project.progress}%
//                               </span>

//                             </div>

//                             <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">

//                               <div
//                                 className="h-full rounded-full bg-blue-600"
//                                 style={{
//                                   width: `${project.progress}%`,
//                                 }}
//                               />

//                             </div>

//                           </div>

//                           {/* Contractor + View */}

//                           <div className="mt-3 flex items-center justify-between gap-2">

//                             <div className="flex min-w-0 items-center gap-1.5 text-[11px] text-slate-500">

//                               <Icon
//                                 size={13}
//                                 className="shrink-0"
//                               />

//                               <span className="truncate">
//                                 {project.contractor}
//                               </span>

//                             </div>

//                             <Link
//                               to={`/projects/${project.id}`}
//                               className="flex shrink-0 items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
//                             >
//                               View
//                               <ChevronRight size={13} />
//                             </Link>

//                           </div>

//                         </div>

//                       </div>

//                     </article>
//                   );
//                 })
//               ) : (
//                 <div className="px-4 py-12 text-center">

//                   <MapPin
//                     size={24}
//                     className="mx-auto text-slate-400"
//                   />

//                   <p className="mt-3 text-sm font-medium text-slate-700">
//                     No projects found
//                   </p>

//                   <p className="mt-1 text-xs text-slate-500">
//                     Try changing your search or filters.
//                   </p>

//                 </div>
//               )}

//             </div>

//           </div>

//         </section>

//         {/* =================================================
//             SELECTED PROJECT INFORMATION
//         ================================================= */}

//         {selectedProject && (
//           <section className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:p-5">

//             <div className="flex items-start justify-between gap-4">

//               <div>

//                 <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
//                   Selected Project
//                 </p>

//                 <h2 className="mt-1 text-base font-bold text-slate-900">
//                   {selectedProject.name}
//                 </h2>

//                 <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
//                   <MapPin size={13} />
//                   {selectedProject.location},{" "}
//                   {selectedProject.ward}
//                 </p>

//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setSelectedProject(null)
//                 }
//                 className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-slate-600"
//                 aria-label="Close selected project"
//               >
//                 <X size={17} />
//               </button>

//             </div>

//             <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">

//               <div className="rounded-lg border border-blue-100 bg-white p-3">

//                 <p className="text-[10px] uppercase tracking-wide text-slate-400">
//                   Status
//                 </p>

//                 <p className="mt-1 text-xs font-semibold text-slate-800">
//                   {selectedProject.status}
//                 </p>

//               </div>

//               <div className="rounded-lg border border-blue-100 bg-white p-3">

//                 <p className="text-[10px] uppercase tracking-wide text-slate-400">
//                   Progress
//                 </p>

//                 <p className="mt-1 text-sm font-bold text-slate-800">
//                   {selectedProject.progress}%
//                 </p>

//               </div>

//               <div className="rounded-lg border border-blue-100 bg-white p-3">

//                 <p className="text-[10px] uppercase tracking-wide text-slate-400">
//                   Contractor
//                 </p>

//                 <p className="mt-1 truncate text-xs font-semibold text-slate-800">
//                   {selectedProject.contractor}
//                 </p>

//               </div>

//               <div className="rounded-lg border border-blue-100 bg-white p-3">

//                 <p className="text-[10px] uppercase tracking-wide text-slate-400">
//                   Budget
//                 </p>

//                 <p className="mt-1 text-xs font-semibold text-slate-800">
//                   {selectedProject.budget}
//                 </p>

//               </div>

//             </div>

//             <Link
//               to={`/projects/${selectedProject.id}`}
//               className="mt-4 inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
//             >
//               Open Project Details
//               <ChevronRight size={14} />
//             </Link>

//           </section>
//         )}

//         {/* =================================================
//             SECURITY / DATA NOTE
//         ================================================= */}

//         <section className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:mt-8">

//           <Map
//             size={18}
//             className="mt-0.5 shrink-0 text-blue-600"
//           />

//           <div>

//             <p className="text-xs font-semibold text-blue-900 sm:text-sm">
//               Secure Infrastructure Mapping
//             </p>

//             <p className="mt-1 text-xs leading-5 text-blue-700">
//               The map uses OpenStreetMap for geographic
//               visualization. Project information and coordinates
//               are currently mock development data. In production,
//               project coordinates and monitoring information should
//               be retrieved from authenticated backend services with
//               appropriate access controls and audit logging.
//             </p>

//           </div>

//         </section>

//       </div>
//     </main>
//   );
// }





import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  FolderKanban,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  XCircle,
  ChevronRight,
  X,
  Map,
  LocateFixed,
  Plus,
  Minus,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// =========================================================
// PROJECT MAP DATA
// =========================================================

const projectRecords = [
  {
    id: 1,
    name: "Ward 5 Road Improvement",
    location: "Lalitpur",
    ward: "Ward 5",
    contractor: "Himalayan Construction Pvt. Ltd.",
    status: "In Progress",
    progress: 72,
    latitude: 27.6588,
    longitude: 85.3247,
    budget: "NPR 18,500,000",
  },
  {
    id: 2,
    name: "Dhobighat Drainage Project",
    location: "Lalitpur",
    ward: "Ward 3",
    contractor: "Everest Infrastructure Pvt. Ltd.",
    status: "In Progress",
    progress: 48,
    latitude: 27.675,
    longitude: 85.315,
    budget: "NPR 12,800,000",
  },
  {
    id: 3,
    name: "Community Building Construction",
    location: "Kathmandu",
    ward: "Ward 8",
    contractor: "Kathmandu Builders Pvt. Ltd.",
    status: "Delayed",
    progress: 31,
    latitude: 27.7172,
    longitude: 85.324,
    budget: "NPR 25,000,000",
  },
  {
    id: 4,
    name: "Ward 7 Drinking Water Pipeline",
    location: "Bhaktapur",
    ward: "Ward 7",
    contractor: "Green Valley Engineering",
    status: "Completed",
    progress: 100,
    latitude: 27.671,
    longitude: 85.4298,
    budget: "NPR 9,600,000",
  },
  {
    id: 5,
    name: "Municipal Health Post Construction",
    location: "Kathmandu",
    ward: "Ward 4",
    contractor: "Sagarmatha Builders",
    status: "At Risk",
    progress: 56,
    latitude: 27.7045,
    longitude: 85.329,
    budget: "NPR 21,300,000",
  },
  {
    id: 6,
    name: "Ward 2 Street Lighting Project",
    location: "Lalitpur",
    ward: "Ward 2",
    contractor: "Bright Nepal Engineering",
    status: "In Progress",
    progress: 84,
    latitude: 27.666,
    longitude: 85.322,
    budget: "NPR 7,400,000",
  },
];

// =========================================================
// STATUS CONFIGURATION
// =========================================================

const statusStyles = {
  "In Progress": {
    badge: "border-blue-200 bg-blue-50 text-blue-700",
    marker: "#2563eb",
    icon: Clock3,
  },

  Completed: {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    marker: "#059669",
    icon: CheckCircle2,
  },

  Delayed: {
    badge: "border-red-200 bg-red-50 text-red-700",
    marker: "#dc2626",
    icon: XCircle,
  },

  "At Risk": {
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    marker: "#f59e0b",
    icon: AlertTriangle,
  },
};

// =========================================================
// STATISTICS
// =========================================================

const statistics = [
  {
    label: "Total Projects",
    value: 42,
    description: "Projects being monitored",
    icon: FolderKanban,
  },
  {
    label: "In Progress",
    value: 24,
    description: "Currently under construction",
    icon: Clock3,
  },
  {
    label: "Completed",
    value: 12,
    description: "Successfully completed",
    icon: CheckCircle2,
  },
  {
    label: "At Risk",
    value: 6,
    description: "Require closer monitoring",
    icon: AlertTriangle,
  },
];

// =========================================================
// NEPAL DEFAULT VIEW
// =========================================================

const NEPAL_CENTER = [28.3949, 84.124];

const NEPAL_ZOOM = 7;

// Kathmandu Valley view
const KATHMANDU_CENTER = [27.7172, 85.324];

// =========================================================
// CUSTOM PROJECT MARKER
// =========================================================

function createProjectIcon(status) {
  const color =
    statusStyles[status]?.marker || "#2563eb";

  return L.divIcon({
    className: "custom-project-marker",

    html: `
      <div
        style="
          width: 38px;
          height: 38px;
          border-radius: 9999px;
          background: ${color};
          border: 4px solid white;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.30);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
          transition: transform 0.15s ease;
        "
      >
        <span style="line-height: 1;">●</span>
      </div>
    `,

    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -22],
  });
}

// =========================================================
// MAP CONTROLLER
// =========================================================

function MapController({ selectedProject }) {
  const map = useMap();

  if (selectedProject) {
    map.flyTo(
      [
        selectedProject.latitude,
        selectedProject.longitude,
      ],
      15,
      {
        duration: 0.8,
      }
    );
  }

  return null;
}

// =========================================================
// MAP CONTROL BUTTONS
// =========================================================

function MapControls() {
  const map = useMap();

  const zoomIn = () => {
    map.zoomIn();
  };

  const zoomOut = () => {
    map.zoomOut();
  };

  const resetToNepal = () => {
    map.flyTo(NEPAL_CENTER, NEPAL_ZOOM, {
      duration: 0.8,
    });
  };

  const showKathmandu = () => {
    map.flyTo(KATHMANDU_CENTER, 11, {
      duration: 0.8,
    });
  };

  return (
    <div className="absolute right-4 top-4 z-[1000] flex flex-col gap-2">

      <button
        type="button"
        onClick={zoomIn}
        title="Zoom in"
        aria-label="Zoom in"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:bg-slate-50 hover:text-blue-600"
      >
        <Plus size={18} />
      </button>

      <button
        type="button"
        onClick={zoomOut}
        title="Zoom out"
        aria-label="Zoom out"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:bg-slate-50 hover:text-blue-600"
      >
        <Minus size={18} />
      </button>

      <button
        type="button"
        onClick={resetToNepal}
        title="Show Nepal"
        aria-label="Show Nepal"
        className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:bg-slate-50 hover:text-blue-600"
      >
        <LocateFixed size={17} />
      </button>

      <button
        type="button"
        onClick={showKathmandu}
        title="Show Kathmandu Valley"
        aria-label="Show Kathmandu Valley"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:bg-slate-50 hover:text-blue-600"
      >
        <MapPin size={17} />
      </button>

    </div>
  );
}

// =========================================================
// PROJECT MAP PAGE
// =========================================================

export default function ProjectMap() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedProject, setSelectedProject] =
    useState(null);

  const mapRef = useRef(null);

  // =======================================================
  // FILTER PROJECTS
  // =======================================================

  const filteredProjects = useMemo(() => {
    const search = searchTerm
      .toLowerCase()
      .trim();

    return projectRecords.filter((project) => {
      const matchesSearch =
        project.name
          .toLowerCase()
          .includes(search) ||
        project.location
          .toLowerCase()
          .includes(search) ||
        project.ward
          .toLowerCase()
          .includes(search) ||
        project.contractor
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        project.status === statusFilter;

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
  // SELECT PROJECT
  // =======================================================

  const selectProject = (project) => {
    setSelectedProject(project);

    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.flyTo(
          [
            project.latitude,
            project.longitude,
          ],
          15,
          {
            duration: 0.8,
          }
        );
      }
    }, 50);
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
            Infrastructure Monitoring
          </p>

          <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
            Project Map
          </h1>

          <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
            Monitor infrastructure projects across Nepal
            using an interactive geographic map.
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
                placeholder="Search projects, locations, wards..."
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

              <option value="All">
                All Project Statuses
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Delayed">
                Delayed
              </option>

              <option value="At Risk">
                At Risk
              </option>

            </select>

          </div>

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
            MAP + PROJECT LIST
        ================================================= */}

        <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">

          {/* =================================================
              REAL MAP
          ================================================= */}

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            {/* Map Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-5">

              <div>

                <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                  Infrastructure Project Locations
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Drag the map, scroll to zoom, or use the controls.
                </p>

              </div>

              <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
                <Map size={18} />
              </div>

            </div>

            {/* =================================================
                LEAFLET MAP
            ================================================= */}

            <div className="relative h-[520px] sm:h-[600px]">

              <MapContainer
                center={NEPAL_CENTER}
                zoom={NEPAL_ZOOM}
                minZoom={5}
                maxZoom={19}
                scrollWheelZoom={true}
                zoomControl={false}
                doubleClickZoom={true}
                dragging={true}
                touchZoom={true}
                keyboard={true}
                className="h-full w-full"
                ref={mapRef}
              >

                {/* OpenStreetMap */}

                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maxZoom={19}
                />

                {/* Custom controls */}

                <MapControls />

                {/* Selected project movement */}

                <MapController
                  selectedProject={selectedProject}
                />

                {/* Project markers */}

                {filteredProjects.map((project) => {

                  const config =
                    statusStyles[project.status];

                  return (
                    <Marker
                      key={project.id}
                      position={[
                        project.latitude,
                        project.longitude,
                      ]}
                      icon={createProjectIcon(
                        project.status
                      )}
                      eventHandlers={{
                        click: () =>
                          setSelectedProject(
                            project
                          ),
                      }}
                    >

                      <Popup
                        closeButton={true}
                        autoPan={true}
                      >

                        <div className="min-w-[220px]">

                          <p className="text-sm font-bold text-slate-900">
                            {project.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {project.location},{" "}
                            {project.ward}
                          </p>

                          <div className="mt-3">

                            <div className="flex items-center justify-between">

                              <span className="text-[11px] text-slate-500">
                                Progress
                              </span>

                              <span className="text-[11px] font-semibold text-slate-700">
                                {project.progress}%
                              </span>

                            </div>

                            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">

                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${project.progress}%`,
                                  backgroundColor:
                                    config.marker,
                                }}
                              />

                            </div>

                          </div>

                          <p className="mt-3 text-xs text-slate-600">
                            <strong>Contractor:</strong>{" "}
                            {project.contractor}
                          </p>

                          <p className="mt-1 text-xs text-slate-600">
                            <strong>Budget:</strong>{" "}
                            {project.budget}
                          </p>

                          <Link
                            to={`/projects/${project.id}`}
                            className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white"
                          >
                            View Project
                            <ChevronRight size={13} />
                          </Link>

                        </div>

                      </Popup>

                    </Marker>
                  );
                })}

              </MapContainer>

              {/* Map title overlay */}

              <div className="pointer-events-none absolute left-4 top-4 z-[999] rounded-lg border border-slate-200 bg-white/95 px-3 py-2 shadow-md backdrop-blur">

                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Live Map View
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-700">
                  Nepal
                </p>

              </div>

              {/* Mobile hint */}

              <div className="pointer-events-none absolute bottom-4 left-1/2 z-[999] -translate-x-1/2 rounded-full border border-slate-200 bg-white/95 px-3 py-1.5 text-[10px] font-medium text-slate-500 shadow-md backdrop-blur sm:hidden">
                Drag to move • Pinch to zoom
              </div>

            </div>

            {/* =================================================
                MAP LEGEND
            ================================================= */}

            <div className="flex flex-wrap items-center gap-4 border-t border-slate-200 px-4 py-4 sm:px-5">

              <span className="text-xs font-semibold text-slate-600">
                Status:
              </span>

              {Object.entries(statusStyles).map(
                ([status, config]) => (
                  <div
                    key={status}
                    className="flex items-center gap-1.5"
                  >

                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          config.marker,
                      }}
                    />

                    <span className="text-xs text-slate-500">
                      {status}
                    </span>

                  </div>
                )
              )}

            </div>

          </div>

          {/* =================================================
              PROJECT LIST
          ================================================= */}

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-4 py-4 sm:px-5">

              <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                Projects on Map
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {filteredProjects.length} project
                {filteredProjects.length !== 1
                  ? "s"
                  : ""}{" "}
                shown
              </p>

            </div>

            <div className="max-h-[600px] divide-y divide-slate-100 overflow-y-auto">

              {filteredProjects.length > 0 ? (

                filteredProjects.map((project) => {

                  const config =
                    statusStyles[project.status];

                  const Icon = config.icon;

                  return (
                    <article
                      key={project.id}
                      className="p-4 transition hover:bg-slate-50 sm:p-5"
                    >

                      <div className="flex items-start gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            selectProject(
                              project
                            )
                          }
                          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
                          style={{
                            backgroundColor:
                              config.marker,
                          }}
                          aria-label={`Locate ${project.name} on map`}
                        >
                          <MapPin size={16} />
                        </button>

                        <div className="min-w-0 flex-1">

                          <div className="flex items-start justify-between gap-2">

                            <div className="min-w-0">

                              <h3 className="truncate text-sm font-semibold text-slate-900">
                                {project.name}
                              </h3>

                              <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                <MapPin size={12} />
                                {project.location},{" "}
                                {project.ward}
                              </p>

                            </div>

                            <span
                              className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-medium ${config.badge}`}
                            >
                              {project.status}
                            </span>

                          </div>

                          {/* Progress */}

                          <div className="mt-3">

                            <div className="flex items-center justify-between">

                              <span className="text-[10px] text-slate-400">
                                Progress
                              </span>

                              <span className="text-[10px] font-semibold text-slate-700">
                                {project.progress}%
                              </span>

                            </div>

                            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">

                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${project.progress}%`,
                                  backgroundColor:
                                    config.marker,
                                }}
                              />

                            </div>

                          </div>

                          {/* Footer */}

                          <div className="mt-3 flex items-center justify-between gap-3">

                            <div className="flex min-w-0 items-center gap-1.5 text-[11px] text-slate-500">

                              <Icon
                                size={13}
                                className="shrink-0"
                              />

                              <span className="truncate">
                                {project.contractor}
                              </span>

                            </div>

                            <Link
                              to={`/projects/${project.id}`}
                              className="flex shrink-0 items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
                            >
                              View
                              <ChevronRight size={13} />
                            </Link>

                          </div>

                        </div>

                      </div>

                    </article>
                  );
                })

              ) : (

                <div className="px-4 py-12 text-center">

                  <MapPin
                    size={24}
                    className="mx-auto text-slate-400"
                  />

                  <p className="mt-3 text-sm font-medium text-slate-700">
                    No projects found
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Try changing your search or filters.
                  </p>

                </div>

              )}

            </div>

          </div>

        </section>

        {/* =================================================
            SECURITY / DATA NOTE
        ================================================= */}

        <section className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:mt-8">

          <Map
            size={18}
            className="mt-0.5 shrink-0 text-blue-600"
          />

          <div>

            <p className="text-xs font-semibold text-blue-900 sm:text-sm">
              Secure Infrastructure Mapping
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              The interactive base map is provided by
              OpenStreetMap. Project information is currently
              development data. In production, project
              coordinates and related information should be
              retrieved from authenticated backend services
              with appropriate access controls and audit
              logging.
            </p>

          </div>

        </section>

      </div>
    </main>
  );
}