import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import like from '../../img/like.svg';
import likeRed from '../../img/likeRed.svg';
import { addLike } from '../../store/actions/addLike';
import { deleteLike } from '../../store/actions/deleteLike';
import styles from './Article.module.css';

export default function Article({ title, descr, likeCount, tagList, author, createdDate, slug }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const token = useSelector(state => state.user.user?.token);
  const favoritedArticle = useSelector(state => 
  state.articles.articlesData.articles.find(article => article.slug === slug)?.favorited);
  const formattedDate = format(new Date(createdDate), "MMMM d, yyyy");

  document.querySelectorAll('.tag').forEach(tag => {
    if (tag.offsetWidth < tag.scrollWidth) {
      tag.classList.add('long-tag');
    }
  });

  const handleLike = () => {
    if (!user) return;
  
    if (favoritedArticle) {
      dispatch(deleteLike(slug, token));
    } else {
      dispatch(addLike(slug, token));
    }
  };
  
  return (
    <div className={styles.article}>
      <div className={styles.articleData}>
        <div className={styles.titleWrap}>
          <Link to={`/articles/${slug}`} className={styles.titleArticle}>{title}</Link>
          <button type='button' onClick={handleLike} className={styles.buttonLike} >
          <img
            src={favoritedArticle && user ? likeRed : like}
            alt="like"
          />
          </button>
          <span className={styles.likeCount}>{likeCount}</span>
        </div>
        <ul className={styles.tagList}>
          {tagList.slice(0, 5).map((tag, index) => (
            <li key={index} className={styles.tag}>{tag}</li>
          ))}
        </ul>
        <p className={styles.descrArticle}>{descr}</p>
      </div>
      <div className={styles.authorData}>
        <div className={styles.dataWrap}>
          <span className={styles.nameAuthor}>{author.username}</span>
          <span className={styles.articleDate}>{formattedDate}</span>
        </div>
        <img className={styles.avatarImg} src={author.image} alt="avatar" />
      </div>
    </div>
  );
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  descr: PropTypes.string,
  likeCount: PropTypes.number,
  tagList: PropTypes.arrayOf(PropTypes.string),
  author: PropTypes.shape({
    username: PropTypes.string,
    image: PropTypes.string
  }),
  createdDate: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
};

Article.defaultProps = {
  descr: '',
  likeCount: 0,
  tagList: [],
  author: {
    username: '',
    image: ''
  }
}