import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Article from '../Article/Article';
import { getArticles } from '../../store/actions/getArticles';
import Spinner from '../Spinner/Spinner';
import Pagination from '../Pagination/Pagination';
import styles from './ArticlesList.module.css';

export default function ArticlesList() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const articles = useSelector(state => state.articles.articlesData.articles);
  const articlesCount = useSelector(state => state.articles.articlesData.articlesCount);
  const loading = useSelector(state => state.articles.loading);
  const error = useSelector(state => state.articles.error);

  useEffect(() => {
    const offset = (currentPage - 1) * pageSize;
    dispatch(getArticles(pageSize, offset));
  }, [currentPage]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className={styles.error}>Error! No data received!</div>;
  }

  return (
    <div className={styles.articlesList}>
      {articles.map((article, index) => (
        <Article
        key={index}
        title={article.title}
        descr={article.description}
        likeCount={article.favoritesCount}
        tagList={article.tagList}
        author={article.author}
        createdDate={article.createdAt}
        slug={article.slug} />
      ))}
      <Pagination total={Math.ceil(articlesCount / pageSize)} currentPage={currentPage} setPage={setCurrentPage} />
    </div>
  );
}