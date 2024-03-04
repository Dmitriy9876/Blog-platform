import PropTypes from 'prop-types';
import arrowBack from '../../img/arrowBack.svg';
import arrowNext from '../../img/arrowNext.svg';
import styles from './Pagination.module.css';

export default function Pagination({ total, currentPage, setPage }) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === total;
  const pageLimit = 5;

  const halfPageLimit = Math.floor(pageLimit / 2);
  const effectiveTotal = total - pageLimit + 1;
  const adjustedCurrentPage = Math.min(currentPage, effectiveTotal);
  const startPage = Math.max(1, adjustedCurrentPage - halfPageLimit);
  
  const endPage = Math.min(total, startPage + pageLimit - 1);

  const handleSetPage = (newPage) => {
    setPage(newPage);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 0);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.btn} ${styles.arrow} ${isFirstPage ? styles.inactiveArrow : ''}`}
        type="button"
        onClick={() => handleSetPage(currentPage - 1)}
        disabled={isFirstPage}
      >
        <img src={arrowBack} alt="arrow back" />
      </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(number => (
        <button
          key={number}
          className={`${styles.btn} ${currentPage === number ? styles.active : ''}`}
          type="button"
          onClick={() => handleSetPage(number)}
        >
          {number}
        </button>
      ))}
      <button
        className={`${styles.btn} ${styles.arrow} ${isLastPage ? 'disabled' : ''}`}
        type="button"
        onClick={() => handleSetPage(currentPage + 1)}
      >
        <img src={arrowNext} alt="arrow next" />
      </button>
    </div>
  );
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
}