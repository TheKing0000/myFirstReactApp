import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
//actual value to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
})


export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = {
    currentUser,
    setCurrentUser
  }

  useEffect(() => {
    //call the callback whenever auth state changes
    const unsubscribe =
      onAuthStateChangedListener((user) => {
        if (user) {
          createUserDocumentFromAuth(user)
        }
        //null or user
        setCurrentUser(user)
      })

    //!unsubscribe when component unmounts
    return unsubscribe
  }, [])
  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
}