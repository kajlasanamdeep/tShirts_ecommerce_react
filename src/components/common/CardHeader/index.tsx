import LoginImg from 'assets/images/login.png';
import styles from 'styles/CardHeader.module.css';

const CardHeader = (props: { heading: string; subheading: string }) => {
    return (
        <div className={styles.login_card}>
            <div className={`${styles.top_row} text-center text-sm-start row`}>
                <div className={`${styles.heading} py-2 col-sm-6`}>
                    <h1>{props.heading}</h1>
                    <p>{props.subheading}</p>
                </div>
                <div className="col-sm-6 d-flex justify-content-center justify-content-sm-end">
                    <img src={LoginImg} alt="Man using Laptop" className="img-fluid" />
                </div>
            </div>
        </div>
    )
}

export default CardHeader