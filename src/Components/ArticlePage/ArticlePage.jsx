import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { createSelector } from 'reselect';
import Markdown from 'react-markdown';
import { format } from 'date-fns';
import Popconfirm from '../Popconfirm/Popconfirm';
import { getArticle} from '../../store/actions/getArticles';
import { deleteArticle } from '../../store/actions/deleteArticle';
import like from '../../img/like.svg';
import likeRed from '../../img/likeRed.svg';
import { addLike } from '../../store/actions/addLike';
import { deleteLike } from '../../store/actions/deleteLike';
import Spinner from '../Spinner/Spinner';
import NotFound from '../NotFound/NotFound';
import styles from './ArticlePage.module.css';

export default  function ArticlePage() {
  const getArticles = state => state.articles.articlesData.articles;
  const getArticleLoading = state => state.articles.loading;
  const getArticleError = state => state.articles.error;
  const getUser = state => state.user.user;

  const makeGetArticleBySlug = slug => createSelector(
    [getArticles],
    articles => articles.find(article => article.slug === slug)
  );

  const makeGetArticleState = slug => createSelector(
    [makeGetArticleBySlug(slug), getArticleLoading, getArticleError, getUser],
    (article, loading, error, user) => ({
      article,
      loading,
      error,
      user,
      username: user?.username,
      token: user?.token,
    })
  );

  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getArticleState = useMemo(() => makeGetArticleState(slug), [slug]);

  const { article, loading, error, user, username, token } = useSelector(state => getArticleState(state));

  useEffect(() => {
    dispatch(getArticle(slug));
    window.scrollTo(0, 0);
  }, []);

  

  const handleDelete = () => {
    dispatch(deleteArticle(slug, token)).then(() => navigate('/'));
  };

  const handleLike = () => {
    if (!user) return;

    dispatch(article.favorited ? deleteLike(slug, token) : addLike(slug, token));
  };

  if (loading) return <Spinner />;
  if (error) return <div className={styles.error}>Error! No data received!</div>;
  if (!article) return <NotFound />;

  const formattedDate = format(new Date(article.createdAt), "MMMM d, yyyy");

  return (
    <div className={styles.article}>
      <div className={styles.articleData}>
        <div className={styles.titleWrap}>
          <div className={styles.titleArticle}>{article.title}</div>
          <div className={styles.likeWrap}>
          <button type='button' onClick={handleLike} className={styles.buttonLike} >
            <img
              src={article.favorited && user ? likeRed : like}
              alt="like"
            />
          </button>
            <span className={styles.likeCount}>{article.favoritesCount}</span>
          </div>
        </div>
        <ul className={styles.tagList}>
          {article.tagList.slice(0, 20).map((tag, index) => (
            <li key={index} className={styles.tag}>{tag}</li>
          ))}
        </ul>
        <Markdown>{article.body}</Markdown>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.authorData}>
          <div className={styles.dataWrap}>
            <span className={styles.nameAuthor}>{article.author.username}</span>
            <span className={styles.articleDate}>{formattedDate}</span>
          </div>
          <img className={styles.avatarImg} src={article.author.image} alt="avatar" />
        </div>
        <div className={styles.wrapButtons}>
        {username === article.author.username && (
          <>
            <Popconfirm deleteArticle={handleDelete}>
              <button type='button' className={styles.buttonDelete}>Delete</button>
            </Popconfirm>
            <Link to={`/articles/${slug}/edit`} className={styles.linkEdit}>Edit</Link>
          </>
        )}
        </div>
      </div>
    </div>
  );
}