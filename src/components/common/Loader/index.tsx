import { createPortal } from "react-dom";
import styles from "styles/Loader.module.css";

const Loader = () => {
    return createPortal(
        <div className={styles.loader}>
            <div className={styles.center_div}>
                <div>
                    <p>
                        The
                        <br />
                        Zenky
                    </p>
                </div>
            </div>
        </div>,
        document.getElementById("loader")!
    );
};

export default Loader;
