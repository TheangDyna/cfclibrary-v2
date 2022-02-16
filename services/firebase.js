import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBBVdhKgkrh4Hh001gVccMRwpmfbfJ9qZI",
  authDomain: "cfc-library-93277.firebaseapp.com",
  projectId: "cfc-library-93277",
  storageBucket: "cfc-library-93277.appspot.com",
  messagingSenderId: "382262308224",
  appId: "1:382262308224:web:c3f895a3aeea6c7983e565",
  measurementId: "G-L7KP1Q6HGL"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)

}
const firestore = firebase.firestore();
const fireStorage = firebase.storage();
const fireAuth= firebase.auth();

export {
  firestore,
  fireStorage,
  fireAuth
}