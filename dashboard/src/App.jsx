// // // src/App.jsx
// // import React, { useState, useMemo, useEffect } from "react";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// //   CartesianGrid,
// // } from "recharts";
// // import {
// //   fetchComplaints,
// //   getComplaints,
// //   createComplaint,
// //   updateComplaintStatus,
// //   getActiveSites,
// //   getSites,
// //   getTelemetry
// // } from "./lib/api";


// // // Dummy SOC history (for chart)
// // const socHistory = [
// //   { time: "10:00", soc: 35 },
// //   { time: "11:00", soc: 42 },
// //   { time: "12:00", soc: 55 },
// //   { time: "13:00", soc: 62 },
// //   { time: "14:00", soc: 70 },
// //   { time: "15:00", soc: 74 },
// //   { time: "16:00", soc: 78 },
// // ];

// // // Fallback complaints in case backend is down (keeps UI looking same)
// // const complaintSeed = [
// //   {
// //     id: "OS-1001",
// //     site: "Rooftop – Delhi",
// //     customer: "Akash Jain",
// //     issue: "Grid fail / no power",
// //     status: "OPEN",
// //     priority: "HIGH",
// //     since: "14 Nov 2025, 10:21",
// //   },
// //   {
// //     id: "OS-1002",
// //     site: "Warehouse – Gurgaon",
// //     customer: "Mehta Logistics",
// //     issue: "Low battery backup",
// //     status: "IN_PROGRESS",
// //     priority: "MEDIUM",
// //     since: "13 Nov 2025, 19:05",
// //   },
// //   {
// //     id: "OS-1003",
// //     site: "Villa – Noida",
// //     customer: "Ridhima Taneja",
// //     issue: "Wi-Fi disconnecting",
// //     status: "RESOLVED",
// //     priority: "LOW",
// //     since: "12 Nov 2025, 08:30",
// //   },
// //   {
// //     id: "OS-1004",
// //     site: "Shop – Jaipur",
// //     customer: "Saini Electronics",
// //     issue: "Overload alarm",
// //     status: "OPEN",
// //     priority: "HIGH",
// //     since: "14 Nov 2025, 15:02",
// //   },
// // ];

// // // Dummy fleet sites
// // const sites = [
// //   {
// //     id: "DEL-HYB-00021",
// //     name: "Rooftop – Delhi",
// //     type: "Hybrid 5 kW",
// //     status: "ONLINE",
// //     todayEnergy: "12.4 kWh",
// //     batterySoc: 78,
// //     alarms: 0,
// //     lastSeen: "Now",
// //   },
// //   {
// //     id: "GUR-CML-00007",
// //     name: "Warehouse – Gurgaon",
// //     type: "On-grid 15 kW",
// //     status: "ONLINE",
// //     todayEnergy: "34.8 kWh",
// //     batterySoc: null,
// //     alarms: 1,
// //     lastSeen: "35 sec ago",
// //   },
// //   {
// //     id: "NOD-HYB-00003",
// //     name: "Villa – Noida",
// //     type: "Hybrid 3 kW",
// //     status: "ONLINE",
// //     todayEnergy: "8.2 kWh",
// //     batterySoc: 64,
// //     alarms: 0,
// //     lastSeen: "2 min ago",
// //   },
// //   {
// //     id: "JAI-CML-00011",
// //     name: "Shop – Jaipur",
// //     type: "On-grid 10 kW",
// //     status: "OFFLINE",
// //     todayEnergy: "—",
// //     batterySoc: null,
// //     alarms: 2,
// //     lastSeen: "22 min ago",
// //   },
// //   {
// //     id: "PNQ-HYB-00009",
// //     name: "Bungalow – Pune",
// //     type: "Hybrid 7.5 kW",
// //     status: "ONLINE",
// //     todayEnergy: "16.9 kWh",
// //     batterySoc: 82,
// //     alarms: 0,
// //     lastSeen: "4 min ago",
// //   },
// // ];

// // function App() {
// //   // Filters for complaints
// //   const [statusFilter, setStatusFilter] = useState("ALL");
// //   const [priorityFilter, setPriorityFilter] = useState("ALL");

// //   // Complaints from backend (initialized with seed so UI looks good immediately)
// //   const [complaints, setComplaints] = useState(complaintSeed);
// //   const [complaintsError, setComplaintsError] = useState(null);

// //   // Filters for sites
// //   const [siteSearch, setSiteSearch] = useState("");
// //   const [siteStatusFilter, setSiteStatusFilter] = useState("ALL");

// //   // Load complaints from backend once on mount
// //   useEffect(() => {
// //     async function load() {
// //       try {
// //         const data = await fetchComplaints();
// //         // Convert backend shape -> UI shape (keep look same)
// //         const mapped = data.map((c) => ({
// //           id: c.id,
// //           site: c.site,
// //           customer: c.customer,
// //           issue: c.issue,
// //           status: c.status,      // "OPEN" | "IN_PROGRESS" | "RESOLVED"
// //           priority: c.priority,  // "HIGH" | "MEDIUM" | "LOW"
// //           since: new Date(c.since).toLocaleString(),
// //         }));
// //         setComplaints(mapped);
// //       } catch (err) {
// //         console.error("Failed to load complaints", err);
// //         setComplaintsError("Could not load complaints from server.");
// //       }
// //     }
// //     load();
// //   }, []);

// //   const filteredComplaints = useMemo(() => {
// //     return complaints.filter((c) => {
// //       const statusOk =
// //         statusFilter === "ALL" ? true : c.status === statusFilter;
// //       const priorityOk =
// //         priorityFilter === "ALL" ? true : c.priority === priorityFilter;
// //       return statusOk && priorityOk;
// //     });
// //   }, [complaints, statusFilter, priorityFilter]);

// //   const filteredSites = useMemo(() => {
// //     return sites.filter((s) => {
// //       const statusOk =
// //         siteStatusFilter === "ALL" ? true : s.status === siteStatusFilter;
// //       const searchOk = siteSearch
// //         ? `${s.name} ${s.id} ${s.type}`
// //             .toLowerCase()
// //             .includes(siteSearch.toLowerCase())
// //         : true;
// //       return statusOk && searchOk;
// //     });
// //   }, [siteSearch, siteStatusFilter]);

