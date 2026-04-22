import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    toast({
      title: "Demo sign in only",
      description: "User authentication UI is ready for your future Node.js backend.",
    });
    navigate("/");
  };

  return (
    <AuthShell
      eyebrow="Sign in"
      title="Welcome back"
      description="Access shipment tools and customer-facing tracking with a clean sign-in flow."
      footer={
        <>
          Need an account?{" "}
          <Link to="/signup" className="font-semibold text-primary hover:text-primary-hover transition-colors">
            Create one
          </Link>
          <span className="mx-2 text-border">•</span>
          <Link to="/admin" className="font-semibold text-primary hover:text-primary-hover transition-colors">
            Admin access
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              className="pl-10"
              placeholder="name@company.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="login-password">Password</Label>
            <button type="button" className="text-xs font-medium text-primary transition-colors hover:text-primary-hover">
              Forgot password
            </button>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className="pl-10"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
};

export default Login;