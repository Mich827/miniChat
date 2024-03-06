import "@/styles/globals.css";
import "sanitize.css";
import { firebaseConfig } from "@/config/firebaseConfig";
import { FirebaseContext } from "@/context/FirebaseContext";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const providers = {
  google: new GoogleAuthProvider(),
  facebook: new FacebookAuthProvider(),
};

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(null);
  const [db, setDb] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    setDb(db);
    setAuth(auth);
  }, []);

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        setUser(authUser);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [auth]);

  useEffect(() => {
    if (db) {
      const q = query(collection(db, "messages"), orderBy("sentAt"));

      const unsubscribe = onSnapshot(q, (data) => {
        const messages = data.docs.map((doc) => {
          const data = doc.data();
          data.sentAt = data.sentAt.toDate();
          data.id = doc.id;
          return data;
        });
        setMessages(messages);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [db]);

  const signin = async (provider = "google") => {
    await signInWithPopup(auth, providers[provider.toLowerCase()]);
  };

  const signout = async () => {
    await signOut(auth);
  };

  const sendMessage = async (messageText) => {
    if (!messageText || !user || !db) return;
    const message = {
      text: messageText,
      sentAt: new Date(),
      user: {
        uid: user.uid,
        photoURL: user.photoURL,
        displayName: user.displayName,
      },
    };
    await addDoc(collection(db, "messages"), message);
  };

  return (
    <FirebaseContext.Provider
      value={{ signin, user, signout, sendMessage, messages }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}
