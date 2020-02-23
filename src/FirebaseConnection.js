import firebase from 'firebase';

let firebaseConfig = {
    apiKey: "AIzaSyDWlgJXyQ8GD_BkqAkTN5VmKxLMOj8CBAE",
    authDomain: "meu-projeto-c5d2a.firebaseapp.com",
    databaseURL: "https://meu-projeto-c5d2a.firebaseio.com",
    projectId: "meu-projeto-c5d2a",
    storageBucket: "meu-projeto-c5d2a.appspot.com",
    messagingSenderId: "273015814618",
    appId: "1:273015814618:web:26b0575dd39b836a8228e3",
    measurementId: "G-WW7HMRCD48"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;