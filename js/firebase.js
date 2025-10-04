<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import { getFirestore } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDW_d--tsJlKVABAe37tEQZZeQgJCztMQs",
    authDomain: "financeiro-46b8e.firebaseapp.com",
    projectId: "financeiro-46b8e",
    storageBucket: "financeiro-46b8e.firebasestorage.app",
    messagingSenderId: "213056902447",
    appId: "1:213056902447:web:24531f291520aa0afbfdda"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
</script>
