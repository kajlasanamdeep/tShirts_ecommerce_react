import { Link, useLocation } from "react-router-dom";
import styles from "styles/Layout.module.css";

const SidebarItem = (props: {
    path: string;
    title: string;
    icon: React.ReactNode;
    onSelect: () => void;
}) => {
    const { pathname } = useLocation();

    return (
        <div
            className={`${styles.sidebar_item} ${
                pathname === props.path ? styles.active_path : ""
            }`}
        >
            <Link to={props.path} onClick={props.onSelect}>
                {props.icon}
                <p>{props.title}</p>
            </Link>
        </div>
    );
};

export default SidebarItem;
