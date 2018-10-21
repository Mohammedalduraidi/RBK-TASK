const mongoose = require('mongoose');
mongoose.connect('mongodb://student:Jackel12@ds135433.mlab.com:35433/students');
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', () => {
    console.log('mongoose connection error');
});

db.once('open', () => {
    console.log('mongoose connected successfully');
});


let Schema = mongoose.Schema; // Create a mongoose schema 

let studentSchema = new Schema({
    studentName: { type: String },
    level: { type: String }
})
let historySchema = new Schema({
    student1: { type: [String] },
    student2: { type: [String] }
})

studentSchema = mongoose.model('studentSchema', studentSchema);
historySchema = mongoose.model('historySchema', historySchema);
module.exports.studentSchema = studentSchema;
module.exports.historySchema = historySchema;