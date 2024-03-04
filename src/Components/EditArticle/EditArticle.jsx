import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createSelector } from 'reselect';
import { updateArticle } from '../../store/actions/updateArticle';
import styles from './EditArticle.module.css';

export default function EditArticle() {
  const getArticles = state => state.articles.articlesData.articles;
  const getSlug = (state, slug) => slug;

  const originalArticleSelector = createSelector(
    [getArticles, getSlug],
    (articles, slug) => articles.find(article => article.slug === slug)
  );

  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);
  const token = useSelector(state => state.user.user.token);

  const originalArticle = useSelector(state => originalArticleSelector(state, slug));
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [editableArticle, SetEditableArticle] = useState({
    title: originalArticle.title,
    description: originalArticle.description,
    body: originalArticle.body,
    tags: originalArticle.tagList.map((tag, index) => ({ id: index + 1, value: tag }))
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, []);

  const handleInputChange = (e) => {
    SetEditableArticle({ ...editableArticle, [e.target.name]: e.target.value });
  };

  const handleTagChange = (id, newValue) => {
    const updatedTags = editableArticle.tags.map(tag => tag.id === id ? { ...tag, value: newValue } : tag);
    SetEditableArticle({ ...editableArticle, tags: updatedTags });
  };

  const handleTagDelete = (idToDelete) => {
    SetEditableArticle(prevArticle => ({
      ...prevArticle,
      tags: prevArticle.tags.filter(tag => tag.id !== idToDelete)
    }));
  };

  const addTag = () => {
    if (newTag.trim() !== '') {
      const newId = Date.now();
      const newTagObject = { id: newId, value: newTag };
      SetEditableArticle(prevArticle => ({
        ...prevArticle,
        tags: [...prevArticle.tags, newTagObject]
      }));
      setNewTag('');
    }
  };

  const handleTagAddKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleTagBlur = (id, value) => {
    if (!value.trim()) {
      handleTagDelete(id);
    }
  };

  const onSubmit = data => {
    const articleData = {
      title: data.title,
      description: data.shortDescription,
      body: data.text,
      tagList: editableArticle.tags.map(tag => tag.value),
    };
  
    dispatch(updateArticle(slug, articleData, token)).then(() => {
      navigate(`/articles/${slug}`);
    });
  };

  return (
    <form className={styles.articleForm} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.header}>Edit editableArticle</div>
      <div className={styles.formGroup}>
        <label htmlFor="Title" className={styles.label}>
          Title
          <input
            className={styles.formGroupInput}
            id="title"
            {...register('title', {
              required: 'Title is required',
              minLength: { value: 2, message: 'Title must be 2-250 characters long' },
              maxLength: { value: 250, message: 'Title must be 2-250 characters long' }
            })}
            placeholder="Title"
            required
            defaultValue={editableArticle.title}
            onChange={handleInputChange}
          />
        </label>
        {errors.title && <span className={styles.errorMessage}>{errors.title.message}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="shortDescription" className={styles.label}>
          Short description
          <input
            className={styles.formGroupInput}
            id="shortDescription"
            {...register('shortDescription', {
              required: 'Short description is required',
              minLength: { value: 3, message: 'Short description must be 3-250 characters long' },
              maxLength: { value: 250, message: 'Short description must be 3-250 characters long' }
            })}
            placeholder="Short description"
            required
            defaultValue={editableArticle.description}
            onChange={handleInputChange}
          />
        </label>
        {errors.shortDescription && <span className={styles.errorMessage}>{errors.shortDescription.message}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="Text" className={styles.label}>
          Text
          <textarea
            className={styles.formGroupTextarea}
            id="text"
            {...register('text', {
              required: 'Text is required',
              minLength: { value: 3, message: 'Text must be 3-2000 characters long' },
              maxLength: { value: 2000, message: 'Text must be 3-2000 characters long' }
            })}
            placeholder="Text"
            required 
            defaultValue={editableArticle.body}
            onChange={handleInputChange}
          />
        </label>
        {errors.text && <span className={styles.errorMessage}>{errors.text.message}</span>}
      </div>
      <div className={`${styles.formGroup} ${styles.tags}`}>
        <label htmlFor="tags" className={styles.label}>Tags
          {editableArticle.tags.map((tag) => (
            <div className={styles.tag} key={tag.id}>
              <input
                className={`${styles.formGroupInput} ${styles.tagInput}`}
                id="tags"
                defaultValue={tag.value}
                onChange={(e) => handleTagChange(tag.id, e.target.value)}
                onBlur={(e) => handleTagBlur(tag.id, e.target.value)}
                placeholder="Tag"
              />
              <button type="button" className={styles.tagDelete} onClick={() => handleTagDelete(tag.id)}>
                Delete
              </button>
            </div>
          ))}
        </label>
        
        <div className={styles.formAddTags}>
          <input
            className={`${styles.formGroupInput} ${styles.tagInput}`}
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleTagAddKeyPress}
            placeholder="Tag"
          />
          <button type="button" className={styles.tagDelete} onClick={() => setNewTag('')}>
              Delete
            </button>
          <button type="button" className={styles.tagAdd} onClick={addTag}>Add Tag</button>
        </div>
      </div>
      <button type="submit" className={styles.submitBtn}>Send</button>
    </form>
  );
}