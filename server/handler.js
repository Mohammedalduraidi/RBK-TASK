const db = require('./data-base/index').studentSchema


// exports.addStudent = (req, res) => {
//     const { studentName, level } = req.body;
//     let addStudent = new db({
//         studentName,
//         level
//     })
//     addStudent.save((err, data) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         res.sendStatus(201);
//     })
// }

// exports.getStudents = (req, res) => {
//     db.find({}, (err, data) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         res.send(data);
//     })
// }

// exports.updateLevel = (req, res) => {
//     const { level, id } = req.body;
//     db.findOneAndUpdate({ _id: id }, { $set: { level } }, (err, data) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         res.sendStatus(200);
//     })
// }

// exports.deleteStudent = (req, res) => {
//     const { id } = req.body;
//     db.findOneAndRemove({ _id: id }, (err, data) => {
//         if (err) {
//             throw err;
//         } else {
//             res.sendStatus(200);
//         }
//     })
// }