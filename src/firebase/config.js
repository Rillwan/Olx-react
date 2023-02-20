
import firebase from 'firebase/app';
import "firebase/firestore";
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDGOaIbQz610Kws4Ge75R5EXbvG1f87oSw",
  authDomain: "fir-e3665.firebaseapp.com",
  projectId: "fir-e3665",
  storageBucket: "fir-e3665.appspot.com",
  messagingSenderId: "947943103191",
  appId: "1:947943103191:web:e08af4fbe5a2e63115ae92",
  measurementId: "G-DF67FKSTH3"
};

export default firebase.initializeApp(firebaseConfig);

