import Logo from "assets/images/logo.png";
import SidebarItem from "common/SidebarItem";
import styles from "styles/Layout.module.css";
import { SIDEBAR_ITEMS } from "utils/SidebarItems";

const Sidebar = (props: { isVisible: boolean; onSelect: () => void }) => {
    return (
        <div
            className={`${styles.sidebar} ${
                props.isVisible ? styles.sidebar_active : ""
            }`}
        >
            <div className={styles.logo_brand}>
                <img src={Logo} className="img-fluid" alt="Logo" />
            </div>
            <div className={styles.sidebar_container}>
                {SIDEBAR_ITEMS.map((item) => (
                    <SidebarItem
                        key={item.id}
                        icon={item.icon}
                        title={item.title}
                        path={item.path}
                        onSelect={props.onSelect}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
