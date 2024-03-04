import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../../store/actions/loginUser';
import styles from './SignIn.module.css';

export default function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const isAuthenticated = useSelector(state => !!state.user.user);
  const authError = useSelector(state => state.user.error);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated]);

  const onSubmit = (data) => {
    dispatch(loginUser(data.email, data.password));
  };

  return (
    <div className={styles.signinForm}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.header}>Sign In</div>
        
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email address
            <input
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              id="email"
              placeholder="Email address"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email format"
                }
              })}
            />
          </label>
          {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
            <input
              type="password"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                },
                maxLength: {
                  value: 40,
                  message: "Password cannot exceed 40 characters"
                }
              })}
            />
          </label>
          {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
        </div>

        {authError && <div className={styles.errorMessage}>Wrong password or email</div>}

        <button type="submit" className={styles.btn}>Login</button>

        <div className={styles.signUpText}>
        Don&apos;t have an account? <a href="/sign-up" className={styles.signUpLink}>Sign Up</a>
        </div>
      </form>
    </div>
  );
}