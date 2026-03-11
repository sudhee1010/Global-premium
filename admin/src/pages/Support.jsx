import { useState } from "react";

const priorityConfig = {
  URGENT: { bg: "bg-red-500", text: "text-white" },
  HIGH: { bg: "bg-orange-400", text: "text-white" },
  MEDIUM: { bg: "bg-blue-500", text: "text-white" },
  LOW: { bg: "bg-gray-500", text: "text-white" },
};

const statusConfig = {
  Open: {
    bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200",
    icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>,
  },
  Resolved: {
    bg: "bg-green-50", text: "text-green-600", border: "border-green-200",
    icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  Pending: {
    bg: "bg-orange-50", text: "text-orange-500", border: "border-orange-200",
    icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>,
  },
};

const tickets = [
  { id: "TKT-10245", priority: "URGENT", status: "Open", title: "Order not received - Tracking shows delivered", customer: "Sarah Johnson", category: "Shipping", date: "2026-02-17 09:15", assignedTo: "Mike Wilson" },
  { id: "TKT-10244", priority: "HIGH", status: "Resolved", title: "Wrong item received in my order", customer: "John Smith", category: "Order Issue", date: "2026-02-16 15:30", assignedTo: "Emily Davis" },
  { id: "TKT-10243", priority: "MEDIUM", status: "Open", title: "Refund not received after return", customer: "Emma Wilson", category: "Refund", date: "2026-02-16 11:20", assignedTo: "Mike Wilson" },
  { id: "TKT-10242", priority: "HIGH", status: "Pending", title: "Product quality issue - Defective item", customer: "Michael Brown", category: "Product Quality", date: "2026-02-15 14:10", assignedTo: "Emily Davis" },
  { id: "TKT-10241", priority: "LOW", status: "Resolved", title: "Account access issue - Password reset not working", customer: "Lisa Anderson", category: "Account", date: "2026-02-15 10:05", assignedTo: "Mike Wilson" },
  { id: "TKT-10240", priority: "LOW", status: "Resolved", title: "Question about product specifications", customer: "David Chen", category: "Product Info", date: "2026-02-14 16:45", assignedTo: "Emily Davis" },
];

const summaryCards = [
  { label: "Open Tickets", value: "2", sub: null },
  { label: "Pending Response", value: "1", sub: "Urgent", subColor: "bg-orange-400 text-white" },
  { label: "Resolved Today", value: "1", sub: null },
  { label: "Avg Response Time", value: "2.4h", sub: null },
];

function PriorityBadge({ priority }) {
  const cfg = priorityConfig[priority] || priorityConfig.LOW;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide ${cfg.bg} ${cfg.text}`}>
      {priority}
    </span>
  );
}

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.Open;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      {cfg.icon}{status}
    </span>
  );
}

function TicketRow({ ticket }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-b-0 py-4 sm:py-5 px-4 sm:px-6 hover:bg-gray-50 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-gray-700 text-xs sm:text-sm tracking-wide">{ticket.id}</span>
          <PriorityBadge priority={ticket.priority} />
          <StatusBadge status={ticket.status} />
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs sm:text-sm text-gray-600 font-medium hover:bg-gray-100 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </button>
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-100 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-8 z-20 bg-white border border-gray-100 rounded-xl shadow-lg py-1 w-36">
                {["Edit", "Assign", "Close Ticket", "Delete"].map((item) => (
                  <button key={item} onClick={() => setMenuOpen(false)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="text-sm sm:text-base font-semibold text-gray-900 mb-2 leading-snug">{ticket.title}</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 mb-1.5">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          {ticket.customer}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>
          {ticket.category}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          {ticket.date}
        </span>
      </div>
      <p className="text-xs text-gray-400">Assigned to: <span className="font-semibold text-gray-700">{ticket.assignedTo}</span></p>
    </div>
  );
}

export default function Support() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priorityFilter, setPriorityFilter] = useState("All Priority");

  const filtered = tickets.filter((t) => {
    const matchSearch = search === "" || t.title.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()) || t.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Status" || t.status === statusFilter;
    const matchPriority = priorityFilter === "All Priority" || t.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">

      {/* Page heading */}
      <div className="mb-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Support</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage customer support tickets</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {summaryCards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 sm:px-6 py-4 sm:py-5">
            <p className="text-xs sm:text-sm text-gray-400 mb-2">{card.label}</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{card.value}</p>
            {card.sub && (
              <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold ${card.subColor}`}>
                {card.sub}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Tickets panel */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">

        {/* Panel header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-gray-100">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">Support Tickets</h2>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search tickets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-44 pl-8 pr-3 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition cursor-pointer">
                  {["All Status", "Open", "Pending", "Resolved"].map((s) => <option key={s}>{s}</option>)}
                </select>
                <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
              <div className="relative flex-1 sm:flex-none">
                <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition cursor-pointer">
                  {["All Priority", "URGENT", "HIGH", "MEDIUM", "LOW"].map((p) => <option key={p}>{p}</option>)}
                </select>
                <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets list */}
        <div>
          {filtered.length > 0 ? (
            filtered.map((ticket) => <TicketRow key={ticket.id} ticket={ticket} />)
          ) : (
            <div className="text-center py-16 text-gray-300">
              <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-sm">No tickets found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}