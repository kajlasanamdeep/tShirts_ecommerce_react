import { ForgotPass } from "api/ForgotPass";
import Button from "common/Button";
import CardHeader from "common/CardHeader";
import Input from "common/Input";
import { IError } from "models/general/ErrorType";
import { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "styles/ForgotPassword.module.css";
import { Keys } from "utils/Keys";
import { Paths } from "utils/Paths";

const ForgotPassword = () => {
    const { isLoading, mutateAsync } = useMutation(Keys.FORGOT, ForgotPass);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const resetErrorHandler = () => {
        if (error.length > 0) {
            setError("");
        }
    };

    const formHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if (isLoading) return;

        resetErrorHandler();

        if (email.trim().length < 4 || !email.includes("@")) {
            setError("Please enter a valid email address");
            return;
        }

        mutateAsync(email)
            .then((res) => {
                toast.success(res?.message);
                navigate(Paths.OTP, { state: { email } });
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : "Unable to login right now!"
                )
            );
    };

    return (
        <div className={styles.card_container}>
            <CardHeader
                heading="Reset Password"
                subheading="Re-Password with The Zenky."
            />
            <form className={styles.form} onSubmit={formHandler}>
                <div
                    className={`alert alert-success ${styles.msg}`}
                    role="alert"
                >
                    Enter your Email and OTP will be sent to you!
                </div>

                <Input
                    type="email"
                    label="Email"
                    placeholder="Enter email"
                    value={email}
                    onChange={changeHandler}
                    maxLength={80}
                    errorText={error}
                    onFocus={resetErrorHandler}
                />

                <div className={styles.btn}>
                    <Button
                        type="submit"
                        text="Reset"
                        variant="primary"
                        isLoading={isLoading}
                    />
                </div>
                <Link to={Paths.LOGIN} className={styles.link}>
                    Go back to <span>Login</span>
                </Link>
            </form>
        </div>
    );
};

export default ForgotPassword;
