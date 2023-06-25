import { ButtonType } from "models/general/ButtonType";
import styles from "styles/Button.module.css";

const Button = (props: {
    type?: ButtonType;
    text: string;
    onClick?: () => void;
    variant: "primary" | "secondary";
    isLoading?: boolean;
}) => {
    return (
        <>
            <button
                type={props.type ? props.type : undefined}
                className={`${styles.btn_container} ${
                    props.variant === "primary"
                        ? styles.primary
                        : styles.secondary
                }`}
                onClick={
                    props?.onClick && !!props?.isLoading === false
                        ? props.onClick
                        : undefined
                }
                disabled={!!props?.isLoading}
            >
                {props?.isLoading ? (
                    <div className={styles.spinner}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                ) : (
                    props.text
                )}
            </button>
        </>
    );
};

export default Button;
