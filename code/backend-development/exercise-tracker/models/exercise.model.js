const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const dbConnection = require('../db.connection');

const exerciseSchema = new mongoose.Schema({
    userId: ObjectId,
    description: String,
    duration: Number,
    date: Date
}) 

exports.Exercises = dbConnection.model("exercises", exerciseSchema);
