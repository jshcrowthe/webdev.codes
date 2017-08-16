import { buildWidget } from "./widget";
import * as firebase from "firebase/app";

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

export function getRefData(ref) {
  return import("firebase/database")
    .then(() => {
      if (!ref) throw new Error("`ref` is not defined");
      return firebase.database().ref(ref).once("value");
    })
    .then(snapshot => snapshot.val());
}
