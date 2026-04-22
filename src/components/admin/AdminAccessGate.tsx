import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminSession } from "./AdminSessionProvider";

export const AdminAccessGate = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, signIn } = useAdminSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const success = signIn(email, password);

    if (!success) {
      setError("Access denied. Only the admin account can enter this page.");
      return;
    }

    setError("");
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <AuthShell
      eyebrow="Admin access"
      title="Restricted operations sign in"
      description="Only the admin account can enter the operations workspace in this frontend demo."
      footer={
        <>
          Looking for customer access?{" "}
          <Link to="/login" className="font-semibold text-primary hover:text-primary-hover transition-colors">
            Go to user login
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="admin-email">Admin email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="pl-10"
              autoComplete="username"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="admin-password">Password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="pl-10"
              autoComplete="current-password"
              required
            />
          </div>
        </div>

        {error ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        <Button type="submit" className="w-full">
          Enter admin panel
        </Button>
      </form>
    </AuthShell>
  );
};
