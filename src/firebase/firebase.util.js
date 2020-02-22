import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD7Vj2WmuG4DSxPsDVtFJtsFm9klVKf2V0",
  authDomain: "crwn-db-6f72b.firebaseapp.com",
  databaseURL: "https://crwn-db-6f72b.firebaseio.com",
  projectId: "crwn-db-6f72b",
  storageBucket: "crwn-db-6f72b.appspot.com",
  messagingSenderId: "104472821911",
  appId: "1:104472821911:web:9e5c83fbdfbc80864e29d2",
  measurementId: "G-S1LEXJJSET"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additinalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      userRef.set({
        displayName,
        email,
        createdAt,
        ...additinalData
      });
    } catch (error) {
      console.log("Error creating user " + error.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc(obj.title);
    console.log(newDocRef);
    batch.set(newDocRef, obj);
  });
 return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
  const transformedCollection = collectionsSnapshot.docs.map(doc => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title, 
      items
    }
  })

   return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  } , {})
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account " });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
