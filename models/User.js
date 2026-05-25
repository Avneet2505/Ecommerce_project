const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    wishList:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    cart:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
]
});
console.log(passportLocalMongoose);
UserSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User' , UserSchema);
module.exports = User;