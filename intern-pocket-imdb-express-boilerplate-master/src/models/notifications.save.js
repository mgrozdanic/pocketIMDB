const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user: String,
    movie: String
});
  
  const Message = mongoose.model('Message', messageSchema);
  
  module.exports = Message;
  