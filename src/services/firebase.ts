import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import Vue from 'vue';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'seedr-96dd2.firebaseapp.com',
  databaseURL: 'https://seedr-96dd2.firebaseio.com',
  projectId: 'seedr-96dd2',
  storageBucket: 'seedr-96dd2.appspot.com',
  messagingSenderId: '360847296911',
  appId: '1:360847296911:web:ba6e26b6dd976ea33ce3fa',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
console.log(process.env.VUE_APP_API_KEY)
const db = firebase.firestore()

export const fbAuth = firebase.auth()

export const dbUserRef = db.collection('user')
export const dbSeedBank = db.collection('seedbank')
export const dbPublicUserRef = db.collection('publicUser')
export const dbWishlist = db.collection('wishlist')
// export const dbPublicUser = db.collection('publicUser')
// export const firestore = firebase.firestore