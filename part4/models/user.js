const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const commonConfig = {
  type: String,
  required: true,
  unique: true
};

const user = {
  username: commonConfig,
  passwordHash: commonConfig,
  name: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
};

const userSchema = new mongoose.Schema(user);
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
})
userSchema.plugin(uniqueValidator);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;