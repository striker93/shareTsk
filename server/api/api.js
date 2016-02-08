var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');
function createTodo(req, res) {
    function createTodoItem(reqTodo, Todo) {
        return new Todo({
            user_id: reqTodo.user_id,
            title: reqTodo.title,
            content: reqTodo.content,
            updated_at: Date.now()
        });
    }
    var todoItem = createTodoItem(req.body, Todo);
    todoItem.save().then(function (todo) {
        res.send(todo);
    });

}
function getTodo(req, res) {
    Todo.find().then(function (todo) {
        res.send(todo);
    });
}

function deleteTodo(req, res) {
    Todo.findByIdAndRemove(req.params.todoID).then(function (err, value) {
        if (!err) { console.log(value); } else { console.log(err); };
        res.send(err);
    });
}
function updateTodo(req, res) {
    console.log(req.body.listID);
    Todo.where({_id:mongoose.Types.ObjectId(req.body.listID)})
        .findOne()
        .then(function(value){
            value
                .update({"title": req.body.title,"content": req.body.content})
                .then(function(update){
                    if(update){
                        res.send('updated');
                    }
                });
        });
}
module.exports = {
    createTodo: createTodo,
    getTodo: getTodo,
    deleteTodo: deleteTodo,
    updateTodo: updateTodo
};