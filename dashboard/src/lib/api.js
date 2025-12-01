// // // // src/lib/api.js (FINAL MERGED VERSION)

// // // // const API_BASE = "http://192.168.0.195:4000/api";
// // // // const API_BASE = "http://10.157.106.234:4000/api";
// // // // const API_BASE = "http://172.20.10.11:4000/api";
// // // // const API_BASE = "https://orient-solar-backend.onrender.com";
// // // // const API_BASE = "https://orient-solar-backend.onrender.com/api";
// // // // const API_BASE = "http://orient-solar-backend.onrender.com/api";  // ← HTTP
// // // const API_BASE = "http://172.20.10.12:4000/api";

// // // /* ---------------- SITE APIs ---------------- */
// // // export async function getSites() {
// // //   const res = await fetch(`${API_BASE}/sites`);
// // //   return res.json();
// // // }

// // // export async function getActiveSites() {
// // //   const res = await fetch(`${API_BASE}/sites`);
// // //   const sites = await res.json();
// // //   return sites.filter(s => s.status === "online");
// // // }

// // // /* ---------------- COMPLAINT APIs (store version) ---------------- */
// // // export async function getComplaints() {
// // //   const res = await fetch(`${API_BASE}/complaints/store`);
// // //   return res.json();
// // // }

// // // export async function createComplaint(formData) {
// // //   const res = await fetch(`${API_BASE}/complaints/store`, {
// // //     method: "POST",
// // //     headers: { "Content-Type": "application/json" },
// // //     body: JSON.stringify(formData),
// // //   });
// // //   return res.json();
// // // }


// // // /* ---------------- COMPLAINT APIs (NEW advanced version) ---------------- */
// // // export async function fetchComplaints({ status = "ALL", priority = "ALL" } = {}) {
// // //   const params = new URLSearchParams();

// // //   if (status !== "ALL") params.append("status", status);
// // //   if (priority !== "ALL") params.append("priority", priority);

// // //   const url =
// // //     params.toString()
// // //       ? `${API_BASE}/complaints?${params.toString()}`
// // //       : `${API_BASE}/complaints`;

// // //   const res = await fetch(url);
// // //   return res.json();
// // // }

// // // export async function updateComplaintStatus(id, status) {
// // //   const res = await fetch(`${API_BASE}/complaints/${id}/status`, {
// // //     method: "PATCH",
// // //     headers: { "Content-Type": "application/json" },
// // //     body: JSON.stringify({ status }),
// // //   });

// // //   return res.json();
// // // }

// // // /* ---------------- TELEMETRY ---------------- */
// // // export async function getTelemetry(siteId) {
// // //   const res = await fetch(`${API_BASE}/telemetry/${siteId}`);
// // // }


// // // export default {
// // //   getSites,
// // //   getActiveSites,
// // //   getComplaints,
// // //   createComplaint,
// // //   fetchComplaints,
// // //   updateComplaintStatus,
// // //   getTelemetry,
// // // };


// // // src/lib/api.js

// // // Keep only ONE base, point it to your laptop backend



// // // const API_BASE = "http://172.20.10.12:4000/api";
// // const API_BASE = "https://orient-solar-backend-production.up.railway.app/api";

// // /* ---------------- SITE APIs ---------------- */
// // export async function getSites() {
// //   const res = await fetch(`${API_BASE}/sites`);
// //   if (!res.ok) throw new Error(`Sites error ${res.status}`);
// //   return res.json();
// // }

// // export async function getActiveSites() {
// //   const sites = await getSites();
// //   return sites.filter((s) => s.status === "online");
// // }

// // /* ---------------- COMPLAINT APIs (store version) ---------------- */
// // export async function getComplaints() {
// //   const res = await fetch(`${API_BASE}/complaints/store`);
// //   if (!res.ok) throw new Error(`Complaints store error ${res.status}`);
// //   return res.json();
// // }

// // export async function createComplaint(formData) {
// //   const res = await fetch(`${API_BASE}/complaints/store`, {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify(formData),
// //   });
// //   if (!res.ok) throw new Error(`Create complaint error ${res.status}`);
// //   return res.json();
// // }

