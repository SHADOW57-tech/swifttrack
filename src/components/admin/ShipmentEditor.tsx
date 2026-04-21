import { useState } from "react";
import { Trash2, Plus, AlertOctagon } from "lucide-react";
import {
  type Shipment,
  type ShipmentStatus,
  STATUS_OPTIONS,
} from "@/data/mockShipments";
import { useShipmentStore } from "@/store/shipmentStore";
import { toast } from "@/hooks/use-toast";

interface Props {
  shipment: Shipment;
  onClose: () => void;
}

export const ShipmentEditor = ({ shipment, onClose }: Props) => {
  const updateShipment = useShipmentStore((s) => s.updateShipment);
  const addEvent = useShipmentStore((s) => s.addEvent);
  const deleteEvent = useShipmentStore((s) => s.deleteEvent);

  const [form, setForm] = useState({
    status: shipment.status,
    currentLocation: shipment.currentLocation,
    estimatedDelivery: shipment.estimatedDelivery,
    recipientName: shipment.recipientName,
    serviceType: shipment.serviceType,
    weight: shipment.weight,
    origin: shipment.origin,
    destination: shipment.destination,
  });

  const [newEvent, setNewEvent] = useState({
    location: "",
    status: "",
    description: "",
    isAlert: false,
  });

  const handleSave = () => {
    updateShipment(shipment.trackingNumber, form);
    toast({ title: "Shipment updated" });
    onClose();
  };

  const handleAddEvent = () => {
    if (!newEvent.location.trim() || !newEvent.status.trim()) {
      toast({ title: "Location and status are required", variant: "destructive" });
      return;
    }
    addEvent(shipment.trackingNumber, {
      ...newEvent,
      date: new Date().toISOString(),
    });
    setNewEvent({ location: "", status: "", description: "", isAlert: false });
    toast({ title: "Event added" });
  };

  // Get current shipment from store for live event list
  const liveShipment = useShipmentStore((s) =>
    s.shipments.find((x) => x.trackingNumber === shipment.trackingNumber)
  );
  const events = liveShipment?.events ?? [];

  return (
    <div className="space-y-6">
      {/* Details */}
      <section>
        <h4 className="font-bold text-foreground mb-3">Shipment Details</h4>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as ShipmentStatus })
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
          <Field label="Estimated Delivery">
            <input
              type="date"
              value={form.estimatedDelivery}
              onChange={(e) =>
                setForm({ ...form, estimatedDelivery: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>
          <Field label="Current Location" full>
            <input
              value={form.currentLocation}
              onChange={(e) =>
                setForm({ ...form, currentLocation: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>
          <Field label="Origin">
            <input
              value={form.origin}
              onChange={(e) => setForm({ ...form, origin: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>
          <Field label="Destination">
            <input
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>
          <Field label="Recipient">
            <input
              value={form.recipientName}
              onChange={(e) =>
                setForm({ ...form, recipientName: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>
          <Field label="Weight">
            <input
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>
          <Field label="Service Type" full>
            <input
              value={form.serviceType}
              onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
          >
            Save Changes
          </button>
        </div>
      </section>

      {/* Timeline events */}
      <section className="border-t border-border pt-5">
        <h4 className="font-bold text-foreground mb-3">Timeline Events</h4>
        {events.length === 0 ? (
          <p className="text-sm text-muted-foreground mb-3">
            No events yet. Add the first one below.
          </p>
        ) : (
          <ul className="space-y-2 mb-4">
            {[...events]
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((ev) => (
                <li
                  key={ev.id}
                  className="flex items-start gap-3 p-3 rounded-md border border-border bg-background"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-foreground">
                        {ev.status}
                      </span>
                      {ev.isAlert && (
                        <span className="inline-flex items-center gap-1 text-xs text-status-danger">
                          <AlertOctagon className="h-3 w-3" /> Alert
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      📍 {ev.location} ·{" "}
                      {new Date(ev.date).toLocaleString()}
                    </div>
                    {ev.description && (
                      <div className="text-sm text-foreground/80 mt-1">
                        {ev.description}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      deleteEvent(shipment.trackingNumber, ev.id);
                      toast({ title: "Event deleted" });
                    }}
                    className="rounded-md p-1.5 text-status-danger hover:bg-status-danger/10"
                    aria-label="Delete event"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
          </ul>
        )}

        <div className="rounded-md border border-dashed border-border p-4 bg-muted/30">
          <div className="text-sm font-semibold text-foreground mb-3">
            Add New Event
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Status / Title">
              <input
                value={newEvent.status}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, status: e.target.value })
                }
                placeholder="e.g. Out for Delivery"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </Field>
            <Field label="Location">
              <input
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
                placeholder="e.g. Berlin, Germany"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </Field>
            <Field label="Description (optional)" full>
              <input
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                placeholder="Additional details"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </Field>
            <label className="col-span-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={newEvent.isAlert}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, isAlert: e.target.checked })
                }
                className="h-4 w-4 rounded border-input"
              />
              <span className="text-foreground">Mark as alert (e.g. On Hold)</span>
            </label>
          </div>
          <div className="flex justify-end mt-3">
            <button
              onClick={handleAddEvent}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
            >
              <Plus className="h-4 w-4" />
              Add Event
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const Field = ({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) => (
  <div className={full ? "col-span-2" : ""}>
    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
      {label}
    </label>
    {children}
  </div>
);
