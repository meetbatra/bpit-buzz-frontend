import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "../../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../store/user-store";

const links = [
    { name: "Events", path: "/admin/events" },
    { name: "Users", path: "/admin/users" },
    { name: "Analytics", path: "/admin/analytics" }
]

const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(user){
            user.role != 'admin' && navigate('/');
        } else {
            navigate('/login');
        }
    }, [user]);

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