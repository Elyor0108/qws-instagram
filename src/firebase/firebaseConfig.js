import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth"
import "firebase/compat/storage";

const config = {
  apiKey: "AIzaSyDoTnWRYVC5-9Xvegs5hdGZYrqw8omu8EQ",
  authDomain: "instagram-app-elyor.firebaseapp.com",
  projectId: "instagram-app-elyor",
  storageBucket: "instagram-app-elyor.appspot.com",
  messagingSenderId: "584979806348",
  appId: "1:584979806348:web:bd80ccdc416c8beff463a9"
}

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

export const storage = firebase.storage();
export { firebase, FieldValue };
