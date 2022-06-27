import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils.js"
import { useState } from "react";
import FormInput from "../form-input/form-input.component.jsx";

const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
}


const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormField)
  const { displayName, email, password, confirmPassword } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormField)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    //modify only van value!!
    setFormFields({ ...formFields, [name]: value })
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
      alert("Passwords do not match")
    }
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
export default SignUpForm;