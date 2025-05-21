const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    match: [/^[a-zA-Z ]+$/, 'Name should contain only letters and spaces'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    match: [
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
      'Password must be at least 6 characters and include at least one letter and one number',
    ],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Please enter a valid email address',
    ],
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'],
  },
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
