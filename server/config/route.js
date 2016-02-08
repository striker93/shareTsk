var apis = require('../api/api');
module.exports = function (app) {
    app.get('/todo', apis.getTodo);
    app.put('/todo', apis.createTodo);
    app.delete('/todo/:todoID', apis.deleteTodo);
    app.post('/todo', apis.updateTodo);
};