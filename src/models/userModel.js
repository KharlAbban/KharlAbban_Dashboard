const mongoose = require("mongoose");
//custom validator package
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

//create schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please provide and email address"],
        unique: true,
        lowercase: true,
        minlength: [7, "Email is not valid!"],
        validate: [isEmail, " Enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minlength: [5, "Password should be at least 5 letters"]
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
});

// Mongoose hooks: fires before/after a mongoose event occurs using .post method
//param1: event, param2: callback function
//pre hook fires before event
//use normal function so u get access to the this keyword
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Define Static Methods on User schema in mongoose
// Static method to log in user
userSchema.statics.loginUser = async function (email, password) {
    // Check if user with passed in email exists
    const user = await this.findOne({ email });

    // Check hashed passwords if user exists, else throw error
    if (user) {
        const isAuthed = await bcrypt.compare(password, user.password);
        if (isAuthed) { //if password matches
            return user;
        }
        throw Error("Incorrect Password!");
    }

    throw Error("Incorrect Email Address!");
}


const User = mongoose.model("USER", userSchema);

module.exports = User;