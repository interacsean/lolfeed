import firebaseAdmin from 'firebase-admin';

var serviceAccount = require('../../certs/lolfeed-41c5f-firebase-adminsdk-z9ft6-016ebe84db.json');

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
}

export default firebaseAdmin;
