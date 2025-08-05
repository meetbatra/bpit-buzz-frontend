import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

interface SidebarLink {
  name: string;
  path: string;
}

interface AdminSidebarProps {
  links: SidebarLink[];
}

const AdminSidebar = ({ links }:AdminSidebarProps) => {
  return (
    <div className="max-w-[9.5rem] h-full sticky top-0">
      <Sidebar className="absolute h-screen">
        <SidebarHeader>
          <div className="px-3 py-2 text-sm font-semibold">Dashboard</div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="flex gap-2">
                {links.map((link) => (
                  <SidebarMenuItem key={link.path}>
                    <SidebarMenuButton asChild>
                      <Link to={link.path} className="text-[1rem]">
                        <span>{link.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="px-3 py-2 text-xs text-muted-foreground">
            BPIT Buzz
          </div>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export default AdminSidebar;