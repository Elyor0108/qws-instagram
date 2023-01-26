import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import FirebaseContext from "./firebase/firebase.js";
import "react-loading-skeleton/dist/skeleton.css";
import { firebase, FieldValue } from "./firebase/firebaseConfig";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>
);
