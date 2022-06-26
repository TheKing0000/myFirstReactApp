import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils.js"

const SignIn = () => {

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user)
    console.log(userDocRef)
  }

  return (
    <div>
      Sign in page
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  )
}
export default SignIn;