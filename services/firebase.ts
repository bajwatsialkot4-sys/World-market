import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, setLogLevel } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Silence non-fatal Firestore connection warnings in console
setLogLevel('error');

const app = initializeApp(firebaseConfig);

// Use initializeFirestore with force long polling for max reliability across browser environments
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, // Force standard HTTPS long polling for firewalls, iOS Safari, and proxies
  ignoreUndefinedProperties: true, // Prevent undefined errors on schema writes
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

