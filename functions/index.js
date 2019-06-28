const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');

const firebaseConfig = require('./config.json');
firebaseConfig.credential = admin.credential.applicationDefault();

const firebaseApp = admin.initializeApp();
const firestore = firebaseApp.firestore();

require('./utils.js');

const app = express();
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

const chillbot = require('./chillbot/index.js');


//https://discordapp.com/oauth2/authorize?client_id=590503696433938463&scope=bot

//client.login(botConfig.token);

// client.on('message', message => {
//     if (!message.content.startsWith(botConfig.prefix) || message.author.bot) return;

//     const args = message.content.slice(botConfig.prefix.length).split(/\s+/);
//     const command = args.shift().toLowerCase();
//     console.log("command: ", command);

//     if (command === 'server') {
//         return message.channel.send(`This server's name is : ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);

//     } else if (command === 'user-info') {
//         return message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);

//     } else if (command === 'args-info') {
//         if (!args.length) { 
//             return message.channel.send(`You didn't provide any arguments, ${message.author}`);
//         } else if (args[0] === 'foo') {
//             return message.channel.send('bar');
//         }
//         message.channel.send(`First argument: ${args[0]}`);

//     } else if (command === 'kick') {
//         console.log("here");
//         const taggedUser = message.mentions.users.first();
//         message.channel.send(`You wanted to kick: ${taggedUser.username}`);

//     } else if (command === 'avatar') {
//         if (!message.mentions.users.size) {
//             return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
//         }

//         const avatarList = message.mentions.users.map(user => {
//             return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
//         });

//         message.channel.send(avatarList);

//     } else if (command == 'prune') {
//         const amount = parseInt(args[0]) + 1;

//         if (isNaN(amount)) {
//             return message.reply('that doesn\'t seem to be a valid number');
//         } else if (amount <= 1 | amount > 100) {
//             return message.reply('you need to input a number between 1 and 99');
//         }

//         message.channel.bulkDelete(amount, true).catch(err => {
//             console.error(err);
//             message.channel.send('there was an error trying to prune messages in this channel!');
//         });

//     }

// });


// function getMembers() {
//     var member = [];
//     firestore.collection('members')
//         .onSnapshot(function(querySnapshot) {
//             querySnapshot.forEach(function(doc) {
//                 member.push(parseTimestamp(doc.data()));
//             });
//         // }).catch(function(error) {
//         //     console.log('getMembers error: ', error);
//             console.log('in snapshot: '+ member);
//         });
//     return member;
// }

app.get('/', (request, response) => {
    //response.render('index','hello');
    //response.send("hello");
    response.json({ version: packageInfo.version });
});

// app.get('/test', (request, response) => {
//     getRealtimeUpdates();
// });

// function getRealtimeUpdates() {
//     firestore.collection('members').onSnapshot(function(querySnapshot) {
//         var member = [];
//         querySnapshot.forEach(function(doc) {
//             member.push(parseTimestamp(doc.data()));
//         });
//         response.render('index', result);
//     });
// }

exports.app = functions.https.onRequest(app);