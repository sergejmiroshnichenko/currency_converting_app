import icon from '/image/currency-exchange.svg';
import styles from './Loader.module.scss';

export const Loader = () => <img src={icon} alt="loading..." className={styles.loader} />;