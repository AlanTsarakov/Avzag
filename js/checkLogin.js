import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { app } from "./firebaseConfig.js";


const auth = getAuth(app);
console.log(1);
onAuthStateChanged(auth, (user) => {
    console.log(2);
        
    if (user) {
        console.log("✅ Пользователь АВТОРИЗОВАН");
        console.log("📧 Email:", user.email);
        console.log("🆔 UID:", user.uid);
        console.log("🔐 Email verified:", user.emailVerified);
        console.log("👤 Anonymous:", user.isAnonymous);
        console.log("👤 Provider:", user.providerData?.[0]?.providerId);
        
        // Показываем контент
        document.body.style.display = 'block';
    } else {
        console.log("❌ Пользователь НЕ авторизован");
        console.log("➡️ Redirecting to login...");
        window.location.href = "loginpage.html";
    }
});