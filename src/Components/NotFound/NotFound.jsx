import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <>
      <div className={styles.message}>
        <p className={styles.messageText}>The page was not found.</p>
        <p className={styles.messageText}>Click on the button to return to the main page.</p>
      </div>
      <Link to="/">
        <button className={styles.btn__back} type='button'>Main page</button>
      </Link>
    </>
  );
}