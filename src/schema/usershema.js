const mongoose = require('mongoose');
const bcrypt= require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
   
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    
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
   
  },
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  }
});

userSchema.pre('save', async function(next)
{
   if(this.isModified('password')){
    this.password=  await bcrypt.hash(this.password,10);
   }
  next();
})

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
