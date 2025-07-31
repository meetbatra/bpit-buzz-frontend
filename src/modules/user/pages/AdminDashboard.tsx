import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <AdminSidebar />

                <div className="w-full ml-2 overflow-auto">
                    <header className="flex items-center">
                        <SidebarTrigger />
                        <h1 className="text-lg">Admin Dashboard</h1>
                    </header>

                    <div className="md:p-15 p-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default AdminDashboard;