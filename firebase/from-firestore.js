// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getStorage, getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";
import { getFirestore, getDocs, collection, } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
export let petInfo = { key: ''};

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvUPJWPUahIggGRVia0xh8kxMuhL_pYfk",
    authDomain: "caws-db.firebaseapp.com",
    databaseURL: "https://caws-db-default-rtdb.firebaseio.com",
    projectId: "caws-db",
    storageBucket: "caws-db.appspot.com",
    messagingSenderId: "460353519694",
    appId: "1:460353519694:web:46c0fc73cabf34983c031f" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Display from Firestore
const container = document.getElementById('listings');

// Fetch data from Firestore and generate HTML dynamically
const listOfPets = await getDocs(collection(db, 'pet_listings'));
listOfPets.forEach(async doc => {
    try {
        const imageRef = ref(storage, doc.data().pet_img);
        const url = await getDownloadURL(imageRef);
        container.innerHTML += `
        <div class="card">
            <img src="${url}" alt="pet image">
            <div class="pet">
                <h4>${doc.data().pet_name} | <b id="category">${doc.data().category}</b> <i value="${doc.data().status}" class="fa-solid fa-circle-check"></i></h4> 
                <p class="desc">${doc.data().desc}</p>
            </div>
            <button class="reserve-btn" onclick="window.location.href = 'form.html?petId=' + '${doc.id}'" ${doc.data().button_state}>Reserve</button>
        </div>`;
    } catch (error) {
        console.log('Error Fetching Data!');
    }
});
