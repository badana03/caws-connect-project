// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
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
async function reserve() {
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

    // Check if name, email, phone, and birthdate are not empty
    if (!name || !email || !phone || !day || !month || !year) {
        alert('Please fill in all fields!');
        return;
    }

    const birthdate = day + '/' + month + '/' + year;

    // Check if a gender option is selected
    let gender = '';
    if (maleRadio.checked) {
        gender = 'male';
    } else if (femaleRadio.checked) {
        gender = 'female';
    } else {
        alert('Error Selecting The Gender!');
        return;
    }

    // Check if the terms checkbox is checked
    if (!termsCheckbox.checked) {
        alert('Please Agree To The Terms!');
        return;
    }

    // If all conditions are met, proceed with reservation
    try {
        const docRef = await addDoc(collection(db, 'reservations'));
        docRef.set({
            name: name,
            email: email,
            phone: phone,
            birthdate: birthdate,
            gender: gender,
            terms: 'Agreed',
            status: 'active', // Adding status field to indicate active reservation
            petId: petId
        });
        // Reset form after successful reservation
        alert('Reservation Added Successfully!');
        document.getElementById('user-info').reset();
    } catch (error) {
        console.error('Error adding reservation:', error);
        alert('Error Adding Reservation!');
    }
}