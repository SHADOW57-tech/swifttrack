import { type ShipmentStatus } from "@/data/mockShipments";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<ShipmentStatus, string> = {
  Pending: "bg-status-muted/15 text-status-muted border-status-muted/30",
  "Picked Up": "bg-status-info/15 text-status-info border-status-info/30",
  "In Transit": "bg-status-info/15 text-status-info border-status-info/30",
  "Out for Delivery":
    "bg-status-warning/15 text-status-warning border-status-warning/30",
  Delivered:
    "bg-status-success/15 text-status-success border-status-success/30",
  Delayed:
    "bg-status-warning/15 text-status-warning border-status-warning/30",
  "On Hold":
    "bg-status-danger/15 text-status-danger border-status-danger/30",
};

interface StatusBadgeProps {
  status: ShipmentStatus;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const StatusBadge = ({ status, className, size = "md" }: StatusBadgeProps) => {
  const sizeClass =
    size === "sm"
      ? "text-xs px-2 py-0.5"
      : size === "lg"
      ? "text-sm px-3 py-1.5"
      : "text-xs px-2.5 py-1";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold uppercase tracking-wide",
        STATUS_STYLES[status],
        sizeClass,
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
};
