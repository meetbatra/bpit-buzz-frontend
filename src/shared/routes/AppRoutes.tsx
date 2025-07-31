import Home from "@/modules/event/pages/Home";
import Login from "@/modules/user/pages/Login";
import Signup from "@/modules/user/pages/Signup";
import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import Certificates from "@/modules/user/pages/Certificates";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="certificates" element={<Certificates />} />
        </Routes>
    )
}

export default AppRoutes;