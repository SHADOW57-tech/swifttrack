import { Check, AlertOctagon, Circle } from "lucide-react";
import { type TrackingEvent } from "@/data/mockShipments";
import { cn } from "@/lib/utils";

interface ShipmentTimelineProps {
  events: TrackingEvent[];
}

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const ShipmentTimeline = ({ events }: ShipmentTimelineProps) => {
  // Newest first
  const sorted = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <ol className="relative">
      {sorted.map((event, idx) => {
        const isLatest = idx === 0;
        const isAlert = event.isAlert;
        return (
          <li key={event.id} className="flex gap-4 pb-8 last:pb-0 relative">
            {/* Vertical connector line */}
            {idx < sorted.length - 1 && (
              <span
                className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-border"
                aria-hidden="true"
              />
            )}

            {/* Dot */}
            <div className="relative z-10 flex-shrink-0">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2",
                  isAlert
                    ? "bg-status-danger border-status-danger text-white"
                    : isLatest
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-status-success border-status-success text-white"
                )}
              >
                {isAlert ? (
                  <AlertOctagon className="h-4 w-4" />
                ) : isLatest ? (
                  <Circle className="h-3 w-3 fill-current" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 -mt-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4
                  className={cn(
                    "font-semibold",
                    isAlert ? "text-status-danger" : "text-foreground"
                  )}
                >
                  {event.status}
                </h4>
                <time className="text-xs text-muted-foreground">
                  {formatDate(event.date)}
                </time>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                📍 {event.location}
              </p>
              {event.description && (
                <p className="text-sm text-foreground/80 mt-1">
                  {event.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};
