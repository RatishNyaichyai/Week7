const path = require('path')
const { InsertDB } = require('./database')
const express = require('express');
var bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const staticPath = path.join(__dirname, '../public');
app.use(express.static(staticPath))

app.get('/drawingBoard', (req, res) => {
    // res.send('hi')
    const result = InsertDB(req.body);
    result.then(doc => {
        res.send(doc.insertedId)
    }).catch(err => {

        res.send(err)
    })
}
)
app.post('/drawingBoard', (req, res) => {
    // console.log(req.body);
    // res.send(req.body);
    const result = InsertDB(req.body);
    result.then(doc => {
        res.send(doc.insertedId)
    }).catch(err => {

        res.send(err)
    })
}
)

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})