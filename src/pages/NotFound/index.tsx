import NotFoundImg from "assets/images/not_found.png";
import Disc from "assets/svg/Disc";
import Button from "common/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StoreModel } from "store/store";
import styles from "styles/NotFound.module.css";
import { Paths } from "utils/Paths";

const NotFound = () => {
    const isLoggedIn = useSelector(
        (state: StoreModel) => state.credentialsReducer.isLoggedIn
    );
    const navigate = useNavigate();

    const navigateHandler = () => {
        navigate(isLoggedIn ? Paths.PROFILE : Paths.LOGIN);
    };

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.text}>
                    <p>4</p>
                    <Disc />
                    <p>4</p>
                </div>
                <p className={styles.subtext}>Sorry, page not found</p>
            </div>
            <div>
                <Button
                    type="button"
                    variant="primary"
                    text={isLoggedIn ? "Back to Profile" : "Back to Login"}
                    onClick={navigateHandler}
                />
            </div>
            <img
                className="img-fluid"
                src={NotFoundImg}
                alt="Laying man in office"
            />
        </div>
    );
};

export default NotFound;
