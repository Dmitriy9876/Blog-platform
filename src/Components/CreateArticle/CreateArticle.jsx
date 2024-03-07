import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postArticle } from '../../store/actions/postArticle';
import Input from '../Input/Input';
import styles from './CreateArticle.module.css';

export default function CreateArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);
  const token = useSelector(state => state.user.user.token);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [article, setArticle] = useState({
    title: '',
    shortDescription: '',
    text: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, []);

  const handleInputChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleTagChange = (id, newValue) => {
    const updatedTags = article.tags.map(tag => tag.id === id ? { ...tag, value: newValue } : tag);
    setArticle({ ...article, tags: updatedTags });
  };

  const handleTagDelete = (idToDelete) => {
    const filteredTags = article.tags.filter(tag => tag.id !== idToDelete);
    setArticle({ ...article, tags: filteredTags });
  };

  const handleTagBlur = (id, value) => {
    if (!value.trim()) {
      handleTagDelete(id);
    }
  };

  const addTag = () => {
    if (newTag.trim() !== '') {
      const newTagObject = { id: Date.now(), value: newTag };
      setArticle({
        ...article,
        tags: [...article.tags, newTagObject]
      });
      setNewTag('');
    }
  };

  const handleTagAddKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const onSubmit = async (data) => {
    const articleData = {
      title: data.title,
      description: data.shortDescription,
      body: data.text,
      tagList: article.tags.map(tag => tag.value),
    };
  
    dispatch(postArticle(articleData, token))
      .then(() => {
        navigate('/');
      })
  };

  return (
    <form className={styles.articleForm} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.header}>Create new article</div>
      <Input
        label="Title"
        type="text"
        name="title"
        placeholder="Title"
        register={register}
        rules={{
          required: 'Title is required',
          minLength: { value: 2, message: 'Title must be 2-250 characters long' },
          maxLength: { value: 250, message: 'Title must be 2-250 characters long' }
        }}
        error={errors.title}
      />
      <Input
        label="Short description"
        type="text"
        name="shortDescription"
        placeholder="Short description"
        register={register}
        rules={{
          required: 'Short description is required',
          minLength: { value: 3, message: 'Short description must be 3-250 characters long' },
          maxLength: { value: 250, message: 'Short description must be 3-250 characters long' }
        }}
        error={errors.shortDescription}
      />
      <div className={styles.formGroup}>
        <label htmlFor="Text" className={styles.label}>
          Text
          <textarea
            className={`${styles.formGroupTextarea} ${errors.text ? styles.textareaError : ''}`}
            id="text"
            {...register('text', {
              required: 'Text is required',
              minLength: { value: 3, message: 'Text must be 3-2000 characters long' },
              maxLength: { value: 2000, message: 'Text must be 3-2000 characters long' }
            })}
            placeholder="Text"
            required 
            value={article.text}
            onChange={handleInputChange}
          />
        </label>
        {errors.text && <span className={styles.errorMessage}>{errors.text.message}</span>}
      </div>
      <div className={`${styles.formGroup} ${styles.tags}`}>
        <label htmlFor="tags" className={styles.label}>Tags
          {article.tags.map((tag) => (
            <div className={styles.tag} key={tag.id}>
              <input
                className={`${styles.formGroupInput} ${styles.tagInput}`}
                id="tags"
                value={tag.value}
                onChange={(e) => handleTagChange(tag.id, e.target.value)}
                onBlur={() => handleTagBlur(tag.id, tag.value)}
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