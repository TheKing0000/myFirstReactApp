import "./form-input.styles.scss"

//! if label exists than render it
const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {
        label && (
          <label
            className={
              `${otherProps.value.length > 0 ? "shrink" : ""} form-input-label`
            }>
            {label}
          </label>
        )
      }

    </div>
  )
}
export default FormInput;