import { buildWidget } from './widget';
import * as firebase from 'firebase/app';

export function loadFirebase() {
  firebase.initializeApp({
    apiKey: "AIzaSyB0tnkhtMju0RmTBI60DAvCrTzv-zC5bjw",
    authDomain: "webdev-codes.firebaseapp.com",
    databaseURL: "https://webdev-codes.firebaseio.com",
    projectId: "webdev-codes",
    storageBucket: "webdev-codes.appspot.com",
    messagingSenderId: "763710660966"
  });
}

export function getTC39Data() {
  return import('firebase/database')
    .then(() => {
      return firebase.database().ref('content/tc39/proposals').once('value')
    })
    .then(snapshot => snapshot.val());
}