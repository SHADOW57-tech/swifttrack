import { Package } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  showAdminLink?: boolean;
}

export const Header = ({ showAdminLink = false }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border shadow-card sticky top-0 z-40">
      <div className="w-full  mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between bg-white">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <Package className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-lg font-bold tracking-tight text-foreground">
              SwiftTrack
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Global Express
            </div>
          </div>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-4 text-sm font-medium">
          <Link
            to="/"
            className="px-3 py-2 text-foreground hover:text-primary transition-colors"
          >
            Track
          </Link>
          <Link
            to="/login"
            className="px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-md bg-primary px-3 py-2 text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Sign Up
          </Link>
          {showAdminLink && (
            <Link
              to="/admin"
              className="px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
            >
              Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
