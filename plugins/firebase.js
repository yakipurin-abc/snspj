import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyDyjVrGApzkBmCRyhJvJm1vDCvqTcVa0js",
    authDomain: "fir-pj-eadc3.firebaseapp.com",
    projectId: "fir-pj-eadc3",
    storageBucket: "fir-pj-eadc3.appspot.com",
    messagingSenderId: "84353203475",
    appId: "1:84353203475:web:da5f225a413524e30faee6",
    measurementId: "G-E7V1HM83DR"
    }
  )
}
  
export default firebase