// //   return (
// //     <div className="os-root">
// //       {/* Sidebar */}
// //       <aside className="os-sidebar">
// //         <div className="os-logo">
// //           <div className="os-logo-mark">OS</div>
// //           <div className="os-logo-text">
// //             <span className="brand">Orient Solar</span>
// //             <span className="sub">Cloud Console</span>
// //           </div>
// //         </div>

// //         <nav className="os-nav">
// //           <span className="os-nav-section">Monitoring</span>
// //           <button className="os-nav-item os-nav-item--active">
// //             <span className="dot dot--green" />
// //             Fleet overview
// //           </button>
// //           <button className="os-nav-item">
// //             <span className="dot dot--orange" />
// //             Real-time data
// //           </button>
// //           <button className="os-nav-item">
// //             <span className="dot dot--purple" />
// //             Complaints
// //           </button>

// //           <span className="os-nav-section">Configuration</span>
// //           <button className="os-nav-item">Devices &amp; Adapters</button>
// //           <button className="os-nav-item">Customers</button>

// //           <span className="os-nav-section">Admin</span>
// //           <button className="os-nav-item">Users &amp; Roles</button>
// //           <button className="os-nav-item">Billing &amp; Plans</button>
// //         </nav>

// //         <div className="os-sidebar-footer">
// //           <div className="os-user">
// //             <div className="os-user-avatar">PT</div>
// //             <div className="os-user-meta">
// //               <span className="os-user-name">Parth / Ridhima</span>
// //               <span className="os-user-role">Super Admin</span>
// //             </div>
// //           </div>
// //         </div>
// //       </aside>

// //       {/* Main content */}
// //       <main className="os-main">
// //         {/* Header */}
// //         <header className="os-header">
// //           <div>
// //             <h1 className="os-title">Fleet Overview</h1>
// //             <p className="os-subtitle">
// //               Live inverters connected via Orient Solar smart adapter
// //             </p>
// //           </div>
// //           <div className="os-header-actions">
// //             <button className="os-btn os-btn--ghost">Export CSV</button>
// //             <button className="os-btn os-btn--primary">Create Ticket</button>
// //           </div>
// //         </header>

// //         {/* KPI cards */}
// //         <section className="os-grid os-grid--kpi">
// //           <div className="os-card kpi-card">
// //             <div className="kpi-label">Total Active Sites</div>
// //             <div className="kpi-value">126</div>
// //             <div className="kpi-trend kpi-trend--up">+7 this week</div>
// //           </div>

// //           <div className="os-card kpi-card">
// //             <div className="kpi-label">Energy Today</div>
// //             <div className="kpi-value">4.83 MWh</div>
// //             <div className="kpi-sub">Across all Orient Solar inverters</div>
// //           </div>

// //           <div className="os-card kpi-card">
// //             <div className="kpi-label">Active Alarms</div>
// //             <div className="kpi-value kpi-value--warning">09</div>
// //             <div className="kpi-trend kpi-trend--down">-3 vs yesterday</div>
// //           </div>

// //           <div className="os-card kpi-card">
// //             <div className="kpi-label">Open Complaints</div>
// //             <div className="kpi-value kpi-value--danger">02</div>
// //             <div className="kpi-sub">Respond within SLA: 4 hrs</div>
// //           </div>
// //         </section>

// //         {/* Middle layout: solar scene + chart + complaints */}
// //         <section className="os-grid os-grid--middle">
// //           {/* Solar visual + quick summary */}
// //           <div className="os-card os-solar-card">
// //             <div className="os-solar-header">
// //               <div>
// //                 <h2>Delhi – Residential Hybrid 5kW</h2>
// //                 <p>Adapter ID: OS-HYB-DEL-00021 · Online</p>
// //               </div>
// //               <span className="os-pill os-pill--online">ONLINE</span>
// //             </div>

// //             <div className="os-solar-layout">
// //               <div className="os-solar-graphic">
// //                 <div className="roof" />
// //                 <div className="panel-grid">
// //                   {Array.from({ length: 8 }).map((_, i) => (
// //                     <div key={i} className="panel" />
// //                   ))}
// //                 </div>

// //                 <div className="os-flow-line os-flow-line--pv" />
// //                 <div className="os-flow-line os-flow-line--grid" />
// //                 <div className="os-flow-line os-flow-line--load" />

// //                 <div className="os-node os-node--inverter">INV</div>
// //                 <div className="os-node os-node--battery">BAT</div>
// //                 <div className="os-node os-node--grid">GRID</div>
// //                 <div className="os-node os-node--load">LOAD</div>
// //               </div>

// //               <div className="os-solar-metrics">
// //                 <MetricRow label="PV Power" value="3.24 kW" accent="green" />
// //                 <MetricRow label="Battery SOC" value="78 %" accent="blue" />
// //                 <MetricRow label="Load Power" value="1.92 kW" accent="orange" />
// //                 <MetricRow label="Grid Status" value="Healthy" accent="teal" />
// //               </div>
// //             </div>
// //           </div>

// //           {/* SOC chart */}
// //           <div className="os-card os-chart-card">
// //             <div className="os-card-header">
// //               <div>
// //                 <h2>Battery SOC – last 6 hours</h2>
// //                 <p>Live snapshot from connected site</p>
// //               </div>
// //             </div>

