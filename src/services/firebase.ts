import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCi8f9dOXY8V3PSb_K4pCRd4dyTZ1D_4UA',
  authDomain: 'seedr-96dd2.firebaseapp.com',
  databaseURL: 'https://seedr-96dd2.firebaseio.com',
  projectId: 'seedr-96dd2',
  storageBucket: 'seedr-96dd2.appspot.com',
  messagingSenderId: '360847296911',
  appId: '1:360847296911:web:ba6e26b6dd976ea33ce3fa',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export const fbAuth = firebase.auth()

export const dbUserRef = db.collection('user')
export const dbSeedBank = db.collection('seedbank')
export const dbPublicUserRef = db.collection('publicUser')
export const dbWishlist = db.collection('wishlist')
// export const dbPublicUser = db.collection('publicUser')
// export const firestore = firebase.firestore