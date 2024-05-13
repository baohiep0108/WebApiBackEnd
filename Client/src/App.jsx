import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "@/layouts";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import HomePage from "@/layouts/homePage.jsx";
import getUserRole from "@/configs/userRole.js";

const isAuthenticated = () => {
    if (typeof localStorage !== 'undefined') {
        return !!localStorage.getItem('token');
    }
    return false;
};
const PrivateRoute= ({ element: Element, adminRoute: AdminRoute,userRoute: UserRoute, ...rest }) => {
    const isAuthenticatedUser = isAuthenticated();
    const userRole = getUserRole();
    if (!isAuthenticatedUser) {
        return <Navigate to="/login" replace />;
    }
    if (userRole === "Admin" && AdminRoute) {
        return <AdminRoute />;
    }
    else if  (userRole === "User" && UserRoute) {
        return <UserRoute/>
    }
    else
    {
        return <Navigate to="/" replace />;
    }
};


function App() {
    return (
        <Routes>
            <Route path="/dashboard/*" element={<PrivateRoute adminRoute={Dashboard} />} />
            <Route path="/home/*" element={<PrivateRoute userRoute={HomePage} />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}
export default App;
