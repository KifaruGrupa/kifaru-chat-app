import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config = {
  apiKey: "AIzaSyBio_dVqNWfixh4tvH_Xarn0V6AwpOvkkY",
  authDomain: "chatapp-845ee.firebaseapp.com",
  databaseURL: "https://chatapp-845ee.firebaseio.com",
  projectId: "chatapp-845ee",
  storageBucket: "chatapp-845ee.appspot.com",
  messagingSenderId: "545100065563",
  appId: "1:545100065563:web:eba36e8368111d6118c1be",
  measurementId: "G-3WQC2LFEEW"
};

firebase.initializeApp(config)

export default firebase;