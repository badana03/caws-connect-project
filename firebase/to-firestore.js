// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, doc, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
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

// Get the pet ID from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const petId = urlParams.get('petId');

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
    const refNo = document.getElementById('reference-num').value;
    const petInfo = petId;

    if (!name || !email || !phone || !day || !month || !year || !refNo) {
        alert('Please fill in all fields!');
        return;
    }

    const birthdate = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();

    if (today.getMonth() < birthdate.getMonth() || (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())) {
        age--;
    }

    if (age < 18) {
        alert('You must be at least 18 years old to make a reservation.');
        return;
    }

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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }

    // Phone validation
    const phoneRegex = /^(09|\+639)\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number!');
        return;
    }

    try {
        // Reservation
        await addDoc(collection(db, 'reservations'), {
            name: name,
            email: email,
            phone: phone,
            birthdate: birthdate.toLocaleDateString(),
            gender: gender,
            terms: 'Agreed',
            reference_number: refNo,
            pet_id: petInfo
        });
        // Update the pet listing
        const petRef = doc(db, 'pet_listings', petId);
        await updateDoc(petRef, {
            status: 'reserved',
            button_state: 'disabled'
        });

        document.getElementById('user-info').reset();
        alert('Reservation Successful!');

    } catch (error) {
        console.error('Error Adding Document: ', error);
        document.getElementById('user-info').reset();
        alert('An error occurred. Please try again later.');
    }
}

const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', addReservation);
