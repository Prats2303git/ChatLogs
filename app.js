require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const { v4 : uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const Chat = require('./models/chat.js');

const db = require("./config/mongoose-connection");

app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.get('/',(req,res)=>{
    res.redirect('/chats');
})
app.get('/chats', async (req,res)=>{
    let chats = await Chat.find();
    res.render("chatview.ejs",{ chats });
})

app.get('/chats/new', (req,res)=>{
    res.render("newchat.ejs");
})

app.post('/chats', (req,res)=>{
    let { from, mssg, to } = req.body;
    let chat = new Chat({
        from : from,
        to : to,
        mssg : mssg,
        created_at : new Date()
    });
    chat.save();
    res.redirect('/chats');
})

app.get('/chats/:id/edit', async (req,res)=>{
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("editchat.ejs",{ chat });
})

app.put('/chats/:id', async(req,res)=>{
    let { id } = req.params;
    let { mssg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {mssg : mssg}, {runValidators : true, new : true});
    res.redirect('/chats');
})

app.delete('/chats/:id', async(req,res)=>{
    let { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect('/chats');
})
let PORT = process.env.PORT || 8080 ;
app.listen(PORT,()=>{
    console.log("server is listening to "+`${PORT}`);
})