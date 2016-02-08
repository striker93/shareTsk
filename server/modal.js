module.exports=function(mongoose){
var Schema = mongoose.Schema;

var Todo = new Schema({
    user_id: String,
    title:  String,
    content: String,
    updated_at: Date
});

mongoose.model('Todo', Todo);
};