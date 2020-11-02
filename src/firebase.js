import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

 
const config = {
    apiKey: "AIzaSyCDNQm-KCCYjIa_U3vtQmoB46Uh4rdaH6k",
    authDomain: "bricksomething-2836d.firebaseapp.com",
    databaseURL: "https://bricksomething-2836d.firebaseio.com",
    projectId: "bricksomething-2836d",
    storageBucket: "bricksomething-2836d.appspot.com",
    messagingSenderId: "1066724300603",
    appId: "1:1066724300603:web:eb0e6148e604011f04491e",
    measurementId: "G-6DT0HQVNF0"
};
// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try{
    const result = await auth.signInWithPopup(provider);
    return result;
  }
  catch(error){
    console.warn(error);
    return null;
  }
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};