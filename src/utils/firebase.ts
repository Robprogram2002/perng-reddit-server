import firebaseAdmin from 'firebase-admin';

const serviceAccount = require('../config/auth0testproject-d2e65-firebase-adminsdk-4er0q-d8cdc4539b.json');

// serviceAccount;
const firebaseApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

export default firebaseApp;
