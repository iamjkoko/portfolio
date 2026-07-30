import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '../constants/routes';
import styles from '../styles/works.module.css';

function Back() {
  return (
    <Link to={ROUTES.WORKS.ROOT} className={styles.back}>
      <ArrowLeft className={styles['back-icon']} aria-hidden />
      Back
    </Link>
  );
}

export default Back;
