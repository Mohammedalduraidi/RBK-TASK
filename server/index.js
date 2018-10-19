const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const handler = require('./handler')
app.use(express.static(path.join(__dirname, '../pairing-system/build')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.post('/addStudent', handler.addStudent)
app.get('/getStudents', handler.getStudents)
app.post('/updateLevel', handler.updateLevel)
app.post('/deleteStudent', handler.deleteStudent)
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, '../pairing-system/build/index.html')))
})

const PORT = process.env.PORT || 7511;
if (!module.parent) {
    app.listen(PORT, () => {
        console.log(`Hello world is working on port: ${PORT}`);
    });
}

module.exports = app;