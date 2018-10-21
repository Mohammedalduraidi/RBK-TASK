const db = require('./data-base/index').studentSchema
const histroy = require('./data-base/index').historySchema

exports.saveStudents = (req, res) => {
    const { student1, student2 } = req.body;
    let saveStudent = new histroy({
        student1,
        student2
    })
    saveStudent.save((err, data) => {
        if (err) {
            console.log(err);
            return
        }
        res.send(data)
    })
}
exports.getParingStudent = (req, res) => {
    db.find({}, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(data)
    })
}
exports.addStudent = (req, res) => {
    const { studentName, level } = req.body;
    db.findOne({ studentName }, (err, student) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            if (!student) { // if the student does not exist
                let addStudent = new db({
                    studentName,
                    level
                })
                addStudent.save((err, student) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.sendStatus(201);
                })
            } else {
                res.sendStatus(409) //conflict status.. if the user already existt
            }


        }
    })


}

exports.getStudents = (req, res) => {
    db.find({}, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(data);
    })
}

exports.updateLevel = (req, res) => {
    const { level, id } = req.body;
    db.findOneAndUpdate({ _id: id }, { $set: { level } }, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.sendStatus(200);
    })
}

exports.deleteStudent = (req, res) => {
    const { id } = req.body;
    db.findOneAndRemove({ _id: id }, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.sendStatus(200);
        }
    })
}