// //             <div className="os-chart-wrapper">
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <LineChart data={socHistory}>
// //                   <defs>
// //                     <linearGradient id="socGradient" x1="0" y1="0" x2="0" y2="1">
// //                       <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
// //                       <stop offset="100%" stopColor="#22c55e" stopOpacity={0.1} />
// //                     </linearGradient>
// //                   </defs>
// //                   <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
// //                   <XAxis
// //                     dataKey="time"
// //                     tick={{ fill: "#9ca3af", fontSize: 11 }}
// //                     tickLine={false}
// //                     axisLine={{ stroke: "#1f2937" }}
// //                   />
// //                   <YAxis
// //                     unit="%"
// //                     tick={{ fill: "#9ca3af", fontSize: 11 }}
// //                     tickLine={false}
// //                     axisLine={{ stroke: "#1f2937" }}
// //                     domain={[0, 100]}
// //                   />
// //                   <Tooltip
// //                     contentStyle={{
// //                       backgroundColor: "#020617",
// //                       border: "1px solid #1f2937",
// //                       borderRadius: 8,
// //                       padding: "8px 10px",
// //                     }}
// //                     labelStyle={{ color: "#e5e7eb" }}
// //                     itemStyle={{ color: "#22c55e" }}
// //                   />
// //                   <Line
// //                     type="monotone"
// //                     dataKey="soc"
// //                     stroke="#22c55e"
// //                     strokeWidth={2.5}
// //                     dot={{ r: 3, strokeWidth: 1, stroke: "#0f172a" }}
// //                     activeDot={{ r: 5 }}
// //                     fill="url(#socGradient)"
// //                   />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </div>

// //           {/* Complaints panel */}
// //           <div className="os-card os-complaints-card">
// //             <div className="os-card-header os-card-header--row">
// //               <div>
// //                 <h2>Customer Complaints</h2>
// //                 <p>Tickets raised from Orient Solar mobile app</p>
// //               </div>
// //               <div className="os-filters">
// //                 <select
// //                   value={statusFilter}
// //                   onChange={(e) => setStatusFilter(e.target.value)}
// //                 >
// //                   <option value="ALL">Status: All</option>
// //                   <option value="OPEN">Open</option>
// //                   <option value="IN_PROGRESS">In Progress</option>
// //                   <option value="RESOLVED">Resolved</option>
// //                 </select>
// //                 <select
// //                   value={priorityFilter}
// //                   onChange={(e) => setPriorityFilter(e.target.value)}
// //                 >
// //                   <option value="ALL">Priority: All</option>
// //                   <option value="HIGH">High</option>
// //                   <option value="MEDIUM">Medium</option>
// //                   <option value="LOW">Low</option>
// //                 </select>
// //               </div>
// //             </div>

// //             {complaintsError && (
// //               <p style={{ fontSize: 11, color: "#f97316", marginTop: 4 }}>
// //                 {complaintsError}
// //               </p>
// //             )}

// //             <div className="os-table-wrapper">
// //               <table className="os-table">
// //                 <thead>
// //                   <tr>
// //                     <th>ID</th>
// //                     <th>Site</th>
// //                     <th>Customer</th>
// //                     <th>Issue</th>
// //                     <th>Status</th>
// //                     <th>Priority</th>
// //                     <th>Since</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredComplaints.map((c) => (
// //                     <tr key={c.id}>
// //                       <td>{c.id}</td>
// //                       <td>{c.site}</td>
// //                       <td>{c.customer}</td>
// //                       <td>{c.issue}</td>
// //                       <td>
// //                         <span
// //                           className={`os-pill os-pill--status os-pill--status-${c.status.toLowerCase()}`}
// //                         >
// //                           {c.status.replace("_", " ")}
// //                         </span>
// //                       </td>
// //                       <td>
// //                         <span
// //                           className={`os-pill os-pill--priority os-pill--priority-${c.priority.toLowerCase()}`}
// //                         >
// //                           {c.priority}
// //                         </span>
// //                       </td>
// //                       <td>{c.since}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>

// //           {/* Sites / Fleet section */}
// //           <div className="os-card os-sites-card">
// //             <div className="os-sites-header">
// //               <div>
// //                 <h2>All Sites</h2>
// //                 <p>Fleet connected via Orient Solar adapter</p>
// //               </div>
// //               <div className="os-sites-controls">
// //                 <input
// //                   type="text"
// //                   placeholder="Search site / ID / type"
// //                   value={siteSearch}
// //                   onChange={(e) => setSiteSearch(e.target.value)}
// //                 />
// //                 <select
// //                   value={siteStatusFilter}
// //                   onChange={(e) => setSiteStatusFilter(e.target.value)}
// //                 >
// //                   <option value="ALL">Status: All</option>
// //                   <option value="ONLINE">Online</option>
// //                   <option value="OFFLINE">Offline</option>
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="os-table-wrapper os-table-wrapper--sites">
// //               <table className="os-table os-table--sites">
// //                 <thead>
// //                   <tr>
// //                     <th>Site</th>
// //                     <th>Site ID</th>
// //                     <th>Type</th>
// //                     <th>Status</th>
// //                     <th>Energy today</th>
// //                     <th>Battery SOC</th>
// //                     <th>Alarms</th>
// //                     <th>Last seen</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredSites.map((s) => (
// //                     <tr key={s.id}>
// //                       <td>{s.name}</td>
// //                       <td>{s.id}</td>
// //                       <td>{s.type}</td>
// //                       <td>
// //                         <span
// //                           className={
// //                             s.status === "ONLINE"
// //                               ? "os-pill os-pill--online"
// //                               : "os-pill os-pill--offline"
// //                           }
// //                         >
// //                           {s.status}
// //                         </span>
// //                       </td>
// //                       <td>{s.todayEnergy}</td>
// //                       <td>
// //                         {s.batterySoc != null ? `${s.batterySoc} %` : "—"}
// //                       </td>
// //                       <td>
// //                         {s.alarms > 0 ? (
// //                           <span className="os-alarm-count">
// //                             {s.alarms} active
// //                           </span>
// //                         ) : (
// //                           <span className="os-alarm-ok">Clear</span>
// //                         )}
// //                       </td>
// //                       <td>{s.lastSeen}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </section>
// //       </main>
// //     </div>
// //   );
// // }

// // function MetricRow({ label, value, accent }) {
// //   return (
// //     <div className="metric-row">
// //       <div className={`metric-dot metric-dot--${accent}`} />
// //       <div className="metric-text">
// //         <span className="metric-label">{label}</span>
// //         <span className="metric-value">{value}</span>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;

// // src/App.jsx
// import React, { useState, useMemo, useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import {
//   fetchComplaints,
//   getSites,
// } from "./lib/api";

