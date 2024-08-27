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
  updateDoc,
  getDocs,
  arrayUnion,
  query,
  orderBy,
} from 'firebase/firestore';
import { sendMessage } from './websocketService';

export const ERROR_EMAIL = 'errorEmail';
export const ERROR = 'error';
export const NOT_FOUND = 'Not Found';

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

const userRef = collection(db, 'user');
const chatStoreRef = collection(db, 'chatStore');

const createUserRecord = async (data) => {
  const userProfile = {
    chatBoxId: {},
    metadata: data,
  };
  setDoc(doc(userRef, data.email), userProfile);
};

export const signUpHandler = (data) => {
  return createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(() => {
      console.log('Sign up!');
      createUserRecord(data);
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') return 'existedEmail';
      else return 'error';
    });
};
export const signOutHandler = () => {
  signOut(auth);
};

export const signInHandler = async (data) => {
  return signInWithEmailAndPassword(auth, data.email, data.password)
    .then(() => {
      return '';
    })
    .catch(() => {
      return 'error';
    });
};

export const selectUserDataFirebase = async () => {
  const user = await getDoc(doc(userRef, auth.currentUser.email)).then((data) =>
    data.data()
  );
  return user;
};

export const updateUserData = async (data, patronymChange) => {
  const email = auth.currentUser.email;
  data.email = email;
  if (patronymChange && !data.patronym) data.patronym = '';
  await updateDoc(doc(userRef, email), { metadata: data });
  console.log('Updated user');
};

export const searchPeople = async (email) => {
  // const searchResult = query(userRef, where('metadata.email', '==', email));
  // getDocs(searchResult).then((querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, ' => ', doc.data());
  //   });
  // });
  return getDoc(doc(userRef, email))
    .then((data) => {
      if (!data) return 'not found';
      const metadata = data.data().metadata;
      if (metadata.email === auth.currentUser.email) return 'Not Found';
      else return metadata;
    })
    .catch(() => {
      return 'Not Found';
    });
};
export const fetchChatBox = async (chatBoxId) => {
  try {
    const messagesRef = collection(chatStoreRef, chatBoxId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
    const snapshot = await getDocs(q);
    const allMessages = [];
    snapshot.forEach((doc) => {
      const messageData = doc.data();
      allMessages.push(messageData);
    });
    return allMessages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};
export const fetchChatListFireBase = async (chatBoxIdArray) => {
  const chatList = [];

  if (Array.isArray(chatBoxIdArray) && chatBoxIdArray.length > 0) {
    const promises = chatBoxIdArray.map(async (item) => {
      const email = Object.keys(item)[0];
      const docRef = doc(userRef, email);
      const data = await getDoc(docRef);
      const metadata = data.data().metadata;
      metadata.chatBoxId = item[email];
      chatList.push(metadata);
    });
    await Promise.all(promises);
  }
  return chatList;
};
export const createNewChatBox = async (target, packageMessage) => {
  const timestamp = new Date().getTime();
  const newChatBox = {
    lastMessage: packageMessage,
    participants: [target, packageMessage.sender],
    startedAt: timestamp,
  };
  const newChatId = timestamp.toString() + target + packageMessage.sender;
  await setDoc(doc(chatStoreRef, newChatId), newChatBox);
  await setDoc(
    doc(collection(doc(chatStoreRef, newChatId), 'messages')),
    packageMessage
  );
  await updateDoc(doc(userRef, target), {
    chatBoxId: arrayUnion({ [packageMessage.sender]: newChatId }),
  });
  await updateDoc(doc(userRef, packageMessage.sender), {
    chatBoxId: arrayUnion({ [target]: newChatId }),
  });
  sendMessage({ ...packageMessage, target: target });
};
export const handleMessage = async (packageMessage, chatBoxId, target) => {
  try {
    const id = packageMessage.timestamp.toString() + packageMessage.sender;
    const messagesRef = collection(chatStoreRef, chatBoxId, 'messages');
    await setDoc(doc(messagesRef, id), packageMessage);
    await updateDoc(doc(chatStoreRef, chatBoxId), {
      lastMessage: packageMessage,
    });
    sendMessage({ ...packageMessage, target: target });
    // return true;
  } catch (err) {
    console.log('Error while sending message:', err);
    // return false;
  }
};

export default app;
