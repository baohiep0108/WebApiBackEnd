import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,

} from "@heroicons/react/24/solid";
import { Home, Category, ProductAd, Account, Order } from "../src/pages/dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Account",
        path: "/account",
        element: <Account/>,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "category",
        path: "/category",
        element: <Category />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "product",
        path: "/product",
        element: <ProductAd/>,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Order",
        path: "/order",
        element: <Order/>,
      },



    ],
  },
  
];

export default routes;
