import { ReactComponent as SpinnerSvg } from '../../img/spinner.svg';
import styles from './Spinner.module.css';

export default function Spinner() {
    return (
        <div className={styles.spinner}>
          <SpinnerSvg className={styles.spinnerImg} alt="Spinner..." />
        </div>
    );
}