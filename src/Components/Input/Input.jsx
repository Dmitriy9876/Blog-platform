import PropTypes from 'prop-types';
import styles from './Input.module.css';

export default function Input ({ label, type = 'text', register, name, rules, placeholder, error, inputStyle, labelStyle, defaultValue }) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={`${styles.label} ${labelStyle}`}>
        {label}
        <input
          type={type}
          className={`${styles.input} ${inputStyle} ${error ? styles.inputError : ''}`}
          id={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(name, rules)}
        />
      </label>
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.shape({ 
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    pattern: PropTypes.shape({
      value: PropTypes.instanceOf(RegExp),
      message: PropTypes.string
    })
  }),
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  error: PropTypes.shape({
    message: PropTypes.string
  }),
  inputStyle: PropTypes.string,
  labelStyle: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  rules: {},
  placeholder: '',
  defaultValue: null,
  error: null,
  inputStyle: '',
  labelStyle: ''
};
