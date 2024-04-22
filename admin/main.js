import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
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

async function getUserDataByName(name) {
    try {
        const reservations = await getDocs(collection(db, 'reservations'));

        reservations.forEach(doc => {
            if (doc.data().name === name) {
                const userInfo = document.getElementById('userData');
                userInfo.innerHTML += `
                <p>id: ${doc.id}</p>
                <p>pet id: ${doc.data().pet_id}</p>
                <p>reference number: ${doc.data().reference_number}</p>
                <p>name: ${doc.data().name}</p>
                <p>email: ${doc.data().email}</p>
                <p>phone: ${doc.data().phone}</p>
                <p>birthdate: ${doc.data().birthdate}</p>
                <p>gender: ${doc.data().gender}</p>`
            } else if (doc.data().name !== name){
                alert('No Match Found.')
            }
        });

    } catch (error) {
        console.error('Error getting user data:', error);
    }
}

const verify = document.getElementById('verify');
verify.addEventListener('click', () => {
    const username = document.getElementById('name').value;
    if (!username) {
        alert('Name is Required!');
        return;
    } else {
        getUserDataByName(username)
    }
});