import { AdminProfile } from "api/AdminProfile";
import Spinner from "common/Spinner";
import { useEffect, useMemo } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { personalDetailsActions } from "store/actions";
import { StoreModel } from "store/store";
import styles from "styles/Profile.module.css";
import { formatDate } from "utils/Helpers";
import { Keys } from "utils/Keys";

const Profile = () => {
    const dispatch = useDispatch();

    const personalData = useSelector(
        (state: StoreModel) => state.personalDetailsReducer
    );

    const { isLoading, mutateAsync } = useMutation(
        Keys.ADMIN_PROFILE,
        AdminProfile
    );

    useEffect(() => {
        async function fetchProfileData() {
            const data = await mutateAsync();
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
        }

        if (!!personalData?._id === false) {
            fetchProfileData();
        }
    }, [personalData._id, dispatch, mutateAsync]);

    const joinedOn = useMemo(
        () =>
            personalData?.createdAt ? formatDate(personalData?.createdAt) : "",
        [personalData?.createdAt]
    );

    return (
        <>
            {isLoading ? <Spinner /> : null}
            <div className={`${styles.profile_container} container`}>
                <h4>Profile</h4>
                <div className={`${styles.card} card shadow-sm`}>
                    <div className={`${styles.profile_data} card-body`}>
                        <h5>{personalData?.userName}</h5>
                        <p className={styles.email}>{personalData?.email}</p>
                        <div className={styles.row}>
                            <div>Role</div>
                            <div>{personalData?.role}</div>
                        </div>
                        <div className={styles.row}>
                            <div>Joined On</div>
                            <div className="col-12 col-sm-6">{joinedOn}</div>
                        </div>
                        <div className={styles.row}>
                            <div>Status</div>
                            <div
                                className={
                                    personalData?.isBlocked
                                        ? styles.blocked
                                        : styles.active
                                }
                            >
                                {personalData?.isBlocked ? "Blocked" : "Active"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