// // Dummy SOC history (for chart)
// const socHistory = [
//   { time: "10:00", soc: 35 },
//   { time: "11:00", soc: 42 },
//   { time: "12:00", soc: 55 },
//   { time: "13:00", soc: 62 },
//   { time: "14:00", soc: 70 },
//   { time: "15:00", soc: 74 },
//   { time: "16:00", soc: 78 },
// ];

// // Fallback complaints in case backend is down
// const complaintSeed = [
//   {
//     id: "OS-1001",
//     site: "Rooftop – Delhi",
//     customer: "Akash Jain",
//     issue: "Grid fail / no power",
//     status: "OPEN",
//     priority: "HIGH",
//     since: "14 Nov 2025, 10:21",
//   },
//   {
//     id: "OS-1002",
//     site: "Warehouse – Gurgaon",
//     customer: "Mehta Logistics",
//     issue: "Low battery backup",
//     status: "IN_PROGRESS",
//     priority: "MEDIUM",
//     since: "13 Nov 2025, 19:05",
//   },
//   {
//     id: "OS-1003",
//     site: "Villa – Noida",
//     customer: "Ridhima Taneja",
//     issue: "Wi-Fi disconnecting",
//     status: "RESOLVED",
//     priority: "LOW",
//     since: "12 Nov 2025, 08:30",
//   },
//   {
//     id: "OS-1004",
//     site: "Shop – Jaipur",
//     customer: "Saini Electronics",
//     issue: "Overload alarm",
//     status: "OPEN",
//     priority: "HIGH",
//     since: "14 Nov 2025, 15:02",
//   },
// ];

// function App() {
//   /* ------------ SITES (from backend) ------------ */
//   const [sites, setSites] = useState([]);
//   const [sitesError, setSitesError] = useState(null);

//   useEffect(() => {
//     async function loadSites() {
//       try {
//         const data = await getSites();
//         setSites(data);
//       } catch (err) {
//         console.error("Failed to load sites", err);
//         setSitesError("Could not load sites from server.");
//       }
//     }
//     loadSites();
//   }, []);

//   /* ------------ COMPLAINTS ------------ */
//   const [statusFilter, setStatusFilter] = useState("ALL");
//   const [priorityFilter, setPriorityFilter] = useState("ALL");

//   const [complaints, setComplaints] = useState(complaintSeed);
//   const [complaintsError, setComplaintsError] = useState(null);

//   useEffect(() => {
//     async function loadComplaints() {
//       try {
//         const data = await fetchComplaints();
//         const mapped = data.map((c) => ({
//           id: c.id,
//           site: c.site,
//           customer: c.customer,
//           issue: c.issue,
//           status: c.status,
//           priority: c.priority,
//           since: new Date(c.since).toLocaleString(),
//         }));
//         setComplaints(mapped);
//       } catch (err) {
//         console.error("Failed to load complaints", err);
//         setComplaintsError("Could not load complaints from server.");
//       }
//     }
//     loadComplaints();
//   }, []);

//   /* ------------ FILTERS ------------ */
//   const [siteSearch, setSiteSearch] = useState("");
//   const [siteStatusFilter, setSiteStatusFilter] = useState("ALL");

//   const filteredComplaints = useMemo(() => {
//     return complaints.filter((c) => {
//       const statusOk =
//         statusFilter === "ALL" ? true : c.status === statusFilter;
//       const priorityOk =
//         priorityFilter === "ALL" ? true : c.priority === priorityFilter;
//       return statusOk && priorityOk;
//     });
//   }, [complaints, statusFilter, priorityFilter]);

//   const filteredSites = useMemo(() => {
//     return sites.filter((s) => {
//       const statusOk =
//         siteStatusFilter === "ALL" ? true : s.status === siteStatusFilter;
//       const searchOk = siteSearch
//         ? `${s.name} ${s.id} ${s.type}`
//             .toLowerCase()
//             .includes(siteSearch.toLowerCase())
//         : true;
//       return statusOk && searchOk;
//     });
//   }, [sites, siteSearch, siteStatusFilter]);

//   return (
//     <div className="os-root">
//       {/* Sidebar */}
//       <aside className="os-sidebar">
//         <div className="os-logo">
//           <div className="os-logo-mark">OS</div>
//           <div className="os-logo-text">
//             <span className="brand">Orient Solar</span>
//             <span className="sub">Cloud Console</span>
//           </div>
//         </div>

//         <nav className="os-nav">
//           <span className="os-nav-section">Monitoring</span>
//           <button className="os-nav-item os-nav-item--active">
//             <span className="dot dot--green" />
//             Fleet overview
//           </button>
//           <button className="os-nav-item">
//             <span className="dot dot--orange" />
//             Real-time data
//           </button>
//           <button className="os-nav-item">
//             <span className="dot dot--purple" />
//             Complaints
//           </button>

//           <span className="os-nav-section">Configuration</span>
//           <button className="os-nav-item">Devices &amp; Adapters</button>
//           <button className="os-nav-item">Customers</button>

//           <span className="os-nav-section">Admin</span>
//           <button className="os-nav-item">Users &amp; Roles</button>
//           <button className="os-nav-item">Billing &amp; Plans</button>
//         </nav>

//         <div className="os-sidebar-footer">
//           <div className="os-user">
//             <div className="os-user-avatar">PT</div>
//             <div className="os-user-meta">
//               <span className="os-user-name">Parth / Ridhima</span>
//               <span className="os-user-role">Super Admin</span>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="os-main">
//         {/* Header */}
//         <header className="os-header">
//           <div>
//             <h1 className="os-title">Fleet Overview</h1>
//             <p className="os-subtitle">
//               Live inverters connected via Orient Solar smart adapter
//             </p>
//           </div>
//           <div className="os-header-actions">
//             <button className="os-btn os-btn--ghost">Export CSV</button>
//             <button className="os-btn os-btn--primary">Create Ticket</button>
//           </div>
//         </header>

//         {/* KPI cards */}
//         <section className="os-grid os-grid--kpi">
//           <div className="os-card kpi-card">
//             <div className="kpi-label">Total Active Sites</div>
//             <div className="kpi-value">{sites.length || "—"}</div>
//             <div className="kpi-trend kpi-trend--up">+7 this week</div>
//           </div>

