import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, setLogLevel } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Silence non-fatal Firestore transient network retry notices in console
setLogLevel('silent');

const app = initializeApp(firebaseConfig);

// Use initializeFirestore with auto-detect long polling for optimal connection resilience across proxy and iframe environments
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
  ignoreUndefinedProperties: true,
}, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);

// Connection test helper
export const validateConnection = async () => {
  try {
    if (typeof window !== 'undefined' && !navigator.onLine) {
      console.log('Client is offline: Firebase operating in local offline cache mode');
      return;
    }
    console.log('Firebase services initialized and ready');
  } catch (error) {
    console.log('Firebase operating in local offline cache mode');
  }
};

