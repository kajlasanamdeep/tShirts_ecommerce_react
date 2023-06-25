import styles from "styles/Input.module.css";

const Input = (props: {
    type: React.HTMLInputTypeAttribute;
    label: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    maxLength?: number;
    errorText: string;
    onFocus?: () => void;
}) => {
    return (
        <div className={styles.input_holder}>
            <p className={styles.label}>{props.label}</p>
            <div>
                <input
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    maxLength={props?.maxLength ? props.maxLength : undefined}
                    onFocus={props.onFocus ? props.onFocus : undefined}
                    className={`${styles.input} ${
                        props.errorText ? styles.error_input : ""
                    }`}
                />
                <p className={styles.error}>
                    {props.errorText ? props.errorText : ""}
                </p>
            </div>
        </div>
    );
};

export default Input;
