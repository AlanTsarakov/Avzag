import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4Vg2BysdNrBPQbTOErsGpAvl3QzIHmus",
  authDomain: "ossetian-language-learning-app.firebaseapp.com",
  projectId: "ossetian-language-learning-app",
  storageBucket: "ossetian-language-learning-app.firebasestorage.app",
  messagingSenderId: "286204462514",
  appId: "1:286204462514:web:985c2e34e691d56aef90ab",
  measurementId: "G-DDHHYB84ZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const leaderboardContainer = document.getElementById('leaderboard-container');
// const leaderboardRef = db.collection('UsersAuthList');
const querySnapshot = await getDocs(collection(db, "UsersAuthList"));
let arrayForProfiles=[];
querySnapshot.forEach((doc) => {
    const data = doc.data();
    // console.log(data);
    // console.log(data.name);
    arrayForProfiles.push(data);
});
export default arrayForProfiles;
