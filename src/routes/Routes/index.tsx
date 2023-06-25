import Layout from "common/Layout";
import ProtectedRoute from "common/ProtectedRoute";
import AddEditProduct from "pages/AddEditProduct";
import ChangePassword from "pages/ChangePassword";
import FeaturedProducts from "pages/FeaturedProducts";
import ForgotPassword from "pages/ForgotPassword";
import Login from "pages/Login";
import NotFound from "pages/NotFound";
import Otp from "pages/Otp";
import Products from "pages/Products";
import Profile from "pages/Profile";
import Users from "pages/Users";
import { useSelector } from "react-redux";
import {
    Route,
    Routes as RouteContainer,
    BrowserRouter as Router,
} from "react-router-dom";
import { StoreModel } from "store/store";
import { Paths } from "utils/Paths";

const Routes = () => {
    const isLoggedIn = useSelector(
        (state: StoreModel) => state.credentialsReducer.isLoggedIn
    );

    return (
        <Router>
            <RouteContainer>
                <Route
                    element={
                        <ProtectedRoute
                            isRouteAccessible={!isLoggedIn}
                            redirectRoute={Paths.PROFILE}
                        />
                    }
                >
                    <Route index path={Paths.LOGIN} element={<Login />} />
                </Route>

                <Route
                    element={
                        <ProtectedRoute
                            isRouteAccessible={isLoggedIn}
                            redirectRoute={Paths.LOGIN}
                        />
                    }
                >
                    <Route
                        path={Paths.PROFILE}
                        element={
                            <Layout>
                                <Profile />
                            </Layout>
                        }
                    />
                </Route>

                <Route
                    element={
                        <ProtectedRoute
                            isRouteAccessible={isLoggedIn}
                            redirectRoute={Paths.LOGIN}
                        />
                    }
                >
                    <Route
                        path={Paths.USER_LIST}
                        element={
                            <Layout>
                                <Users />
                            </Layout>
                        }
                    />
                </Route>

                <Route
                    element={
                        <ProtectedRoute
                            isRouteAccessible={isLoggedIn}
                            redirectRoute={Paths.LOGIN}
                        />
                    }
                >
                    <Route
                        path={Paths.CHANGE_PASSWORD}
                        element={
                            <Layout>
                                <ChangePassword />
                            </Layout>
                        }
                    />
                </Route>

                <Route
                    element={
                        <ProtectedRoute
                            isRouteAccessible={isLoggedIn}
                            redirectRoute={Paths.LOGIN}
                        />
                    }
                >
                    <Route
                        path={Paths.VIEW_PRODUCTS}
                        element={
                            <Layout>
                                <Products />
                            </Layout>
                        }
                    />
                </Route>

                <Route
                    element={
                        <ProtectedRoute
                            isRouteAccessible={isLoggedIn}
                            redirectRoute={Paths.LOGIN}
                        />
                    }
                >
                    <Route
                        path={Paths.FEATURED_PRODUCTS}
                        element={
                            <Layout>
                                <FeaturedProducts />
                            </Layout>
                        }
                    />
                </Route>

                <Route
                    element={
                        <ProtectedRoute
                            isRouteAccessible={isLoggedIn}
                            redirectRoute={Paths.LOGIN}
                        />
                    }
                >
                    <Route
                        path={Paths.ADD_EDIT_PRODUCT}
                        element={
                            <Layout>
                                <AddEditProduct />
                            </Layout>
                        }
                    />
                </Route>

                <Route
                    element={
                        <ProtectedRoute
                            isRouteAccessible
                            redirectRoute={Paths.LOGIN}
                        />
                    }
                >
                    <Route
                        path={Paths.FORGOT_PASSWORD}
                        element={<ForgotPassword />}
                    />
                </Route>

                <Route
                    element={
                        <ProtectedRoute
                            isRouteAccessible
                            redirectRoute={Paths.LOGIN}
                        />
                    }
                >
                    <Route path={Paths.OTP} element={<Otp />} />
                </Route>
                <Route path={Paths.NOT_FOUND} element={<NotFound />} />
            </RouteContainer>
        </Router>
    );
};

export default Routes;
