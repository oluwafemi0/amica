import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDdpOglCvmey9wVBivnjSB6frr96gjRTqQ",
    authDomain: "amica-577d1.firebaseapp.com",
    projectId: "amica-577d1",
    storageBucket: "amica-577d1.appspot.com",
    messagingSenderId: "172024979808",
    appId: "1:172024979808:web:30b91dced4de52e754be05",
    measurementId: "G-ZRGV4YDWG5"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };