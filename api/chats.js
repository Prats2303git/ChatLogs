const mongoose = require("mongoose");
const Chat = require('../models/chat.js');

const connectToDatabase = async () => {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return db;
  };
module.exports = async (req, res) => {
    try {
      await connectToDatabase();
      const chats = await Chat.find({});
      return res.status(200).json(chats);
    } catch (error) {
      console.error('Function error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };