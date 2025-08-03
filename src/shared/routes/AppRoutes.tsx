import Home from "@/modules/event/pages/Home";
import Login from "@/modules/user/pages/auth/Login";
import Signup from "@/modules/user/pages/auth/Signup";
import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import StudentRoutes from "./StudentRoutes";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/dashboard/*" element={<StudentRoutes />} />
        </Routes>
    )
}

export default AppRoutes;