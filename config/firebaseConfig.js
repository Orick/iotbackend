const admin = require('firebase-admin');
const serviceAccount = require(__dirname+'/adminFirebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iotbackend-ceb59.firebaseio.com"
});

module.exports = admin;