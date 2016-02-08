var path = require('path');
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
    });
    app.get('/blog/:id', function (req, res) {
        Todo.where({ _id: mongoose.Types.ObjectId(req.params.id.toString()) })
            .findOne()
            .then(function (value) {
                console.log(req.params.id,value);
                res.render('viewcontent', {
                    pageTitle: value.title,
                    content: value.content
                });
            });
    });
};