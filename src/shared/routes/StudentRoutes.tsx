import { Route, Navigate, Routes } from "react-router-dom";
import StudentDashboard from "@/modules/user/pages/student/StudentDashboard";
import EventsPage from "@/modules/user/pages/student/EventsPage";
import CertificatesPage from "@/modules/user/pages/student/CertificatesPage";
import FeedbackPage from "@/modules/user/pages/student/FeedbackPage";
import StatisticsPage from "@/modules/user/pages/student/StatisticsPage";

const StudentRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<StudentDashboard />}>
                <Route index element={<Navigate to="statistics" replace />} />
                <Route path="statistics" element={<StatisticsPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="certificates" element={<CertificatesPage />} />
                <Route path="feedback" element={<FeedbackPage />} />
            </Route>
        </Routes>
    )
};

export default StudentRoutes;