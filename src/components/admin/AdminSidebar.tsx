import {
  Box,
  LayoutDashboard,
  LogOut,
  PackagePlus,
  Search,
  Shield,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const adminItems = [
  { title: "Overview", url: "/admin", icon: LayoutDashboard },
  { title: "Public tracking", url: "/", icon: Search },
];

export const AdminSidebar = ({
  shipmentCount,
  onCreateShipment,
  onSignOut,
}: {
  shipmentCount: number;
  onCreateShipment: () => void;
  onSignOut: () => void;
}) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="border-b border-sidebar-border p-3 bg-white">
        <div className="flex items-center gap-3 rounded-md bg-sidebar-accent/70 px-2 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-card">
            <Shield className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground">Admin workspace</p>
              <p className="text-xs text-sidebar-foreground/70">Restricted operations console</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url} tooltip={item.title}>
                    <NavLink to={item.url} end>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onCreateShipment} tooltip="Create shipment">
                  <PackagePlus className="h-4 w-4" />
                  {!collapsed && <span>Create shipment</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/60 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-background text-foreground">
                  <Box className="h-4 w-4" />
                </div>
                {!collapsed && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-sidebar-foreground/70">
                      Shipments
                    </p>
                    <p className="text-xl font-bold text-sidebar-foreground">{shipmentCount}</p>
                  </div>
                )}
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onSignOut} tooltip="Sign out">
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Sign out</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};