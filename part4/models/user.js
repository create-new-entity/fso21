const mongoose = require('mongoose');

const user = {
  username: String,
  passwordHash: String,
  name: String
};

const userSchema = new mongoose.Schema(user);
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;