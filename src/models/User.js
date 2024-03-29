const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
const Task = require('../models/Task.js');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../vars/.env')});

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 7,
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('Invalid Age')
            }
        }
    },
    c : {
        type: Schema.Types.ObjectId, ref: 'Task', 
    },
    
    tokens: [{
        token: {
        type: String,
        required: true
    }
    }],
    avatar: Buffer

}, {
    timestamps: true
});



//virtual field to populate user tasks
UserSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})


// methods on user instance
UserSchema.methods.toJSON = function ()  {
    const user = this
    let userObject = user.toObject();
    
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    
    return userObject;
}

UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    
    user.tokens = user.tokens.concat({ token })
    await user.save()
    
    return token
}

UserSchema.statics.findByCredentials = async function (email,password) {
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new Error('Unable to login')
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    
    return user
}

UserSchema.pre('save', async function (next) {
    const user = this;
    
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next(); 
})

//Delete user tasks when user is removed
UserSchema.pre('remove', async function (next){
    const user = this
    await Task.deleteMany({owner: user._id})
    next();
})

const User = mongoose.model('User', UserSchema); 
module.exports = { User }