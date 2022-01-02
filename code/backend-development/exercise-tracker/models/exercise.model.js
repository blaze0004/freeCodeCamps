const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    userId: ObjectId,
    description: String,
    duration: Number,
    date: Date
}) 

exports.Exercises = mongoose.model("exercises", exerciseSchema);
