import "./button.styles.scss"

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted"
}
//!children ami a ketto tag kozott volt
const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`${BUTTON_TYPE_CLASSES[buttonType]} button-container`} {...otherProps}>
      {children}
    </button>
  )
}
export default Button;