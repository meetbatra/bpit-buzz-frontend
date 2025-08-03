import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const links = [
  { name: "Events", path: "/dashboard/events" },
  { name: "Certificates", path: "/dashboard/certificates" },
  { name: "Event Feedback", path: "/dashboard/feedback" },
];

export default function StudentDashboard() {
  return (
    <SidebarProvider>
        <div className="flex h-full w-full">
            <Sidebar links={links}/>

            <div className="w-full overflow-x-auto">
                <header className="flex items-center md:hidden">
                    <SidebarTrigger />
                </header>

                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    </SidebarProvider>
  );
}