import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

const links = [
    { name: "Events", path: "/admin/events" },
    { name: "Users", path: "/admin/users" }
]

const AdminDashboard = () => {
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
    )
}

export default AdminDashboard;