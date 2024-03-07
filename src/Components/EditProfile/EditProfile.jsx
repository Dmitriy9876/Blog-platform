import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/actions/updateUser';
import Input from '../Input/Input';
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
        
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="Username"
          register={register}
          rules={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be 3-20 characters long"
            },
            maxLength: {
              value: 20,
              message: "Username must be 3-20 characters long"
            }
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
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email format"
            }
          }}
          error={errors.email}
        />
        
        <Input
          label="New password"
          type="password"
          name="password"
          placeholder="New password"
          register={register}
          rules={{
            minLength: {
              value: 6,
              message: "Your password needs to be at least 6 characters"
            }
          }}
          error={errors.password}
        />
        
        <Input
          label="Avatar image (URL)"
          type="text"
          name="avatar"
          placeholder="Avatar image URL"
          register={register}
          rules={{
            required: "Avatar URL is required",
            pattern: {
              value: urlPattern,
              message: "Invalid URL"
            }
          }}
          error={errors.avatar}
        />
        
        <button type="submit" className={styles.btn}>Save</button>
      </form>
    </div>
  );
}