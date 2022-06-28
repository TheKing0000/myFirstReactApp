// Import the functions you need from the SDKs you need
import {
  initializeApp
} from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9-agCLYk0DFK32MhkNBMCMrIyqfHrwv4",
  authDomain: "crwn-clothing-db-ec98a.firebaseapp.com",
  projectId: "crwn-clothing-db-ec98a",
  storageBucket: "crwn-clothing-db-ec98a.appspot.com",
  messagingSenderId: "478795571099",
  appId: "1:478795571099:web:1daa82c7df610cf856"
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//its a class
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});
//auth always be the same, only need one
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore();

export const createUserDocumentFromAuth =
  async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef)
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth
      const createdAt = new Date()
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        })
      } catch (error) {
        console.log(error)
      }
    }
    return userDocRef
  }


export const createAuthUserWithEmailAndPassword =
  async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
  }

export const signInAuthUserWithEmailAndPassword =
  async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
  }

export const signOutUser =
  async () => await signOut(auth)

//observable listener
export const onAuthStateChangedListener =
  (callback) => onAuthStateChanged(auth, callback)
  //(+auth) next error complete