//           <div className="os-card kpi-card">
//             <div className="kpi-label">Energy Today</div>
//             <div className="kpi-value">4.83 MWh</div>
//             <div className="kpi-sub">Across all Orient Solar inverters</div>
//           </div>

//           <div className="os-card kpi-card">
//             <div className="kpi-label">Active Alarms</div>
//             <div className="kpi-value kpi-value--warning">09</div>
//             <div className="kpi-trend kpi-trend--down">-3 vs yesterday</div>
//           </div>

//           <div className="os-card kpi-card">
//             <div className="kpi-label">Open Complaints</div>
//             <div className="kpi-value kpi-value--danger">
//               {filteredComplaints.length.toString().padStart(2, "0")}
//             </div>
//             <div className="kpi-sub">Respond within SLA: 4 hrs</div>
//           </div>
//         </section>

//         {/* Middle layout: solar scene + chart + complaints */}
//         <section className="os-grid os-grid--middle">
//           {/* Solar visual + quick summary */}
//           <div className="os-card os-solar-card">
//             <div className="os-solar-header">
//               <div>
//                 <h2>Delhi – Residential Hybrid 5kW</h2>
//                 <p>Adapter ID: OS-HYB-DEL-00021 · Online</p>
//               </div>
//               <span className="os-pill os-pill--online">ONLINE</span>
//             </div>

//             <div className="os-solar-layout">
//               <div className="os-solar-graphic">
//                 <div className="roof" />
//                 <div className="panel-grid">
//                   {Array.from({ length: 8 }).map((_, i) => (
//                     <div key={i} className="panel" />
//                   ))}
//                 </div>

//                 <div className="os-flow-line os-flow-line--pv" />
//                 <div className="os-flow-line os-flow-line--grid" />
//                 <div className="os-flow-line os-flow-line--load" />

//                 <div className="os-node os-node--inverter">INV</div>
//                 <div className="os-node os-node--battery">BAT</div>
//                 <div className="os-node os-node--grid">GRID</div>
//                 <div className="os-node os-node--load">LOAD</div>
//               </div>

//               <div className="os-solar-metrics">
//                 <MetricRow label="PV Power" value="3.24 kW" accent="green" />
//                 <MetricRow label="Battery SOC" value="78 %" accent="blue" />
//                 <MetricRow label="Load Power" value="1.92 kW" accent="orange" />
//                 <MetricRow label="Grid Status" value="Healthy" accent="teal" />
//               </div>
//             </div>
//           </div>

//           {/* SOC chart */}
//           <div className="os-card os-chart-card">
//             <div className="os-card-header">
//               <div>
//                 <h2>Battery SOC – last 6 hours</h2>
//                 <p>Live snapshot from connected site</p>
//               </div>
//             </div>

//             <div className="os-chart-wrapper">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={socHistory}>
//                   <defs>
//                     <linearGradient id="socGradient" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
//                       <stop offset="100%" stopColor="#22c55e" stopOpacity={0.1} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
//                   <XAxis
//                     dataKey="time"
//                     tick={{ fill: "#9ca3af", fontSize: 11 }}
//                     tickLine={false}
//                     axisLine={{ stroke: "#1f2937" }}
//                   />
//                   <YAxis
//                     unit="%"
//                     tick={{ fill: "#9ca3af", fontSize: 11 }}
//                     tickLine={false}
//                     axisLine={{ stroke: "#1f2937" }}
//                     domain={[0, 100]}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#020617",
//                       border: "1px solid #1f2937",
//                       borderRadius: 8,
//                       padding: "8px 10px",
//                     }}
//                     labelStyle={{ color: "#e5e7eb" }}
//                     itemStyle={{ color: "#22c55e" }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="soc"
//                     stroke="#22c55e"
//                     strokeWidth={2.5}
//                     dot={{ r: 3, strokeWidth: 1, stroke: "#0f172a" }}
//                     activeDot={{ r: 5 }}
//                     fill="url(#socGradient)"
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Complaints panel */}
//           <div className="os-card os-complaints-card">
//             <div className="os-card-header os-card-header--row">
//               <div>
//                 <h2>Customer Complaints</h2>
//                 <p>Tickets raised from Orient Solar mobile app</p>
//               </div>
//               <div className="os-filters">
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                   <option value="ALL">Status: All</option>
//                   <option value="OPEN">Open</option>
//                   <option value="IN_PROGRESS">In Progress</option>
//                   <option value="RESOLVED">Resolved</option>
//                 </select>
//                 <select
//                   value={priorityFilter}
//                   onChange={(e) => setPriorityFilter(e.target.value)}
//                 >
//                   <option value="ALL">Priority: All</option>
//                   <option value="HIGH">High</option>
//                   <option value="MEDIUM">Medium</option>
//                   <option value="LOW">Low</option>
//                 </select>
//               </div>
//             </div>

//             {complaintsError && (
//               <p style={{ fontSize: 11, color: "#f97316", marginTop: 4 }}>
//                 {complaintsError}
//               </p>
//             )}

//             <div className="os-table-wrapper">
//               <table className="os-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Site</th>
//                     <th>Customer</th>
//                     <th>Issue</th>
//                     <th>Status</th>
//                     <th>Priority</th>
//                     <th>Since</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredComplaints.map((c) => (
//                     <tr key={c.id}>
//                       <td>{c.id}</td>
//                       <td>{c.site}</td>
//                       <td>{c.customer}</td>
//                       <td>{c.issue}</td>
//                       <td>
//                         <span
//                           className={`os-pill os-pill--status os-pill--status-${c.status.toLowerCase()}`}
//                         >
//                           {c.status.replace("_", " ")}
//                         </span>
//                       </td>
//                       <td>
//                         <span
//                           className={`os-pill os-pill--priority os-pill--priority-${c.priority.toLowerCase()}`}
//                         >
//                           {c.priority}
//                         </span>
//                       </td>
//                       <td>{c.since}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Sites / Fleet section */}
//           <div className="os-card os-sites-card">
//             <div className="os-sites-header">
//               <div>
//                 <h2>All Sites</h2>
//                 <p>Fleet connected via Orient Solar adapter</p>
//               </div>
//               <div className="os-sites-controls">
//                 <input
//                   type="text"
//                   placeholder="Search site / ID / type"
//                   value={siteSearch}
//                   onChange={(e) => setSiteSearch(e.target.value)}
//                 />
//                 <select
//                   value={siteStatusFilter}
//                   onChange={(e) => setSiteStatusFilter(e.target.value)}
//                 >
//                   <option value="ALL">Status: All</option>
//                   <option value="ONLINE">Online</option>
//                   <option value="OFFLINE">Offline</option>
//                 </select>
//               </div>
//             </div>

