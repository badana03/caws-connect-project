// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { petInfo } from "./from-firestore.js";
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
const ID = petInfo;

// Add user reservation to Firestore
async function addReservation() {
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email-address').value;
    const phone = document.getElementById('phone-number').value;
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const maleRadio = document.getElementById('gender-male');
    const femaleRadio = document.getElementById('gender-female');
    const termsCheckbox = document.getElementById('terms');
    const petId = ID;

    if (!name || !email || !phone || !day || !month || !year) {
        alert('Please fill in all fields!');
        return;
    }

    const birthdate = day + '/' + month + '/' + year;

    let gender = '';
    if (maleRadio.checked) {
        gender = 'male';
    } else if (femaleRadio.checked) {
        gender = 'female';
    } else {
        alert('Error Selecting The Gender!');
        return;
    }

    if (!termsCheckbox.checked) {
        alert('Please Agree To The Terms!');
        return;
    }

    try {
        // Reservation
        await addDoc(collection(db, 'reservations'), {
            name: name,
            email: email,
            phone: phone,
            birthdate: birthdate,
            gender: gender,
            terms: 'Agreed',
            pet_id: petId
        });

        await updateDoc(collection(db, 'pet_listings', petId), {
            status: 'Reserved'
        });

        alert('Reservation Successful!');
    } catch (error) {
        console.error('Error adding document: ', error);
        alert('An error occurred. Please try again later.');
    }
}

const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', addReservation);
