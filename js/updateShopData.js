import { getFirestore, doc,getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
import { app } from "./firebaseConfig.js";

const db = getFirestore(app);








let userData = JSON.parse(sessionStorage.getItem("user-info"))
const myButton = document.getElementById('heartButton');

function checkSpanValue() {
  userData = JSON.parse(sessionStorage.getItem("user-info"));
  hearts=userData.hearts
  console.log(userData.hearts);
  if (hearts >= 4) {
    myButton.disabled = true;
    myButton.querySelector("span").textContent = "Full";
    myButton.style.cursor="auto";
  } else {
    myButton.disabled = false;
    myButton.style.color = 'rgb(var(--color-blue-space))';
    myButton.querySelector("span").textContent = "Купить";
    myButton.style.cursor="pointer";
  }
}

function calcDiamond(){
  checkSpanValue();
  console.log("userdata is ",userData);
  userData.gems -= 10;
  userData.hearts += 1;
  sessionStorage.setItem("user-info",JSON.stringify(userData));
  placeuserStatistics();
}

async function upDate(){
const dbref = doc(db, 'UsersAuthList',userData.userId);
console.log("firing firebase");
let newGem = userData.gems - 10;
let newHeart = userData.hearts + 1;
userData.gems = newGem ;
userData.hearts = newHeart;
await updateDoc(dbref,userData);
calcDiamond();
}
myButton.addEventListener('click', upDate);



