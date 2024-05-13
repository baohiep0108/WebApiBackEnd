import { Routes, Route } from "react-router-dom";
import {
    Sidenav,
    DashboardNavbar,
    Configurator,
    Footer,
} from "@/widgets/layout";
import routes from "/src/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import CreateProduct from "@/pages/dashboard/createProduct";
import EditCategory from "@/pages/dashboard/editCategory";
import CreateAcc from "@/pages/dashboard/createAcc";
import EditAcc from "@/pages/dashboard/editAcc";
import EditProduct from "@/pages/dashboard/editProduct";

export function Dashboard() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavType } = controller;

    return (
        <div className="min-h-screen bg-blue-gray-50 flex">
            <Sidenav
                routes={routes}
                brandImg={
                    sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
                }
            />
            <div className="p-4 xl:ml-80 flex-1">
                <DashboardNavbar />
                <Configurator />
                <Routes>
                    {routes.map(
                        ({ layout, pages }) =>
                            layout === "dashboard" &&
                            pages.map(({ path, element }) => (
                                <Route exact path={path} element={element} key={path} />
                            ))
                    )}
                    <Route path="/product/edit/:id" element={<EditProduct />} />
                    <Route path="/product/new" element={<CreateProduct />} />
                    <Route path="/account/createAcc" element={<CreateAcc />} />
                    <Route path="/category/edit/:id" element={<EditCategory />} />
                    <Route path="/account/edit/:id" element={<EditAcc />} />
                </Routes>
                <div className="text-blue-gray-600">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
