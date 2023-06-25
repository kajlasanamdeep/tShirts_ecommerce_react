import { ChangePass } from "api/ChangePass";
import CloseEye from "assets/svg/CloseEye";
import OpenEye from "assets/svg/OpenEye";
import Button from "common/Button";
import Input from "common/Input";
import {
    IChangePassword,
    IChangePasswordEye,
    IChangePasswordPayload,
} from "models/data/ChangePasswordModel";
import { IError } from "models/general/ErrorType";
import { useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { StoreModel } from "store/store";
import styles from "styles/ChangePassword.module.css";
import { Keys } from "utils/Keys";

const ChangePassword = () => {
    const [data, setData] = useState<IChangePassword>({
        oldPassword: "",
        newPassword: "",
    });

    const [error, setError] = useState<IChangePassword>({
        oldPassword: "",
        newPassword: "",
    });

    const [show, setShow] = useState<IChangePasswordEye>({
        oldPassword: false,
        newPassword: false,
    });

    const token = useSelector(
        (state: StoreModel) => state.credentialsReducer.token
    );

    const { isLoading, mutateAsync } = useMutation(
        Keys.CHANGE_PASSWORD,
        ChangePass
    );

    const toggleShowHandler = (uid: keyof IChangePasswordEye) => {
        setShow((oldState) => ({
            ...oldState,
            [uid]: !oldState[uid],
        }));
    };

    const resetErrorHandler = () => {
        if (error.oldPassword.length > 0 || error.newPassword.length > 0) {
            setError({
                oldPassword: "",
                newPassword: "",
            });
        }
    };

    const changeHandler = (
        uid: keyof IChangePassword,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setData((oldState) => ({
            ...oldState,
            [uid]: event.target.value,
        }));
    };

    const formHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (isLoading) return;

        resetErrorHandler();

        if (data.oldPassword.length < 8) {
            setError((oldState) => ({
                ...oldState,
                oldPassword: "Old Password should be atleast 8 characters long",
            }));
            return;
        }

        if (data.newPassword.length < 8) {
            setError((oldState) => ({
                ...oldState,
                newPassword: "New Password should be atleast 8 characters long",
            }));
            return;
        }

        const payloadData: IChangePasswordPayload = {
            newPassword: data.newPassword,
            oldPassword: data.oldPassword,
            token: token!,
        };

        mutateAsync(payloadData)
            .then((res) => {
                toast.success(res.message);
            })
            .catch((err: IError) => {
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : "Unable to login right now!"
                );
            });
    };

    return (
        <div className={`${styles.container} container`}>
            <h4>Change Password</h4>

            <div className="card shadow-sm">
                <div className="card-body">
                    <form
                        className={styles.input_holder}
                        onSubmit={formHandler}
                    >
                        <div className={styles.password_input}>
                            <Input
                                type={show.oldPassword ? "text" : "password"}
                                label="Old Password"
                                value={data.oldPassword}
                                onChange={changeHandler.bind(
                                    this,
                                    "oldPassword"
                                )}
                                errorText={error.oldPassword}
                                placeholder="Enter old password"
                                maxLength={50}
                                onFocus={resetErrorHandler}
                            />
                            <div className={styles.eye}>
                                {show.oldPassword ? (
                                    <CloseEye
                                        onClick={toggleShowHandler.bind(
                                            this,
                                            "oldPassword"
                                        )}
                                    />
                                ) : (
                                    <OpenEye
                                        onClick={toggleShowHandler.bind(
                                            this,
                                            "oldPassword"
                                        )}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={styles.password_input}>
                            <Input
                                type={show.newPassword ? "text" : "password"}
                                label="New Password"
                                value={data.newPassword}
                                onChange={changeHandler.bind(
                                    this,
                                    "newPassword"
                                )}
                                errorText={error.newPassword}
                                placeholder="Enter new password"
                                maxLength={50}
                                onFocus={resetErrorHandler}
                            />
                            <div className={styles.eye}>
                                {show.newPassword ? (
                                    <CloseEye
                                        onClick={toggleShowHandler.bind(
                                            this,
                                            "newPassword"
                                        )}
                                    />
                                ) : (
                                    <OpenEye
                                        onClick={toggleShowHandler.bind(
                                            this,
                                            "newPassword"
                                        )}
                                    />
                                )}
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            text="Change"
                            type="submit"
                            isLoading={isLoading}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
