import { LoginAdmin } from "api/LoginAdmin";
import CloseEye from "assets/svg/CloseEye";
import Lock from "assets/svg/Lock";
import OpenEye from "assets/svg/OpenEye";
import Button from "common/Button";
import CardHeader from "common/CardHeader";
import Input from "common/Input";
import { ILogin } from "models/data/LoginModel";
import { IError } from "models/general/ErrorType";
import { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { credentialsActions } from "store/actions";
import styles from "styles/Login.module.css";
import { Keys } from "utils/Keys";
import { Paths } from "utils/Paths";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, mutateAsync } = useMutation(Keys.LOGIN, LoginAdmin);

    const [show, setShow] = useState(false);

    const [data, setData] = useState<ILogin>({
        email: "",
        password: "",
    });

    const [error, setError] = useState<ILogin>({
        email: "",
        password: "",
    });

    const clearErrorHandler = () => {
        if (error.email.length > 0 || error.password.length > 0) {
            setError({
                email: "",
                password: "",
            });
        }
    };

    const changeHandler = (
        uid: keyof ILogin,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setData((oldState) => ({
            ...oldState,
            [uid]: event.target.value,
        }));
    };

    const toggleShowHandler = () => {
        setShow((oldState) => !oldState);
    };

    const formHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if (isLoading) return;

        clearErrorHandler();

        let flag = false;

        const errorData = { ...error };

        if (data.email.trim().length < 4 || !data.email.includes("@")) {
            errorData.email = "Please enter a valid email address";
            flag = true;
        }

        if (data.password.trim().length < 8) {
            errorData.password =
                "Please enter a valid password of atleast 8 characters";
            flag = true;
        }

        if (flag) {
            setError({
                email: errorData.email,
                password: errorData.password,
            });
            return;
        }

        mutateAsync(data)
            .then((res) => {
                toast.success(res.message);
                localStorage.setItem("token", res.data?.token);
                dispatch(
                    credentialsActions.setData({
                        email: data.email,
                        token: res.data?.token,
                    })
                );
                navigate(Paths.PROFILE);
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
        <div className={styles.card_container}>
            <CardHeader
                heading="Welcome Back !"
                subheading="Sign in to continue to The Zenky."
            />
            <form className={styles.form} onSubmit={formHandler}>
                <Input
                    type="email"
                    label="Email"
                    value={data.email}
                    placeholder="Enter email"
                    onChange={changeHandler.bind(this, "email")}
                    onFocus={clearErrorHandler}
                    errorText={error.email}
                    maxLength={80}
                />
                <div className={styles.password_input}>
                    <Input
                        type={show ? "text" : "password"}
                        label="Password"
                        value={data.password}
                        placeholder="Enter password"
                        onChange={changeHandler.bind(this, "password")}
                        onFocus={clearErrorHandler}
                        errorText={error.password}
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
                    text="Log In"
                    variant="primary"
                    type="submit"
                    isLoading={isLoading}
                />
                <Link to={Paths.FORGOT_PASSWORD} className={styles.forgot}>
                    <Lock />
                    Forgot Password
                </Link>
            </form>
        </div>
    );
};

export default Login;
