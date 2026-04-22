import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const ADMIN_EMAIL = "admin@trackpoint.local";
const ADMIN_PASSWORD = "Admin123!";

interface AdminSessionContextValue {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
}

const AdminSessionContext = createContext<AdminSessionContextValue | null>(null);

export const AdminSessionProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = useCallback((email: string, password: string) => {
    const allowed =
      email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
      password === ADMIN_PASSWORD;

    setIsAuthenticated(allowed);
    return allowed;
  }, []);

  const signOut = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, signIn, signOut }),
    [isAuthenticated, signIn, signOut]
  );

  return (
    <AdminSessionContext.Provider value={value}>
      {children}
    </AdminSessionContext.Provider>
  );
};

export const useAdminSession = () => {
  const context = useContext(AdminSessionContext);

  if (!context) {
    throw new Error("useAdminSession must be used within AdminSessionProvider");
  }

  return context;
};
