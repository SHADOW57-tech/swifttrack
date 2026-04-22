import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Truck, Globe, Shield, Zap, MapPin, Clock3, PackageCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Home = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const navigate = useNavigate();

  const heroStats = [
    { label: "Shipments monitored", value: "24/7" },
    { label: "Active checkpoints", value: "220+" },
    { label: "Delivery visibility", value: "Real-time" },
  ];

  const heroUpdates = [
    {
      title: "Picked up",
      location: "Lagos Hub",
      time: "08:20",
      icon: PackageCheck,
    },
    {
      title: "In transit",
      location: "Brussels Gateway",
      time: "13:45",
      icon: Truck,
    },
    {
      title: "Out for delivery",
      location: "Cape Town Depot",
      time: "09:10",
      icon: MapPin,
    },
  ];

  const featureItems = [
    { icon: Zap, title: "Fast", desc: "Express delivery updates the moment status changes." },
    { icon: Shield, title: "Reliable", desc: "Consistent tracking visibility from pickup to doorstep." },
    { icon: Globe, title: "Global", desc: "Coverage designed for domestic and international shipments." },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = trackingNumber.trim();
    if (trimmed) {
      navigate(`/track/${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-x-0 top-0 h-1 bg-brand-yellow" />
        <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl animate-pulse-soft" />
        <div className="absolute right-[-4rem] top-28 h-56 w-56 rounded-full bg-brand-yellow/20 blur-3xl animate-float" />
        <div className="absolute left-[-3rem] bottom-8 h-40 w-40 rounded-full bg-primary/10 blur-3xl animate-pulse-soft" />

        <div className="relative w-full  mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-14">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-semibold text-muted-foreground shadow-card backdrop-blur">
                <Truck className="h-3.5 w-3.5 text-primary" />
                REAL-TIME TRACKING
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Shipment tracking built for fast answers and clear delivery updates.
              </h1>
              <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
                Enter a tracking number to view shipment status, last known location, and milestone history in a clean courier-style experience.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 rounded-lg border border-border bg-card/95 p-4 shadow-elevated backdrop-blur sm:p-6"
              >
                <label
                  htmlFor="tracking-input"
                  className="mb-2 block text-left text-sm font-semibold text-foreground"
                >
                  Tracking Number
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="tracking-input"
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="e.g. UA784563921ZA"
                      className="w-full rounded-md border border-input bg-background px-4 py-3 pl-11 text-base text-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
                      autoComplete="off"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
                  >
                    Track
                    <Search className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-left text-xs text-muted-foreground sm:text-sm">
                  <span>Try demo:</span>
                  {[
                    "UA784563921ZA",
                    "PK908341227NG",
                    "GT510928463AE",
                  ].map((demoId) => (
                    <button
                      key={demoId}
                      type="button"
                      onClick={() => setTrackingNumber(demoId)}
                      className="rounded-full border border-border bg-background px-3 py-1 font-mono text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {demoId}
                    </button>
                  ))}
                </div>
              </form>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {heroStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-border bg-card/80 p-4 shadow-card animate-fade-in-up"
                    style={{ animationDelay: `${index * 140}ms` }}
                  >
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in-up" style={{ animationDelay: "140ms" }}>
              <div className="absolute inset-x-6 -top-6 h-24 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-lg border border-border bg-card p-5 shadow-elevated sm:p-6">
                <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Live shipment activity</p>
                    <p className="text-sm text-muted-foreground">Recent checkpoint movement</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    <span className="h-2 w-2 rounded-full bg-status-success animate-pulse" />
                    Online
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {heroUpdates.map(({ title, location, time, icon: Icon }, index) => (
                    <div
                      key={`${title}-${location}`}
                      className="flex items-start gap-3 rounded-lg border border-border bg-background p-4 shadow-card animate-fade-in-up"
                      style={{ animationDelay: `${220 + index * 140}ms` }}
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary animate-float">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold text-foreground">{title}</p>
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock3 className="h-3.5 w-3.5" />
                            {time}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{location}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 border-t border-border pt-5 sm:grid-cols-2">
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Current mode</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">Priority Express</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Estimated delivery</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">Tomorrow, 17:30</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-16 pt-10 sm:pt-14">
        <div className="grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
          {featureItems.map(({ icon: Icon, title, desc }, index) => (
            <div
              key={title}
              className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-5 text-center shadow-card transition-transform duration-300 hover:-translate-y-1 sm:flex-row sm:text-left animate-fade-in-up"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-foreground">{title}</div>
                <div className="text-sm text-muted-foreground">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppButton floating />
    </div>
  );
};

export default Home;
