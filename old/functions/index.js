const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
// const cors = require('cors');

const app = express();

// app.use(cors({origin: true}));
// app.get('/', (req, res) => {
//     app.send("hello")      
// });
app;

exports.api = functions.https.onRequest(app);
