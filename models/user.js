const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    email: { type: String, lowercase: true, required: true, unique: true, match: /@/},
    password: { type: String, required: true }

}, { timestamps: true });

mongoose.model('User', userSchema);