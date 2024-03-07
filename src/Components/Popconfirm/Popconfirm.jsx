import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import exclamationCircle from '../../img/exclamationCircle.svg';
import styles from './Popconfirm.module.css';

export default function Popconfirm({ children, deleteArticle }) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeButton, setActiveButton] = useState('yes');

  const show = () => {
    setIsVisible(true);
    setActiveButton('yes');
  };

  const hide = () => {
  setIsVisible(false);
  setActiveButton(null);
};

  const handleConfirm = () => {
    deleteArticle();
    hide();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isVisible) return;

      event.stopPropagation();

      switch (event.key) {
        case 'ArrowLeft':
          setActiveButton('no');
          break;
        case 'ArrowRight':
          setActiveButton('yes');
          break;
        case 'Enter':
          if (activeButton === 'yes') {
            handleConfirm();
          } else if (activeButton === 'no') {
            setTimeout(() => {
              hide();
            }, 0);
          }
          break;
        case 'Escape':
          hide();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, activeButton]);

  return (
    <div className={styles.popconfirm}>
      <div
        role="button"
        tabIndex={0}
        onClick={show}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !isVisible) {
            show();
            e.stopPropagation();
          }
        }}
        className={styles.popconfirmTrigger}
      >
        {children}
      </div>
      {isVisible && (
        <div className={styles.popconfirmContent}>
          <div className={styles.iconWithText}>
            <img src={exclamationCircle} alt="Exclamation Circle" className={styles.exclamationCircle} />
            <div className={styles.popconfirmMessage}>Are you sure to delete this article?</div>
          </div>
          <div className={styles.popconfirmActions}>
            <button
              type="button"
              onClick={hide}
              onMouseEnter={() => setActiveButton('no')}
              className={`${styles.popconfirmCancel} ${activeButton === 'no' ? styles.active : ''}`}
            >
              No
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              onMouseEnter={() => setActiveButton('yes')}
              className={`${styles.popconfirmConfirm} ${activeButton === 'yes' ? styles.active : ''}`}
            >
              Yes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

Popconfirm.propTypes = {
  children: PropTypes.node.isRequired,
  deleteArticle: PropTypes.func.isRequired,
}