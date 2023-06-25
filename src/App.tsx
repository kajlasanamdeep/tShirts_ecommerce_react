import { AdminProfile } from "api/AdminProfile";
import Loader from "common/Loader";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import Routes from "routes/Routes";
import { credentialsActions, personalDetailsActions } from "store/actions";
import { Keys } from "utils/Keys";

const App = () => {
    const dispatch = useDispatch();

    const { isLoading } = useQuery(Keys.ADMIN_PROFILE, AdminProfile, {
        onSuccess: (data) => {
            dispatch(
                credentialsActions.setData({
                    email: data.email,
                    token: data.token,
                })
            );
            dispatch(
                personalDetailsActions.setData({
                    _id: data._id,
                    createdAt: data.createdAt,
                    email: data.email,
                    isBlocked: data.isBlocked,
                    role: data.role,
                    userName: data.userName,
                })
            );
        },
        onError: () => localStorage.removeItem("token"),
    });

    if (isLoading) {
        return <Loader />;
    }

    return <Routes />;
};

export default App;
