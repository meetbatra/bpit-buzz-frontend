import AdminDashboard from "@/modules/user/pages/AdminDashboard"
import { Routes, Route, Navigate } from "react-router-dom"
import Events from "@/modules/user/pages/Events"
import Users from "@/modules/user/pages/Users"
import NewEvent from "@/modules/user/pages/NewEvent"
import Attendance from "@/modules/user/pages/Attendance"

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard />} >
                <Route index element={<Navigate to="events" replace />} />
                <Route path="events" element={<Events />} />
                <Route path="users" element={<Users />} />
                <Route path="events/new" element={<NewEvent />} />
                <Route path="users/attendance/:eventId" element={<Attendance />} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes;