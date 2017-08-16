export function loadFirebase() {
  return import('firebase/app')
    .then(firebase => 
      firebase.initializeApp({
        apiKey: "AIzaSyB0tnkhtMju0RmTBI60DAvCrTzv-zC5bjw",
        authDomain: "webdev-codes.firebaseapp.com",
        databaseURL: "https://webdev-codes.firebaseio.com",
        projectId: "webdev-codes",
        storageBucket: "webdev-codes.appspot.com",
        messagingSenderId: "763710660966"
      }));
}