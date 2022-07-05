import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils.js"
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context.jsx";
import FormInput from "../form-input/form-input.component.jsx";
import Button from "../../components/button/button.component"
import "./sign-up-form.styles.scss"
const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
}


const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormField)
  const { displayName, email, password, confirmPassword } = formFields

  //!CONTEXT
  const { setCurrentUser } = useContext(UserContext)


  const resetFormFields = () => {
    setFormFields(defaultFormField)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    //modify only one value!!
    setFormFields(
      {
        ...formFields, [name]: value
      }
    )
  }

  const handleSubmit = async (event) => {
    //turn off basic functionalities
    event.preventDefault()
    if (password === confirmPassword && password.length > 6) {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(email, password)
        //displayName was null, so we had to giv it a value...
        await createUserDocumentFromAuth(user, { displayName })

        //clear values
        resetFormFields()
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert("already in use")
        } else {
          alert("hiba")
        }
      }
    } else {
      alert("Passwords do not match or less than 6 characters!")
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          name="displayName"
          onChange={handleChange}
          type="text"
          required
          value={displayName} />

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

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          type="password"
          required
          value={confirmPassword} />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}
export default SignUpForm;