import Header from "common/Header";
import Sidebar from "common/Sidebar";
import { useState } from "react";
import styles from "styles/Layout.module.css";

const Layout = (props: { children: React.ReactNode }) => {
    const [show, setShow] = useState(false);

    const toggleShowHandler = () => {
        setShow((oldState) => !oldState);
    };

    return (
        <>
            <Header isActive={show} onMenu={toggleShowHandler} />
            <Sidebar isVisible={show} onSelect={setShow.bind(this, false)} />
            <div className={styles.content}>{props.children}</div>
        </>
    );
};

export default Layout;
