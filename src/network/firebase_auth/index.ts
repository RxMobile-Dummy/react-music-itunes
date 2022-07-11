// import { initializeApp } from "firebase/app";
// import auth from "firebase/auth";
import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBp0Vnfsd4FDa0xWSFoJ1Js3WDAYaXFuJM",
  authDomain: "muzik-1819f.firebaseapp.com",
  projectId: "muzik-1819f",
  storageBucket: "muzik-1819f.appspot.com",
  messagingSenderId: "140194083922",
  appId: "1:140194083922:web:13112eed84825c5b639b8b",
  measurementId: "G-79VZY4MR5R",
};

// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

// // initializeApp(firebaseConfig);

// const auth = firebase.auth();

// export { auth };

const app = initializeApp(firebaseConfig);

export default app;
