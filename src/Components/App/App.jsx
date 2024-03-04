import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from '../Header/Header';
import ArticlesList from '../ArticlesList/ArticlesList';
import ArticlePage from '../ArticlePage/ArticlePage';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import EditProfile from '../EditProfile/EditProfile';
import CreateArticle from '../CreateArticle/CreateArticle';
import EditArticle from '../EditArticle/EditArticle';
import { store } from '../../store/store';
import NotFound from '../NotFound/NotFound';
import styles from './App.module.css';

export default function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path="/" element={<ArticlesList />} />
            <Route path="/articles" element={<ArticlesList />} />
            <Route path="/articles/:slug" element={<ArticlePage />}/>
            <Route path="/sign-up" element={<SignUp />}/>
            <Route path="/sign-in" element={<SignIn />}/>
            <Route path="/profile" element={<EditProfile />}/>
            <Route path="/new-article" element={<CreateArticle />}/>
            <Route path="/articles/:slug/edit" element={<EditArticle />}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Provider>
      </div>
    </Router>
  );
}