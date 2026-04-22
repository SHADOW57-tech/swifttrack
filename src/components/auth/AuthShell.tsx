import { ArrowRight, Package, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export const AuthShell = ({
  title,
  description,
  eyebrow,
  children,
  footer,
}: {
  title: string;
  description: string;
  eyebrow: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-background bg-white">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)]">
        <section className="relative hidden overflow-hidden border-r border-border bg-card lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-x-0 top-0 h-1 bg-brand-yellow" />
          <div className="absolute left-16 top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-12 right-10 h-40 w-40 rounded-full bg-brand-yellow/20 blur-3xl animate-float" />

          <div className="relative p-10 xl:p-14">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-card">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">SwiftTrack</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Global Express
                </div>
              </div>
            </Link>

            <div className="mt-24 max-w-xl animate-fade-in-up">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                {eyebrow}
              </p>
              <h1 className="mt-5 text-5xl font-bold text-foreground">
                Professional shipping access with a cleaner front door.
              </h1>
              <p className="mt-5 text-lg text-muted-foreground">
                Customer access and operations entry now share a modern, structured experience built for speed, clarity, and trust.
              </p>
            </div>
          </div>

          <div className="relative grid gap-4 p-10 pt-0 xl:p-14 xl:pt-0">
            {[
              {
                icon: ShieldCheck,
                title: "Clear role separation",
                description: "Public user pages stay simple while admin tools remain restricted.",
              },
              {
                icon: ArrowRight,
                title: "Fast onboarding",
                description: "Polished forms and clear paths for sign in and account creation.",
              },
            ].map(({ icon: Icon, title: itemTitle, description: itemDescription }) => (
              <div key={itemTitle} className="flex items-start gap-4 rounded-lg border border-border bg-background/80 p-5 shadow-card backdrop-blur">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{itemTitle}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{itemDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md animate-fade-in-up rounded-lg border border-border bg-card p-6 shadow-elevated sm:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                {eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-foreground">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="mt-8">{children}</div>
            <div className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">
              {footer}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};