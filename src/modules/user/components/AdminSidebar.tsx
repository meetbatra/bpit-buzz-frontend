import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Calendar, Users} from "lucide-react";

const AdminSidebar = () => {
    return (
        <Sidebar className="absolute mt-[4rem] h-full">
      <SidebarHeader>
        <div className="px-3 py-2 text-sm font-semibold">Admin</div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/admin/events"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Events</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/admin/users"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-3 py-2 text-xs text-muted-foreground">
          BPIT Buzz Admin
        </div>
      </SidebarFooter>
    </Sidebar>
    )
}

export default AdminSidebar;