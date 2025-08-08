import AdminDashboard from "@/modules/user/pages/admin/AdminDashboard"
import { Routes, Route, Navigate } from "react-router-dom"
import Events from "@/modules/user/pages/admin/Events"
import Users from "@/modules/user/pages/admin/Users"
import NewEvent from "@/modules/user/pages/admin/NewEvent"
import Attendance from "@/modules/user/pages/admin/Attendance"
import Feedbacks from "@/modules/user/pages/admin/Feedbacks"
import Analytics from "@/modules/user/pages/admin/Analytics"

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard />} >
                <Route index element={<Navigate to="events" replace />} />
                <Route path="events" element={<Events />} />
                <Route path="users" element={<Users />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="events/new" element={<NewEvent />} />
                <Route path="events/attendance/:eventId" element={<Attendance />} />
                <Route path="events/feedbacks/:eventId" element={<Feedbacks />} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes;