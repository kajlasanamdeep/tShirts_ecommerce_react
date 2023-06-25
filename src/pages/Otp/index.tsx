import { VerifyOtp } from "api/VerifyOtp";
import CloseEye from "assets/svg/CloseEye";
import Envelope from "assets/svg/Envelope";
import OpenEye from "assets/svg/OpenEye";
import Button from "common/Button";
import Input from "common/Input";
import { IOtp, IOtpPayload } from "models/api/OtpResponse";
import { IError } from "models/general/ErrorType";
import { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { credentialsActions } from "store/actions";
import styles from "styles/Otp.module.css";
import { Keys } from "utils/Keys";
import { Paths } from "utils/Paths";

const Otp = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, mutateAsync } = useMutation(Keys.VERIFY_OTP, VerifyOtp);

    const [data, setData] = useState<IOtp>({
        otp: "",
        newPassword: "",
    });

    const [error, setError] = useState<IOtp>({
        otp: "",
        newPassword: "",
    });

    const [show, setShow] = useState(false);

    const toggleShowHandler = () => {
        setShow((oldState) => !oldState);
    };

    const changeHandler = (
        uid: keyof IOtp,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (uid === "otp" && event.target.value.length > 6) return;

        setData((oldState) => ({
            ...oldState,
            [uid]: event.target.value,
        }));
    };

    const resetErrorHandler = () => {
        if (error.otp.length > 0 || error.newPassword.length > 0) {
            setError({
                otp: "",
                newPassword: "",
            });
        }
    };

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if (isLoading) return;

        resetErrorHandler();

        let flag = false;
        const errorData = { ...error };

        if (data.otp.trim().length !== 6 || !!Number(data.otp) === false) {
            errorData.otp = "Please enter a valid 6 digit OTP";
            flag = true;
        }

        if (data.newPassword.length < 8) {
            errorData.newPassword =
                "Please enter valid password of atleast 8 characters";
            flag = true;
        }

        if (flag) {
            setError({
                newPassword: errorData.newPassword,
                otp: errorData.otp,
            });
            return;
        }

        const apiData: IOtpPayload = {
            email: state.email,
            newPassword: data.newPassword,
            otp: data.otp,
        };

        mutateAsync(apiData)
            .then((res) => {
                toast.success(res?.message);
                localStorage.removeItem("token");
                dispatch(credentialsActions.resetData());
                navigate(Paths.LOGIN, { replace: true });
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : "Unable to change password right now!"
                )
            );
    };

    if (!!state?.email === false) {
        return <Navigate to={Paths.FORGOT_PASSWORD} replace />;
    }

    return (
        <div className={styles.card_container}>
            <div className={styles.envelope}>
                <Envelope />
            </div>
            <div className={styles.heading}>
                <h1>Verify your email</h1>
                <p>
                    Please enter the 6 digit code sent to{" "}
                    <span>{state?.email}</span>
                </p>
            </div>
            <form className={styles.form} onSubmit={submitHandler}>
                <Input
                    type="number"
                    label="OTP"
                    placeholder="Enter OTP"
                    value={data.otp}
                    onChange={changeHandler.bind(this, "otp")}
                    errorText={error.otp}
                    onFocus={resetErrorHandler}
                    maxLength={6}
                />
                <div className={styles.password_input}>
                    <Input
                        type={show ? "text" : "password"}
                        label="New Password"
                        placeholder="Enter New Password"
                        value={data.newPassword}
                        onChange={changeHandler.bind(this, "newPassword")}
                        errorText={error.newPassword}
                        onFocus={resetErrorHandler}
                        maxLength={50}
                    />
                    <div className={styles.eye}>
                        {show ? (
                            <CloseEye onClick={toggleShowHandler} />
                        ) : (
                            <OpenEye onClick={toggleShowHandler} />
                        )}
                    </div>
                </div>
                <Button
                    variant="primary"
                    text="Change Password"
                    type="submit"
                    isLoading={isLoading}
                />
            </form>
        </div>
    );
};

export default Otp;
