import firebase from "firebase";
require("@firebase/firestore");
require('firebase/auth')

const firebaseConfig = {
  apiKey: "AIzaSyCMNGQg4Hk3fRA9vycDidcfzQhZrwy3yTs",
  authDomain: "cyber01-8ecad.firebaseapp.com",
  projectId: "cyber01-8ecad",
  storageBucket: "cyber01-8ecad.appspot.com",
  messagingSenderId: "80510245028",
  appId: "1:80510245028:web:cae568e904fece6b952e31",
  measurementId: "G-MSGFD88D48"
};
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();


if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}else {
   firebase.app(); // if already initialized, use that one
}
export default firebase.firestore();