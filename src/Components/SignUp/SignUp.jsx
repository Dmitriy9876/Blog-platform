import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/actions/registerUser';
import styles from './SignUp.module.css';

export default function SignUp() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const watchPassword = watch('password');
  const watchAgree = watch('agree');

  const onSubmit = data => {
    const { username, email, password } = data;
    dispatch(registerUser(username, email, password));
  };

  return (
    <div className={styles.registrationForm}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.header}>Create new account</div>

        <div className={styles.formItem}>
          <label htmlFor="username" className={styles.label}>
            Username
            <input
              type="text"
              id="username"
              {...register('username', {
                required: 'Username is required',
                minLength: { value: 3, message: 'Username must be 3-20 characters long' },
                maxLength: { value: 20, message: 'Username must be 3-20 characters long' }
              })}
              placeholder="Username"
              className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
            />
          </label>
          {errors.username && <span className={styles.errorMessage}>{errors.username.message}</span>}
        </div>

        <div className={styles.formItem}>
          <label htmlFor="email" className={styles.label}>
            Email address
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email format'
                }
              })}
              placeholder="Email address"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            />
          </label>
          {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
        </div>

        <div className={styles.formItem}>
          <label htmlFor="password" className={styles.label}>
            Password
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Your password needs to be at least 6 characters' }
              })}
              placeholder="Password"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            />
          </label>
          {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
        </div>

        <div className={styles.formItem}>
          <label htmlFor="repeatPassword" className={styles.label}>
            Repeat Password
            <input
              type="password"
              id="repeatPassword"
              {...register('repeatPassword', {
                validate: value => value === watchPassword || 'Passwords must match'
              })}
              placeholder="Repeat Password"
              className={`${styles.input} ${errors.repeatPassword ? styles.inputError : ''}`}
            />
          </label>
          {errors.repeatPassword && <span className={styles.errorMessage}>{errors.repeatPassword.message}</span>}
        </div>

        <div className={`${styles.formItem} ${styles.formCheck}`}>
          <div className={styles.wrapCheckbox}>
            <label htmlFor="agree" className={styles.checkboxLabel}>
              <input
                type="checkbox"
                id="agree"
                {...register('agree', {
                  required: 'You must agree to the processing of your personal information'
                })}
                className={`${styles.checkbox} ${errors.agree ? styles.inputError : ''}`}
              />
              <span className={styles.checkboxText}>I agree to the processing of my personal information</span>
              </label>
          </div>
          {errors.agree && <span className={`${styles.errorMessage} ${styles.noCheckboxText}`}>{errors.agree.message}</span>}
        </div>

        <button
          type="submit"
          className={`${styles.btn} ${!watchAgree ? styles.disabled : ''}`}
          disabled={!watchAgree}
        >
          Create
        </button>

        <div className={styles.signinRedirect}>
          Already have an account? <a href="/sign-in" className={styles.link}>Sign In</a>
        </div>
      </form>
    </div>
  );
}