const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main()
    .then(() => console.log("connection successful...."))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const allChats = [
    {
        from : "Aayush",
        to : "ujjwal", 
        message : "Hey, How are you",
        date : new Date(),
    },
    {
        from : "Nishkarsh",
        to : "Ishan",
        message : "Have You Completed Web Development Course",
        date : new Date(),
    },
    {
        from : "Ishan",
        to : "Monika",
        message : "Hey, Send me a notes of CSS",
        date : new Date(),
    },
    {
        from : "Garv",
        to : "Unnati",
        message : "Hey Didi, please send me 500 rupees",
        date : new Date(),
    },
    {
        from : "Aman",
        to : "Vinay",
        message : "Let's play BGMI",
        date : new Date(),
    },
    {
        from : "Ujjwal",
        to : "Rohit",
        message : "join fast!!, we are waiting in the BGMI lobby",
        date : new Date(),
    },
];

// Chat.insertMany(allChats);


