import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/actions/updateUser';
import styles from './EditProfile.module.css';

export default function EditProfile() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.user.token);

  const urlPattern = new RegExp(
    '^' +
    '(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|' +
    'www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|' +
    'https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|' +
    'www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})$'
  );

  const onSubmit = data => {
    dispatch(updateUser(data.username, data.email, data.password, data.avatar, token));
  };

  return (
    <div className={styles.profileEdit}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.header}>Edit Profile</div>
        
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Username
            <input
              type="text"
              className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
              id="username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be 3-20 characters long"
                },
                maxLength: {
                  value: 20,
                  message: "Username must be 3-20 characters long"
                }
              })}
              placeholder="Username"
            />
        </label>
          {errors.username && <span className={styles.errorMessage}>{errors.username.message}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email address
            <input
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email format"
                }
              })}
              placeholder="Email address"
            />
          </label>
          
          {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            New password
            <input
              type="password"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              id="password"
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "Your password needs to be at least 6 characters"
                }
              })}
              placeholder="New password"
            />
          </label>
          {errors.password && !errors.password.required && <span className={styles.errorMessage}>{errors.password.message}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="avatar" className={styles.label}>Avatar image (URL)
            <input
              type="text"
              className={`${styles.input} ${errors.avatar ? styles.inputError : ''}`}
              id="avatar"
              {...register("avatar", {
                required: "Avatar URL is required",
                pattern: {
                  value: urlPattern,
                  message: "Invalid URL"
                }
              })}
              placeholder="Avatar image URL"
            />
          </label>
          
          {errors.avatar && <span className={styles.errorMessage}>{errors.avatar.message}</span>}
        </div>
        
        <button type="submit" className={styles.btn}>Save</button>
      </form>
    </div>
  );
}