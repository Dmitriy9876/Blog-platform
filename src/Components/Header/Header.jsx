import { Link, useNavigate   } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedOut } from '../../store/actions/loginUser';
import backupAvatar from '../../img/backupAvatar.png';
import styles from './Header.module.css';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);
  const username = user?.username;
  const avatar = user?.image;

  const handleLogout = () => {
    navigate('/sign-in');
    localStorage.removeItem('user');
    dispatch(userLoggedOut());
  };

  const handleError = (e) => {
    e.target.src = backupAvatar;
  };

  return (
    <header className={styles.header}>
      <a href='/' className={styles.blogName}>Realworld Blog</a>
      <div className={styles.authWrap}>
        {username ? (
          <>
            <Link to="/new-article" className={styles.createArticle} type='button'>Create article</Link>
            <Link to="/profile" className={styles.username}>{username}</Link>
            <img src={avatar || backupAvatar} alt="Profile" className={styles.userImage} onError={handleError} />
            <button className={styles.logout} type='button' onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <button className={styles.signIn} type='button'>Sign In</button>
            </Link>
            <Link to="/sign-up">
              <button className={styles.signUp} type='button'>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}