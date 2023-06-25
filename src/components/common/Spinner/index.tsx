import { createPortal } from "react-dom";
import styles from "styles/Spinner.module.css";

const Spinner = () => {
    return createPortal(
        <div className={styles.container}>
            <div className={`${styles.spinner} ${styles.spinner_1}`}></div>
            <p>Please Wait</p>
        </div>,
        document.getElementById("spinner")!
    );
};

export default Spinner;
