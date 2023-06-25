import Cart from "assets/svg/Cart";
import Package from "assets/svg/Package";
import Star from "assets/svg/Star";
import User from "assets/svg/User";
import UserList from "assets/svg/UserList";
import { ISidebar } from "models/general/SidebarData";
import { Paths } from "utils/Paths";

export const SIDEBAR_ITEMS: ISidebar[] = [
    {
        id: "sidebar_profile",
        path: Paths.PROFILE,
        title: "Profile",
        icon: <User />,
    },
    {
        id: "sidebar_users",
        path: Paths.USER_LIST,
        title: "Users",
        icon: <UserList />,
    },
    {
        id: "sidebar_products",
        path: Paths.VIEW_PRODUCTS,
        title: "Products",
        icon: <Package />,
    },
    {
        id: "sidebar_add_product",
        path: Paths.ADD_EDIT_PRODUCT,
        title: "Add Product",
        icon: <Cart />,
    },
    {
        id: "sidebar_featured_product",
        path: Paths.FEATURED_PRODUCTS,
        title: "Featured Products",
        icon: <Star />,
    },
];
