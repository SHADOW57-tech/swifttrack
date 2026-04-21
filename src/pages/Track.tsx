import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Package2,
  User,
  Truck,
  Weight,
  Search,
  Mail,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StatusBadge } from "@/components/StatusBadge";
import { ShipmentTimeline } from "@/components/ShipmentTimeline";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { mockShipments, SUPPORT_EMAIL } from "@/data/mockShipments";

const formatDeliveryDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const Track = () => {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(trackingNumber ?? "");

  const shipment = mockShipments.find(
    (s) => s.trackingNumber.toLowerCase() === (trackingNumber ?? "").toLowerCase()
  );

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = searchValue.trim();
    if (trimmed) navigate(`/track/${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="container py-6 sm:py-10 flex-1">
        {/* Search bar */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-3"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-md border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter tracking number"
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
            >
              Track
            </button>
          </form>
        </div>

        {!shipment ? (
          <div className="bg-card border border-border rounded-xl p-8 sm:p-12 text-center shadow-card">
            <Package2 className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-bold text-foreground">
              Shipment Not Found
            </h2>
            <p className="mt-2 text-muted-foreground">
              We couldn't find a shipment with tracking number{" "}
              <span className="font-mono font-semibold text-foreground">
                {trackingNumber}
              </span>
              .
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Please double-check the number and try again, or contact support.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <WhatsAppButton message={`Hi, I can't find my shipment ${trackingNumber}`} />
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                <Mail className="h-4 w-4" />
                Email Support
              </a>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left: Summary */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
                <div className="bg-primary text-primary-foreground p-5">
                  <div className="text-xs uppercase tracking-widest opacity-80">
                    Tracking Number
                  </div>
                  <div className="font-mono font-bold text-lg break-all mt-1">
                    {shipment.trackingNumber}
                  </div>
                  <div className="mt-3">
                    <StatusBadge status={shipment.status} size="lg" className="bg-primary-foreground/15 border-primary-foreground/30 text-primary-foreground" />
                  </div>
                </div>
                <div className="p-5 space-y-4 text-sm">
                  <InfoRow icon={MapPin} label="Current Location" value={shipment.currentLocation} />
                  <InfoRow icon={Calendar} label="Estimated Delivery" value={formatDeliveryDate(shipment.estimatedDelivery)} />
                  <InfoRow icon={Truck} label="Service" value={shipment.serviceType} />
                  <InfoRow icon={User} label="Recipient" value={shipment.recipientName} />
                  <InfoRow icon={Package2} label="Route" value={`${shipment.origin} → ${shipment.destination}`} />
                  <InfoRow icon={Weight} label="Weight" value={shipment.weight} />
                </div>
              </div>

              {/* Contact */}
              <div className="bg-card border border-border rounded-xl shadow-card p-5">
                <div className="font-semibold text-foreground mb-1">Need help?</div>
                <p className="text-sm text-muted-foreground mb-4">
                  Our support team is here to assist you.
                </p>
                <div className="space-y-2">
                  <WhatsAppButton message={`Hi, I have a question about shipment ${shipment.trackingNumber}`} />
                  <a
                    href={`mailto:${SUPPORT_EMAIL}?subject=Shipment ${shipment.trackingNumber}`}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Email Support
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Timeline */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl shadow-card p-5 sm:p-7">
                <h2 className="text-lg font-bold text-foreground">
                  Shipment Progress
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Detailed timeline of all tracking events.
                </p>
                <ShipmentTimeline events={shipment.events} />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppButton floating />
    </div>
  );
};

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) => (
  <div className="flex gap-3">
    <Icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
    <div className="flex-1 min-w-0">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="font-semibold text-foreground break-words">{value}</div>
    </div>
  </div>
);

export default Track;
