const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
       type:String,
       unique:true,
       required:true,
       validate(value) {
        if(!validator.isEmail(value)) {
            throw new Error('invalid email address');
        }
       }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)) {
                throw new Error("password is too weak");
                
            }
        }
    }
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

module.exports=mongoose.model('User',userSchema);