import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD3ltnRNu-qs8XQoIR56PWrSkfNk6qj_tg',
  authDomain: 'intern-elecard-baas.firebaseapp.com',
  projectId: 'intern-elecard-baas',
  storageBucket: 'intern-elecard-baas.appspot.com',
  messagingSenderId: '795498742484',
  appId: '1:795498742484:web:9b4f26c8392a945a827141',
  measurementId: 'G-F1VWVX5GVM',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const db = getFirestore(app);

const userCollection = collection(db, 'user');

const createUserRecord = async (email, firstName, lastName, patronym) => {
  const userProfile = {};
  userProfile.firstName = firstName;
  userProfile.lastName = lastName;
  if (patronym && patronym !== '') userProfile.patronym = patronym;
  setDoc(doc(userCollection, email), userProfile);
};

export const signUpHandler = (data, setMessage) => {
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(() => {
      console.log('Sign up!');
      createUserRecord(
        data.email,
        data.firstName,
        data.lastName,
        data.patronym
      ).then(() => console.log('User is successfully created'));
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use')
        setMessage('Email is already used');
      else setMessage('Error: Unable to sign up');
    });
};
export const signOutHandler = () => {
  signOut(auth).then(() => {
    console.log('Sign out!');
  });
};

export const signInHandler = (data, setMessage) => {
  signInWithEmailAndPassword(auth, data.email, data.password)
    .then(() => {
      console.log('Sign In!');
    })
    .catch(() => {
      setMessage('email or password is incorrect');
    });
};

export const selectUserData = async () => {
  return await getDoc(doc(db, 'user', auth.currentUser.email)).then((data) =>
    data.data()
  );
};
export default app;
