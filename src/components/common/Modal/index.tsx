import Button from "common/Button";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "styles/Modal.module.css";

const Modal = (props: {
    heading: string;
    para: string;
    onConfirm: () => void;
    onCancel: () => void;
}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    return createPortal(
        <div className={styles.container}>
            <div
                className={`${styles.content} ${visible ? styles.active : ""}`}
            >
                <h2 className={styles.heading}>{props.heading}</h2>
                <p className={styles.text}>{props.para}</p>
                <div className={styles.btn_holder}>
                    <div>
                        <Button
                            text="Go Back"
                            variant="secondary"
                            onClick={props.onCancel}
                        />
                    </div>
                    <div>
                        <Button
                            text="Proceed"
                            variant="primary"
                            onClick={props.onConfirm}
                        />
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("modal")!
    );
};

export default Modal;
