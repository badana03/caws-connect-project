// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, deleteDoc, collection, updateDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
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
console.log(petInfo);

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
        const docRef = await addDoc(collection(db, 'reservations'), {
            name: name,
            email: email,
            phone: phone,
            birthdate: birthdate,
            gender: gender,
            terms: 'Agreed',
            status: 'active', // Adding status field to indicate active reservation
            petId: petData // Storing the ID of the pet listing
        });
        
        alert('Reservation Successful!');

        // Set timer for 24 hours
        setTimeout(async () => {
            // Delete reservation after 24 hours
            await deleteDoc(docRef);

            // Update user's information with "status: cancelled"
            await updateDoc(docRef, {
                status: 'cancelled'
            });

            alert('Reservation Cancelled (24 hours passed)');
        }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

        // Reset form after successful reservation
        document.getElementById('user-info').reset();
    } catch (error) {
        console.error('Error adding reservation:', error);
        alert('Error Adding Reservation!');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitForm');

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();
        reserve();
    });
});