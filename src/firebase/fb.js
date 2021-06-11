// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCgrZF6saijPFFqE7r1Uv2DUXeyFiQq2qA",
    authDomain: "consultant-53d81.firebaseapp.com",
    projectId: "consultant-53d81",
    storageBucket: "consultant-53d81.appspot.com",
    messagingSenderId: "283644275407",
    appId: "1:283644275407:web:7b6d45931fd7f1b864e5ba"
  };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

// Write to file in FB
function addToUserCollection(dataDate, dataTime,dataFullDate) {
    db.collection(`id`)
      .doc(`id`)
      .set({
        date: dataDate,
        time: dataTime,
        full: dataFullDate
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
    }
// Read data from FB for Informatio
    async function getUserCollection(collection,addTime,addDate,consultationDate,consultationTime) {
        await db
          .collection('id')
          .get()
          .then(querySnapshot => querySnapshot.docs
            .forEach(doc =>  {
                let data = doc.data();
                if(consultationDate===""|consultationTime===""){
                addTime(data.time);
                addDate(data.date)}
            }))
        }
        // Read data from FB for TimePicker
    async function getUserTime(collection, f) {
        await db
          .collection('id')
          .get()
          .then(querySnapshot => querySnapshot.docs
            .forEach(doc =>  {
                let data = doc.data();
                if(data.time)
                f(data.time);
            }))
        }
                // Read data from FB for DatePicker
    async function getUserDate(collection, f) {
        await db
          .collection('id')
          .get()
          .then(querySnapshot => querySnapshot.docs
            .forEach(doc =>  {
                let data = doc.data();
                f(data.full);
                return data.full
            }))
        }

  export default{
    firebaseConfig,
    addToUserCollection,
    getUserCollection,
    getUserTime,
    getUserDate
  }
