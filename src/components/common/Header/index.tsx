import Gear from "assets/svg/Gear";
import Key from "assets/svg/Key";
import Logout from "assets/svg/Logout";
import User from "assets/svg/User";
import { QueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { credentialsActions, personalDetailsActions } from "store/actions";
import styles from "styles/Layout.module.css";
import { Paths } from "utils/Paths";

const Header = (props: { isActive: boolean; onMenu: () => void }) => {
    const dispatch = useDispatch();
    const queryClient = new QueryClient();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        dispatch(personalDetailsActions.resetData());
        dispatch(credentialsActions.resetData());
        queryClient.clear();
    };

    return (
        <div className={styles.header}>
            <div className={`${styles.dropdown} dropdown`}>
                <button
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <Gear />
                </button>
                <div className="dropdown-menu shadow border-0">
                    <Link
                        to={Paths.PROFILE}
                        className={`${styles.dropdown_item} dropdown-item`}
                    >
                        <User />
                        <p>Profile</p>
                    </Link>
                    <Link
                        to={Paths.CHANGE_PASSWORD}
                        className={`${styles.dropdown_item} dropdown-item`}
                    >
                        <Key />
                        <p>Change Password</p>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button
                        className={`${styles.dropdown_item} dropdown-item`}
                        onClick={logoutHandler}
                    >
                        <Logout />
                        <p>Logout</p>
                    </button>
                </div>
            </div>

            <div
                onClick={props.onMenu}
                className={`${styles.hamburger} ${
                    props.isActive ? styles.is_active : ""
                }`}
            >
                <span className={styles.line}></span>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
            </div>
        </div>
    );
};

export default Header;