// // /* ---------------- COMPLAINT APIs (NEW advanced version) ---------------- */
// // export async function fetchComplaints({ status = "ALL", priority = "ALL" } = {}) {
// //   const params = new URLSearchParams();
// //   if (status !== "ALL") params.append("status", status);
// //   if (priority !== "ALL") params.append("priority", priority);

// //   const url = params.toString()
// //     ? `${API_BASE}/complaints?${params.toString()}`
// //     : `${API_BASE}/complaints`;

// //   const res = await fetch(url);
// //   if (!res.ok) throw new Error(`Complaints error ${res.status}`);
// //   return res.json();
// // }

// // export async function updateComplaintStatus(id, status) {
// //   const res = await fetch(`${API_BASE}/complaints/${id}/status`, {
// //     method: "PATCH",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({ status }),
// //   });
// //   if (!res.ok) throw new Error(`Update complaint error ${res.status}`);
// //   return res.json();
// // }

// // /* ---------------- TELEMETRY ---------------- */
// // export async function getTelemetry(siteId) {
// //   const res = await fetch(`${API_BASE}/telemetry/${siteId}`);
// //   if (!res.ok) throw new Error(`Telemetry error ${res.status}`);
// //   return res.json();                      // 🔥 THIS WAS MISSING
// // }

// // export default {
// //   getSites,
// //   getActiveSites,
// //   getComplaints,
// //   createComplaint,
// //   fetchComplaints,
// //   updateComplaintStatus,
// //   getTelemetry,
// // };

// // YE LINE CHANGE KAR DE
// const API_BASE = "http://172.20.10.11:4000/api";

// /* ---------------- SITE APIs ---------------- */
// export async function getSites() {
//   const res = await fetch(`${API_BASE}/sites`);
//   if (!res.ok) throw new Error(`Sites error ${res.status}`);
//   return res.json();
// }

// export async function getActiveSites() {
//   const sites = await getSites();
//   return sites.filter((s) => s.status === "online");
// }

// /* ---------------- COMPLAINT APIs (store version) ---------------- */
// export async function getComplaints() {
//   const res = await fetch(`${API_BASE}/complaints/store`);
//   if (!res.ok) throw new Error(`Complaints store error ${res.status}`);
//   return res.json();
// }

// export async function createComplaint(formData) {
//   const res = await fetch(`${API_BASE}/complaints/store`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(formData),
//   });
//   if (!res.ok) throw new Error(`Create complaint error ${res.status}`);
//   return res.json();
// }

// /* ---------------- COMPLAINT APIs (NEW advanced version) ---------------- */
// export async function fetchComplaints({ status = "ALL", priority = "ALL" } = {}) {
//   const params = new URLSearchParams();
//   if (status !== "ALL") params.append("status", status);
//   if (priority !== "ALL") params.append("priority", priority);

//   const url = params.toString()
//     ? `${API_BASE}/complaints?${params.toString()}`
//     : `${API_BASE}/complaints`;

//   const res = await fetch(url);
//   if (!res.ok) throw new Error(`Complaints error ${res.status}`);
//   return res.json();
// }

// export async function updateComplaintStatus(id, status) {
//   const res = await fetch(`${API_BASE}/complaints/${id}/status`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ status }),
//   });
//   if (!res.ok) throw new Error(`Update complaint error ${res.status}`);
//   return res.json();
// }

// /* ---------------- TELEMETRY ---------------- */
// export async function getTelemetry(siteId) {
//   const res = await fetch(`${API_BASE}/telemetry/${siteId}`);
//   if (!res.ok) throw new Error(`Telemetry error ${res.status}`);
//   return res.json();
// }

// export default {
//   getSites,
//   getActiveSites,
//   getComplaints,
//   createComplaint,
//   fetchComplaints,
//   updateComplaintStatus,
//   getTelemetry,
// };


const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export const api = {
  async getSites() {
    const res = await fetch(`${API_BASE}/sites`);
    return res.json();
  },

  async getTelemetry(siteId) {
    const res = await fetch(`${API_BASE}/telemetry/${siteId}`);
    if (!res.ok) return null;
    return res.json();
  },

  async getComplaints() {
    const res = await fetch(`${API_BASE}/complaints`);
    return res.json();
  },

  async createComplaint(data) {
    await fetch(`${API_BASE}/complaints`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  async updateComplaintStatus(id, status) {
    await fetch(`${API_BASE}/complaints/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }
};