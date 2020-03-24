const mongoose = require('mongoose');



const takeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    listId :String,
    createdAt: String,
    title: String,
    desc: String,
    order: Number
});


module.exports = mongoose.model('Tasks',takeSchema);