//             {sitesError && (
//               <p style={{ fontSize: 11, color: "#f97316", marginBottom: 6 }}>
//                 {sitesError}
//               </p>
//             )}

//             <div className="os-table-wrapper os-table-wrapper--sites">
//               <table className="os-table os-table--sites">
//                 <thead>
//                   <tr>
//                     <th>Site</th>
//                     <th>Site ID</th>
//                     <th>Type</th>
//                     <th>Status</th>
//                     <th>Energy today</th>
//                     <th>Battery SOC</th>
//                     <th>Alarms</th>
//                     <th>Last seen</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredSites.map((s) => (
//                     <tr key={s.id}>
//                       <td>{s.name}</td>
//                       <td>{s.id}</td>
//                       <td>{s.type}</td>
//                       <td>
//                         <span
//                           className={
//                             s.status === "ONLINE"
//                               ? "os-pill os-pill--online"
//                               : "os-pill os-pill--offline"
//                           }
//                         >
//                           {s.status}
//                         </span>
//                       </td>
//                       <td>{s.todayEnergy}</td>
//                       <td>
//                         {s.batterySoc != null ? `${s.batterySoc} %` : "—"}
//                       </td>
//                       <td>
//                         {s.alarms > 0 ? (
//                           <span className="os-alarm-count">
//                             {s.alarms} active
//                           </span>
//                         ) : (
//                           <span className="os-alarm-ok">Clear</span>
//                         )}
//                       </td>
//                       <td>{s.lastSeen}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// function MetricRow({ label, value, accent }) {
//   return (
//     <div className="metric-row">
//       <div className={`metric-dot metric-dot--${accent}`} />
//       <div className="metric-text">
//         <span className="metric-label">{label}</span>
//         <span className="metric-value">{value}</span>
//       </div>
//     </div>
//   );
// }

// export default App;

// src/App.jsx
import React, { useState, useMemo, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  fetchComplaints,
  createComplaint,
  updateComplaintStatus,
  getSites,
  getTelemetry,
} from "./lib/api";

// Initial dummy SOC history (used until telemetry starts coming)
const initialSocHistory = [
  { time: "10:00", soc: 35 },
  { time: "11:00", soc: 42 },
  { time: "12:00", soc: 55 },
  { time: "13:00", soc: 62 },
  { time: "14:00", soc: 70 },
  { time: "15:00", soc: 74 },
  { time: "16:00", soc: 78 },
];

// Fallback complaints in case backend is down (keeps UI looking same)
const complaintSeed = [
  {
    id: "OS-1001",
    site: "Rooftop – Delhi",
    customer: "Akash Jain",
    issue: "Grid fail / no power",
    status: "OPEN",
    priority: "HIGH",
    since: "14 Nov 2025, 10:21",
  },
  {
    id: "OS-1002",
    site: "Warehouse – Gurgaon",
    customer: "Mehta Logistics",
    issue: "Low battery backup",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    since: "13 Nov 2025, 19:05",
  },
  {
    id: "OS-1003",
    site: "Villa – Noida",
    customer: "Ridhima Taneja",
    issue: "Wi-Fi disconnecting",
    status: "RESOLVED",
    priority: "LOW",
    since: "12 Nov 2025, 08:30",
  },
  {
    id: "OS-1004",
    site: "Shop – Jaipur",
    customer: "Saini Electronics",
    issue: "Overload alarm",
    status: "OPEN",
    priority: "HIGH",
    since: "14 Nov 2025, 15:02",
  },
];

