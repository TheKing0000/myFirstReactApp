import { useState } from "react";

const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
}


const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormField)
  const { displayName, email, password, confirmPassword } = formFields


  const handleChange = (event) => {
    const { name, value } = event.target
    //modify only van value!!
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={() => { }}>
        <label>Display Name</label>
        <input name="displayName" onChange={handleChange} type="text" required value={displayName} />

        <label>Email</label>
        <input name="email" onChange={handleChange} type="email" required value={email} />

        <label>Password</label>
        <input name="password" onChange={handleChange} type="password" required value={password} />

        <label>Confirm Password</label>
        <input name="confirmPassword" onChange={handleChange} type="password" required value={confirmPassword} />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
export default SignUpForm;