import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils.js"
import { useState } from "react";
import FormInput from "../form-input/form-input.component.jsx";
import Button from "../button/button.component"
import "./sign-in-form.styles.scss"
const defaultFormField = {
  email: "",
  password: ""
}


const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormField)
  const { email, password } = formFields

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user)

  }

  const resetFormFields = () => {
    setFormFields(defaultFormField)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    //modify only van value!!
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resposne =
        await signInAuthUserWithEmailAndPassword(email, password)
      resetFormFields();
      console.log(resposne)
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email!")
          break;
        case "auth/user-not-found":
          alert("No user associated with this email")
          break;

        default:
          console.log(error)
          break;
      }
    }
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          onChange={handleChange}
          type="email"
          required
          value={email} />

        <FormInput
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          required
          value={password} />

        <div className="buttons-container">
          <Button
            type="submit">
            Sign In
          </Button>
          <Button
            type="button"
            buttonType="google"
            onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  )
}
export default SignInForm;