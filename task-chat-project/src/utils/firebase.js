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
  deleteDoc,
  limit,
  where,
  writeBatch,
} from 'firebase/firestore';
import { sendMessage } from './websocketService';

export const ERROR_EMAIL = 'errorEmail';
export const ERROR = 'error';
export const NOT_FOUND = 'Not Found';

export const NEW_MES = 'new_message';
export const NEW_REQ = 'new_chat_request';
export const DEL_MES = 'deleted_message';
export const UPD_MES = 'edited_message';
export const READ_MES = 'read_message';
export const READ_ALL = 'read_all';

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
      const { password, passwordConfirm, ...rest } = data;
      createUserRecord(rest);
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') return 'existedEmail';
      else return ERROR;
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
      return ERROR;
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
};

export const searchPeople = async (queryString) => {
  // const searchByEmail = async (email) => {
  //   return getDoc(doc(userRef, email.toString()))
  //     .then((data) => {
  //       if (!data) return false;
  //       const metadata = data.data().metadata;
  //       if (metadata.email === auth.currentUser.email) return NOT_FOUND;
  //       else return metadata;
  //     })
  //     .catch(() => {
  //       return false;
  //     });
  // };
  const searchByEmail = async (email) => {
    const q = query(userRef);

    try {
      const querySnapshot = await getDocs(q);
      const matchingUsers = [];

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (
          userData.metadata.email &&
          userData.metadata.email.toLowerCase().includes(email.toLowerCase())
        ) {
          // Exclude the current user
          if (userData.metadata.email !== auth.currentUser.email) {
            matchingUsers.push(userData.metadata);
          }
        }
      });

      if (matchingUsers.length === 0) {
        return NOT_FOUND;
      }
      return matchingUsers;
    } catch (error) {
      console.error('Error searching for users by email:', error);
      return false;
    }
  };

  try {
    const resultByEmail = await searchByEmail(queryString);
    return resultByEmail;
    // return getDoc(doc(userRef, email.toString()))
    //   .then((data) => {
    //     if (!data) return NOT_FOUND;
    //     const metadata = data.data().metadata;
    //     if (metadata.email === auth.currentUser.email) return NOT_FOUND;
    //     else return metadata;
    //   })
    //   .catch(() => {
    //     return NOT_FOUND;
    //   });
  } catch (err) {
    console.log('Error when searching for people:', err);
  }
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
export const getLastMessage = async (chatBoxId) => {
  const messageLastDoc = await getDocs(
    query(
      collection(doc(chatStoreRef, chatBoxId), 'messages'),
      orderBy('timestamp', 'desc'),
      limit(1)
    )
  );
  const lastMessage = messageLastDoc?.docs[0]?.data();
  return lastMessage ? lastMessage : {};
};
export const createNewChatBox = async (target, packageMessage) => {
  const timestamp = new Date().getTime();
  const newChatBox = {
    participants: [target, packageMessage.sender],
    startedAt: timestamp,
  };
  const newChatId = timestamp.toString() + target + packageMessage.sender;
  await setDoc(doc(chatStoreRef, newChatId), newChatBox);
  await setDoc(
    doc(
      collection(doc(chatStoreRef, newChatId), 'messages'),
      packageMessage.timestamp.toString() + packageMessage.sender
    ),
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

export const findMessagesFireBase = async (keyWord, chatBoxId) => {
  const messageQuery = query(
    collection(doc(chatStoreRef, chatBoxId), 'messages')
  );
  const searchString = keyWord.toLowerCase();
  const querySnapshot = await getDocs(messageQuery);
  let result = [];
  querySnapshot.forEach((doc) => {
    if (doc.data().content.toLowerCase().includes(searchString)) {
      result.push(doc.data());
    }
  });
  result.sort((a, b) => a.timestamp > b.timestamp);
  return result;
};

export const handleMessage = async (packageMessage, chatBoxId, target) => {
  try {
    packageMessage.status = 'sent';
    sendMessage({ ...packageMessage, target: target });
    const id = packageMessage.timestamp.toString() + packageMessage.sender;
    const messagesRef = collection(doc(chatStoreRef, chatBoxId), 'messages');
    await setDoc(doc(messagesRef, id), packageMessage);
  } catch (err) {
    console.log('Error while sending message:', err);
  }
};
export const handleDeleteMessage = async (chatBoxId, messageId, target) => {
  try {
    const mesRef = doc(
      collection(doc(chatStoreRef, chatBoxId), 'messages'),
      messageId
    );
    await deleteDoc(mesRef);
    sendMessage({
      type: DEL_MES,
      sender: auth.currentUser.email,
      target: target,
      messageId: messageId,
    });
  } catch (error) {
    console.error('Error removing document: ', error);
  }
};
export const handleUpdateMessage = async (
  chatBoxId,
  messageId,
  message,
  target
) => {
  try {
    const chatRef = doc(chatStoreRef, chatBoxId);
    const mesRef = doc(collection(chatRef, 'messages'), messageId);
    await updateDoc(mesRef, {
      content: message.content,
      type: message.type,
    });
    sendMessage({
      type: UPD_MES,
      sender: auth.currentUser.email,
      target: target,
      messageId: messageId,
      timestamp: message.timestamp,
      content: message.content,
    });
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const updateReadMessage = async (chatBoxId, target, messageId) => {
  try {
    const messageRef = doc(
      collection(doc(chatStoreRef, chatBoxId), 'messages'),
      messageId
    );
    sendMessage({
      type: READ_MES,
      messageId: messageId,
      target: target,
      sender: auth.currentUser.email,
    });
    const messageDoc = await getDoc(messageRef);

    if (messageDoc.exists()) {
      await updateDoc(messageRef, { status: 'read' });
      console.log('Document updated successfully');
    } else {
      console.log('Document does not exist yet. Waiting before updating...');
      setTimeout(() => {
        updateDoc(messageRef, { status: 'read' });
        console.log('Document updated successfully');
      }, 2000);
    }
  } catch (error) {
    console.error('Error updating read message:', error);
  }
};
export const markAllMessagesAsRead = async (chatBoxId, target) => {
  const messagesRef = collection(doc(chatStoreRef, chatBoxId), 'messages');
  const unreadQuery = query(
    messagesRef,
    where('status', '==', 'sent'),
    where('sender', '==', target)
  );
  const querySnapshot = await getDocs(unreadQuery);
  if (querySnapshot.empty) {
    return;
  }
  try {
    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, { status: 'read' });
    });

    await batch.commit();
    sendMessage({
      type: READ_ALL,
      sender: auth.currentUser.email,
      target: target,
    });
  } catch (err) {
    console.log('Error update messages status', err);
  }
};

export default app;
