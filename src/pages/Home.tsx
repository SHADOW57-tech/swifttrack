import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Truck, Globe, Shield, Zap } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Home = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const navigate = useNavigate();

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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-brand-yellow" />
        <div className="container py-12 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-1.5 text-xs font-semibold text-muted-foreground mb-6 shadow-card">
              <Truck className="h-3.5 w-3.5 text-primary" />
              REAL-TIME TRACKING
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              Track Your <span className="text-primary">Shipment</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              Enter your tracking number to see real-time status, location, and delivery updates.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 bg-card rounded-xl shadow-elevated border border-border p-4 sm:p-6 bg-white"
            >
              <label
                htmlFor="tracking-input"
                className="block text-left text-sm font-semibold text-foreground mb-2"
              >
                Tracking Number
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="tracking-input"
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="e.g. UA784563921ZA"
                    className="w-full pl-11 pr-4 py-3 rounded-md border border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    autoComplete="off"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary-hover transition-colors shadow-card"
                >
                  Track
                  <Search className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground text-left">
                Try demo: <button
                  type="button"
                  onClick={() => setTrackingNumber("UA784563921ZA")}
                  className="font-mono text-primary hover:underline"
                >UA784563921ZA</button>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="container pb-16">
        <div className="grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
          {[
            { icon: Zap, title: "Fast", desc: "Express delivery worldwide" },
            { icon: Shield, title: "Reliable", desc: "Trusted by thousands" },
            { icon: Globe, title: "Global", desc: "220+ countries served" },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-card bg-white rounded-lg border border-border p-5 shadow-card text-center sm:text-left flex sm:flex-row flex-col items-center gap-3"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary ">
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
