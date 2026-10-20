"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getRsvps,
  getBlessings,
  approveBlessing,
  deleteBlessing,
  logoutAction,
  type RsvpRow,
  type BlessingRow,
} from "./actions";
import { events } from "@/content";

function toCsv(rows: RsvpRow[]): string {
  const header = ["Name", "Phone", "Guest Count", "Events", "Submitted At"];
  const lines = rows.map((r) =>
    [r.name, r.phone, String(r.guest_count), r.events.join("; "), r.created_at]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",")
  );
  return [header.join(","), ...lines].join("\n");
}

function downloadCsv(rows: RsvpRow[]) {
  const csv = toCsv(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `rsvps-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function AdminDashboard() {
  const router = useRouter();
  const [rsvps, setRsvps] = useState<RsvpRow[]>([]);
  const [blessingsList, setBlessingsList] = useState<BlessingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"rsvps" | "blessings">("rsvps");

  const refresh = async () => {
    setLoading(true);
    const [rsvpData, blessingData] = await Promise.all([getRsvps(), getBlessings()]);
    setRsvps(rsvpData);
    setBlessingsList(blessingData);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch from Supabase, an external system
    refresh();
  }, []);

  const headcounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const event of events) counts[event.key] = 0;
    for (const r of rsvps) {
      for (const key of r.events) {
        counts[key] = (counts[key] ?? 0) + r.guest_count;
      }
    }
    return counts;
  }, [rsvps]);

  const handleLogout = async () => {
    await logoutAction();
    router.refresh();
  };

  const handleApprove = async (id: string) => {
    await approveBlessing(id);
    refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blessing?")) return;
    await deleteBlessing(id);
    refresh();
  };

  return (
    <main className="min-h-screen bg-[var(--color-ivory)] px-4 py-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold maroon-text">Admin Dashboard</h1>
          <button onClick={handleLogout} className="rounded-full border border-[var(--color-maroon)] px-3 py-1.5 text-sm maroon-text">
            Logout
          </button>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setTab("rsvps")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === "rsvps" ? "bg-[var(--color-maroon)] text-[var(--color-ivory)]" : "border border-[var(--color-maroon)] maroon-text"}`}
          >
            RSVPs ({rsvps.length})
          </button>
          <button
            onClick={() => setTab("blessings")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === "blessings" ? "bg-[var(--color-maroon)] text-[var(--color-ivory)]" : "border border-[var(--color-maroon)] maroon-text"}`}
          >
            Blessings ({blessingsList.length})
          </button>
        </div>

        {loading ? (
          <p className="maroon-text/60">Loading...</p>
        ) : tab === "rsvps" ? (
          <>
            <div className="mb-4 flex flex-wrap gap-2">
              {events.map((e) => (
                <div key={e.key} className="rounded-lg border border-[var(--color-gold)]/40 bg-white px-3 py-2 text-xs">
                  <div className="font-semibold maroon-text">{e.nameEn}</div>
                  <div className="gold-text">{headcounts[e.key] ?? 0} guests</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => downloadCsv(rsvps)}
              className="mb-4 rounded-full bg-[var(--color-maroon)] px-4 py-2 text-sm font-semibold text-[var(--color-ivory)]"
            >
              Export CSV
            </button>
            <div className="overflow-x-auto rounded-xl border border-[var(--color-gold)]/30 bg-white">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-gold)]/30">
                    <th className="p-2">Name</th>
                    <th className="p-2">Phone</th>
                    <th className="p-2">Guests</th>
                    <th className="p-2">Events</th>
                    <th className="p-2">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((r) => (
                    <tr key={r.id} className="border-b border-[var(--color-gold)]/10">
                      <td className="p-2">{r.name}</td>
                      <td className="p-2">{r.phone}</td>
                      <td className="p-2">{r.guest_count}</td>
                      <td className="p-2">{r.events.join(", ")}</td>
                      <td className="p-2 text-xs">{new Date(r.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            {blessingsList.map((b) => (
              <div key={b.id} className="rounded-xl border border-[var(--color-gold)]/30 bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold maroon-text">{b.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${b.approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {b.approved ? "Approved" : "Pending"}
                  </span>
                </div>
                <p className="mt-1 text-sm maroon-text/80">{b.message}</p>
                <div className="mt-2 flex gap-2">
                  {!b.approved && (
                    <button
                      onClick={() => handleApprove(b.id)}
                      className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
