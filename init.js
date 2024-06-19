const Chat = require('./models/chat.js');
const db = require("./config/mongoose-connection");

let allChats =
[
    {
        from : 'Pratyai',
        to : 'Aman',
        mssg : "How is the prep for internship?",
        created_at : new Date()
    },
    {
        from : 'Aman',
        to : 'Ashish',
        mssg : "Let us do some projects",
        created_at : new Date()
    },
    {
        from : 'Aman',
        to : 'Pratyai',
        mssg : "Have you done express js",
        created_at : new Date()
    },
    {
        from : 'Aditya',
        to : 'Ashish',
        mssg : "Give an idea about getting started with ML",
        created_at : new Date()
    }
]

Chat.insertMany(allChats);