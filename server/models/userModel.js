const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
        min:3,
        max:20,
    },

    email:{
        type: String,
        required: true,
        unique: true,
        max:50,
    },

    password:{
        type: String,
        required: true,
        min:8,
    },
    isAvatarImageSet:{
        type:Boolean,
        default: false,
    },
    avatarImage:{
        type:String,
        default:"",
    }

})

module.exports = mongoose.model('User', userSchema);