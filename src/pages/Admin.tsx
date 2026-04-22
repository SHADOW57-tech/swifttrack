import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Package,
  Search,
  Shield,
  X,
} from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import {
  useShipmentStore,
  generateTrackingNumber,
} from "@/store/shipmentStore";
import {
  type Shipment,
  type ShipmentStatus,
  STATUS_OPTIONS,
} from "@/data/mockShipments";
import { ShipmentEditor } from "@/components/admin/ShipmentEditor";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAdminSession } from "@/components/admin/AdminSessionProvider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const { signOut } = useAdminSession();
  const shipments = useShipmentStore((s) => s.shipments);
  const addShipment = useShipmentStore((s) => s.addShipment);
  const deleteShipment = useShipmentStore((s) => s.deleteShipment);

  const [editing, setEditing] = useState<Shipment | null>(null);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");

  // Create form state
  const [draft, setDraft] = useState({
    trackingNumber: generateTrackingNumber(),
    status: "Pending" as ShipmentStatus,
    currentLocation: "",
    estimatedDelivery: "",
    origin: "",
    destination: "",
    recipientName: "",
    serviceType: "Standard",
    weight: "",
  });

  const filtered = shipments.filter((s) =>
    [s.trackingNumber, s.recipientName, s.destination, s.origin]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (!draft.trackingNumber.trim()) {
      toast({ title: "Tracking number required", variant: "destructive" });
      return;
    }
    if (
      shipments.some(
        (s) => s.trackingNumber.toLowerCase() === draft.trackingNumber.toLowerCase()
      )
    ) {
      toast({ title: "Tracking number already exists", variant: "destructive" });
      return;
    }
    addShipment({
      ...draft,
      events: [],
    });
    toast({ title: "Shipment created", description: draft.trackingNumber });
    setCreating(false);
    setDraft({
      trackingNumber: generateTrackingNumber(),
      status: "Pending",
      currentLocation: "",
      estimatedDelivery: "",
      origin: "",
      destination: "",
      recipientName: "",
      serviceType: "Standard",
      weight: "",
    });
  };

  return (
    <SidebarProvider defaultOpen>
      <AdminSidebar
        shipmentCount={shipments.length}
        onCreateShipment={() => setCreating(true)}
        onSignOut={signOut}
      />

      <SidebarInset>
        <div className="flex min-h-screen flex-col bg-background">
          <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
            <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="h-9 w-9 rounded-md border border-border" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Admin console
                  </p>
                  <h1 className="text-lg font-bold text-foreground sm:text-xl">
                    Shipment operations
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground shadow-card sm:flex">
                  <Shield className="h-4 w-4 text-primary" />
                  Admin session active
                </div>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
            <section className="rounded-lg border border-border bg-card p-5 shadow-card sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                    Monitor live shipments and update customer-visible milestones.
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                    Keep tracking records organized, review delivery progress, and make quick updates from one clean workspace.
                  </p>
                </div>
                <button
                  onClick={() => setCreating(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover shadow-card"
                >
                  <Plus className="h-4 w-4" />
                  Create Tracking
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
                <StatCard label="Total" value={shipments.length} />
                <StatCard
                  label="In Transit"
                  value={shipments.filter((s) => s.status === "In Transit").length}
                />
                <StatCard
                  label="Delivered"
                  value={shipments.filter((s) => s.status === "Delivered").length}
                />
                <StatCard
                  label="Issues"
                  value={
                    shipments.filter((s) => ["On Hold", "Delayed"].includes(s.status)).length
                  }
                />
              </div>
            </section>

            <section className="mt-6 rounded-lg border border-border bg-card shadow-card overflow-hidden">
              <div className="border-b border-border p-4 sm:p-5">
                <div className="relative max-w-xl">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by tracking number, recipient, origin, or destination"
                    className="w-full rounded-md border border-input bg-background py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="p-10 text-center">
                  <Package className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-3 text-muted-foreground">No shipments found.</p>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {filtered.map((s) => (
                    <li
                      key={s.trackingNumber}
                      className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-mono font-bold text-foreground">
                            {s.trackingNumber}
                          </span>
                          <StatusBadge status={s.status} size="sm" />
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {s.origin} → {s.destination} · {s.recipientName || "—"}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          to={`/track/${s.trackingNumber}`}
                          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          View
                        </Link>
                        <button
                          onClick={() => setEditing(s)}
                          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete shipment ${s.trackingNumber}?`)) {
                              deleteShipment(s.trackingNumber);
                              toast({ title: "Shipment deleted" });
                            }
                          }}
                          className="inline-flex items-center justify-center rounded-md border border-border bg-background p-1.5 text-status-danger transition-colors hover:bg-status-danger/10"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </main>
        </div>
      </SidebarInset>

      {/* Create modal */}
      {creating && (
        <Modal title="Create New Shipment" onClose={() => setCreating(false)}>
          <div className="space-y-3">
            <Field label="Tracking Number">
              <div className="flex gap-2">
                <input
                  value={draft.trackingNumber}
                  onChange={(e) =>
                    setDraft({ ...draft, trackingNumber: e.target.value })
                  }
                  className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="button"
                  onClick={() =>
                    setDraft({ ...draft, trackingNumber: generateTrackingNumber() })
                  }
                  className="rounded-md border border-border bg-card px-3 py-2 text-xs font-medium hover:bg-muted"
                >
                  Generate
                </button>
              </div>
            </Field>
            <Field label="Status">
              <select
                value={draft.status}
                onChange={(e) =>
                  setDraft({ ...draft, status: e.target.value as ShipmentStatus })
                }
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Origin">
                <input
                  value={draft.origin}
                  onChange={(e) => setDraft({ ...draft, origin: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Kyiv, Ukraine"
                />
              </Field>
              <Field label="Destination">
                <input
                  value={draft.destination}
                  onChange={(e) =>
                    setDraft({ ...draft, destination: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Berlin, Germany"
                />
              </Field>
            </div>
            <Field label="Current Location">
              <input
                value={draft.currentLocation}
                onChange={(e) =>
                  setDraft({ ...draft, currentLocation: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Estimated Delivery">
                <input
                  type="date"
                  value={draft.estimatedDelivery}
                  onChange={(e) =>
                    setDraft({ ...draft, estimatedDelivery: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </Field>
              <Field label="Weight">
                <input
                  value={draft.weight}
                  onChange={(e) => setDraft({ ...draft, weight: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="2.4 kg"
                />
              </Field>
            </div>
            <Field label="Recipient Name">
              <input
                value={draft.recipientName}
                onChange={(e) =>
                  setDraft({ ...draft, recipientName: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </Field>
            <Field label="Service Type">
              <input
                value={draft.serviceType}
                onChange={(e) =>
                  setDraft({ ...draft, serviceType: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </Field>
          </div>
          <div className="flex gap-2 justify-end mt-5">
            <button
              onClick={() => setCreating(false)}
              className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
            >
              Create
            </button>
          </div>
        </Modal>
      )}

      {/* Edit modal */}
      {editing && (
        <Modal
          title={`Edit ${editing.trackingNumber}`}
          onClose={() => setEditing(null)}
        >
          <ShipmentEditor
            shipment={editing}
            onClose={() => setEditing(null)}
          />
        </Modal>
      )}
    </SidebarProvider>
  );
};

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-lg border border-border bg-background p-4 shadow-card">
    <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
      {label}
    </div>
    <div className="text-2xl font-bold text-foreground mt-1">{value}</div>
  </div>
);

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
      {label}
    </label>
    {children}
  </div>
);

const Modal = ({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) => (
  <div
    className="fixed  inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
    onClick={onClose}
  >
    <div
      className="bg-card w-full sm:max-w-2xl rounded-t-xl sm:rounded-xl shadow-elevated max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="sticky bg-white top-0 bg-card border-b border-border px-5 py-4 flex items-center justify-between">
        <h3 className="font-bold text-foreground">{title}</h3>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-muted-foreground hover:bg-muted"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  </div>
);

export default Admin;
