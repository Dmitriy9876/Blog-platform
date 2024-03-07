import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Input from '../Input/Input';
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

        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="Username"
          register={register}
          rules={{
            required: 'Username is required',
            minLength: { value: 3, message: 'Username must be 3-20 characters long' },
            maxLength: { value: 20, message: 'Username must be 3-20 characters long' }
          }}
          error={errors.username}
        />

        <Input
          label="Email address"
          type="email"
          name="email"
          placeholder="Email address"
          register={register}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Invalid email format'
            }
          }}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          register={register}
          rules={{
            required: 'Password is required',
            minLength: { value: 6, message: 'Your password needs to be at least 6 characters' }
          }}
          error={errors.password}
        />

        <Input
          label="Repeat Password"
          type="password"
          name="repeatPassword"
          placeholder="Repeat Password"
          register={register}
          rules={{
            validate: value => value === watchPassword || 'Passwords must match'
          }}
          error={errors.repeatPassword}
        />

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