function App() {
  /* ---------- Sites & telemetry ---------- */
  const [sites, setSites] = useState([]);
  const [sitesError, setSitesError] = useState(null);
  const [selectedSiteId, setSelectedSiteId] = useState("SITE-001");

  const [telemetry, setTelemetry] = useState(null);
  const [socHistory, setSocHistory] = useState(initialSocHistory);

  /* ---------- Complaints ---------- */
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [complaints, setComplaints] = useState(complaintSeed);
  const [complaintsError, setComplaintsError] = useState(null);

  const [siteSearch, setSiteSearch] = useState("");
  const [siteStatusFilter, setSiteStatusFilter] = useState("ALL");

  // Load sites from backend once
  useEffect(() => {
    async function loadSites() {
      try {
        const data = await getSites();

        // Map backend shape -> UI shape
        const mapped = data.map((s) => ({
          id: s.id,
          name: s.name,
          type: s.type,
          status: (s.status || "online").toUpperCase(), // ONLINE / OFFLINE
          todayEnergy: s.energyToday || s.energy_today || "—",
          batterySoc: s.batterySOC ?? s.batterySoc ?? null,
          alarms: s.alarms ?? 0,
          lastSeen: s.lastSeenText
            ? s.lastSeenText
            : s.lastSeen
            ? new Date(s.lastSeen).toLocaleTimeString()
            : "—",
        }));

        setSites(mapped);

        // If no site selected yet, select first
        if (!selectedSiteId && mapped.length > 0) {
          setSelectedSiteId(mapped[0].id);
        }
      } catch (err) {
        console.error("Failed to load sites", err);
        setSitesError("Could not load sites from server.");
      }
    }

    loadSites();
  }, [selectedSiteId]);

  // Load complaints from backend once on mount
  useEffect(() => {
    async function loadComplaints() {
      try {
        const data = await fetchComplaints();
        const mapped = data.map((c) => ({
          id: c.id,
          site: c.site,
          customer: c.customer,
          issue: c.issue,
          status: c.status,
          priority: c.priority,
          since: new Date(c.since).toLocaleString(),
        }));
        setComplaints(mapped);
      } catch (err) {
        console.error("Failed to load complaints", err);
        setComplaintsError("Could not load complaints from server.");
      }
    }
    loadComplaints();
  }, []);

  // Poll telemetry for selected site every 5 seconds
  useEffect(() => {
    if (!selectedSiteId) return;

    async function loadTelemetryOnce() {
      try {
        const data = await getTelemetry(selectedSiteId);
        setTelemetry(data);

        const socValue =
          data.batterySoc ??
          data.batterySOC ??
          data.battery_soc ??
          null;

        if (socValue != null) {
          const timeLabel = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          setSocHistory((prev) => {
            const next = [...prev, { time: timeLabel, soc: socValue }];
            // keep last 12 points
            return next.slice(-12);
          });
        }
      } catch (err) {
        console.error("Failed to load telemetry", err);
      }
    }

    // run once immediately and then every 5s
    loadTelemetryOnce();
    const interval = setInterval(loadTelemetryOnce, 5000);
    return () => clearInterval(interval);
  }, [selectedSiteId]);

  /* ---------- Derived views ---------- */

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const statusOk =
        statusFilter === "ALL" ? true : c.status === statusFilter;
      const priorityOk =
        priorityFilter === "ALL" ? true : c.priority === priorityFilter;
      return statusOk && priorityOk;
    });
  }, [complaints, statusFilter, priorityFilter]);

  const filteredSites = useMemo(() => {
    return sites.filter((s) => {
      const statusOk =
        siteStatusFilter === "ALL" ? true : s.status === siteStatusFilter;
      const searchOk = siteSearch
        ? `${s.name} ${s.id} ${s.type}`
            .toLowerCase()
            .includes(siteSearch.toLowerCase())
        : true;
      return statusOk && searchOk;
    });
  }, [sites, siteSearch, siteStatusFilter]);

  const activeSite =
    sites.find((s) => s.id === selectedSiteId) || filteredSites[0] || null;

  // Telemetry-backed values with fallback
  const pvPowerDisplay =
    telemetry && telemetry.pvPower != null
      ? `${telemetry.pvPower.toFixed(2)} kW`
      : "3.24 kW";

  const batterySocDisplay =
    telemetry && (telemetry.batterySoc ?? telemetry.batterySOC) != null
      ? `${(telemetry.batterySoc ?? telemetry.batterySOC).toFixed(0)} %`
      : "78 %";

  const loadPowerDisplay =
    telemetry && telemetry.loadPower != null
      ? `${telemetry.loadPower.toFixed(2)} kW`
      : "1.92 kW";

  const gridStatusDisplay =
    telemetry && telemetry.inverterMode
      ? telemetry.inverterMode === "BACKUP"
        ? "Backup"
        : "Grid On"
      : "Healthy";

  /* ---------- UI ---------- */

  return (
    <div className="os-root">
      {/* Sidebar */}
      <aside className="os-sidebar">
        <div className="os-logo">
          <div className="os-logo-mark">OS</div>
          <div className="os-logo-text">
            <span className="brand">Orient Solar</span>
            <span className="sub">Cloud Console</span>
          </div>
        </div>

        <nav className="os-nav">
          <span className="os-nav-section">Monitoring</span>
          <button className="os-nav-item os-nav-item--active">
            <span className="dot dot--green" />
            Fleet overview
          </button>
          <button className="os-nav-item">
            <span className="dot dot--orange" />
            Real-time data
          </button>
          <button className="os-nav-item">
            <span className="dot dot--purple" />
            Complaints
          </button>

          <span className="os-nav-section">Configuration</span>
          <button className="os-nav-item">Devices &amp; Adapters</button>
          <button className="os-nav-item">Customers</button>

          <span className="os-nav-section">Admin</span>
          <button className="os-nav-item">Users &amp; Roles</button>
          <button className="os-nav-item">Billing &amp; Plans</button>
        </nav>

        <div className="os-sidebar-footer">
          <div className="os-user">
            <div className="os-user-avatar">PT</div>
            <div className="os-user-meta">
              <span className="os-user-name">Parth / Ridhima</span>
              <span className="os-user-role">Super Admin</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="os-main">
        {/* Header */}
        <header className="os-header">
          <div>
            <h1 className="os-title">Fleet Overview</h1>
            <p className="os-subtitle">
              Live inverters connected via Orient Solar smart adapter
            </p>
          </div>
          <div className="os-header-actions">
            <button className="os-btn os-btn--ghost">Export CSV</button>
            <button className="os-btn os-btn--primary">Create Ticket</button>
          </div>
        </header>

        {/* KPI cards */}
        <section className="os-grid os-grid--kpi">
          <div className="os-card kpi-card">
            <div className="kpi-label">Total Active Sites</div>
            <div className="kpi-value">{sites.length || 0}</div>
            <div className="kpi-trend kpi-trend--up">+7 this week</div>
          </div>

          <div className="os-card kpi-card">
            <div className="kpi-label">Energy Today</div>
            <div className="kpi-value">4.83 MWh</div>
            <div className="kpi-sub">Across all Orient Solar inverters</div>
          </div>

          <div className="os-card kpi-card">
            <div className="kpi-label">Active Alarms</div>
            <div className="kpi-value kpi-value--warning">09</div>
            <div className="kpi-trend kpi-trend--down">-3 vs yesterday</div>
          </div>

          <div className="os-card kpi-card">
            <div className="kpi-label">Open Complaints</div>
            <div className="kpi-value kpi-value--danger">
              {complaints.filter((c) => c.status === "OPEN").length}
            </div>
            <div className="kpi-sub">Respond within SLA: 4 hrs</div>
          </div>
        </section>

        {/* Middle layout: solar scene + chart + complaints + sites */}
        <section className="os-grid os-grid--middle">
          {/* Solar visual + quick summary */}
          <div className="os-card os-solar-card">
            <div className="os-solar-header">
              <div>
                <h2>
                  {activeSite
                    ? `${activeSite.name} (${activeSite.type})`
                    : "Delhi – Residential Hybrid 5kW"}
                </h2>
                <p>
                  Adapter ID:{" "}
                  {activeSite ? activeSite.id : "OS-HYB-DEL-00021"} ·{" "}
                  {activeSite ? activeSite.status : "ONLINE"}
                </p>
              </div>
              <span className="os-pill os-pill--online">
                {activeSite ? activeSite.status : "ONLINE"}
              </span>
            </div>

            <div className="os-solar-layout">
              <div className="os-solar-graphic">
                <div className="roof" />
                <div className="panel-grid">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="panel" />
                  ))}
                </div>

                <div className="os-flow-line os-flow-line--pv" />
                <div className="os-flow-line os-flow-line--grid" />
                <div className="os-flow-line os-flow-line--load" />

                <div className="os-node os-node--inverter">INV</div>
                <div className="os-node os-node--battery">BAT</div>
                <div className="os-node os-node--grid">GRID</div>
                <div className="os-node os-node--load">LOAD</div>
              </div>

              <div className="os-solar-metrics">
                <MetricRow label="PV Power" value={pvPowerDisplay} accent="green" />
                <MetricRow
                  label="Battery SOC"
                  value={batterySocDisplay}
                  accent="blue"
                />
                <MetricRow
                  label="Load Power"
                  value={loadPowerDisplay}
                  accent="orange"
                />
                <MetricRow
                  label="Grid Status"
                  value={gridStatusDisplay}
                  accent="teal"
                />
              </div>
            </div>
          </div>

          {/* SOC chart */}
          <div className="os-card os-chart-card">
            <div className="os-card-header">
              <div>
                <h2>Battery SOC – last readings</h2>
                <p>Live snapshot from connected site</p>
              </div>
            </div>

            <div className="os-chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={socHistory}>
                  <defs>
                    <linearGradient id="socGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis
                    dataKey="time"
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#1f2937" }}
                  />
                  <YAxis
                    unit="%"
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#1f2937" }}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#020617",
                      border: "1px solid #1f2937",
                      borderRadius: 8,
                      padding: "8px 10px",
                    }}
                    labelStyle={{ color: "#e5e7eb" }}
                    itemStyle={{ color: "#22c55e" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="soc"
                    stroke="#22c55e"
                    strokeWidth={2.5}
                    dot={{ r: 3, strokeWidth: 1, stroke: "#0f172a" }}
                    activeDot={{ r: 5 }}
                    fill="url(#socGradient)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Complaints panel */}
          <div className="os-card os-complaints-card">
            <div className="os-card-header os-card-header--row">
              <div>
                <h2>Customer Complaints</h2>
                <p>Tickets raised from Orient Solar mobile app</p>
              </div>
              <div className="os-filters">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="ALL">Status: All</option>
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                </select>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="ALL">Priority: All</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
            </div>

            {complaintsError && (
              <p style={{ fontSize: 11, color: "#f97316", marginTop: 4 }}>
                {complaintsError}
              </p>
            )}

            <div className="os-table-wrapper">
              <table className="os-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Site</th>
                    <th>Customer</th>
                    <th>Issue</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Since</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.site}</td>
                      <td>{c.customer}</td>
                      <td>{c.issue}</td>
                      <td>
                        <span
                          className={`os-pill os-pill--status os-pill--status-${c.status.toLowerCase()}`}
                        >
                          {c.status.replace("_", " ")}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`os-pill os-pill--priority os-pill--priority-${c.priority.toLowerCase()}`}
                        >
                          {c.priority}
                        </span>
                      </td>
                      <td>{c.since}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sites / Fleet section */}
          <div className="os-card os-sites-card">
            <div className="os-sites-header">
              <div>
                <h2>All Sites</h2>
                <p>Fleet connected via Orient Solar adapter</p>
              </div>
              <div className="os-sites-controls">
                <input
                  type="text"
                  placeholder="Search site / ID / type"
                  value={siteSearch}
                  onChange={(e) => setSiteSearch(e.target.value)}
                />
                <select
                  value={siteStatusFilter}
                  onChange={(e) => setSiteStatusFilter(e.target.value)}
                >
                  <option value="ALL">Status: All</option>
                  <option value="ONLINE">Online</option>
                  <option value="OFFLINE">Offline</option>
                </select>
              </div>
            </div>

            {sitesError && (
              <p style={{ fontSize: 11, color: "#f97316", marginTop: 4 }}>
                {sitesError}
              </p>
            )}

            <div className="os-table-wrapper os-table-wrapper--sites">
              <table className="os-table os-table--sites">
                <thead>
                  <tr>
                    <th>Site</th>
                    <th>Site ID</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Energy today</th>
                    <th>Battery SOC</th>
                    <th>Alarms</th>
                    <th>Last seen</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSites.map((s) => (
                    <tr
                      key={s.id}
                      onClick={() => setSelectedSiteId(s.id)}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          s.id === selectedSiteId
                            ? "rgba(37, 99, 235, 0.25)"
                            : "transparent",
                      }}
                    >
                      <td>{s.name}</td>
                      <td>{s.id}</td>
                      <td>{s.type}</td>
                      <td>
                        <span
                          className={
                            s.status === "ONLINE"
                              ? "os-pill os-pill--online"
                              : "os-pill os-pill--offline"
                          }
                        >
                          {s.status}
                        </span>
                      </td>
                      <td>{s.todayEnergy}</td>
                      <td>
                        {s.batterySoc != null ? `${s.batterySoc} %` : "—"}
                      </td>
                      <td>
                        {s.alarms > 0 ? (
                          <span className="os-alarm-count">
                            {s.alarms} active
                          </span>
                        ) : (
                          <span className="os-alarm-ok">Clear</span>
                        )}
                      </td>
                      <td>{s.lastSeen}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MetricRow({ label, value, accent }) {
  return (
    <div className="metric-row">
      <div className={`metric-dot metric-dot--${accent}`} />
      <div className="metric-text">
        <span className="metric-label">{label}</span>
        <span className="metric-value">{value}</span>
      </div>
    </div>
  );
}

export default App;
