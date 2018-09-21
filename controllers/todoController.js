const bodyParser = require('body-parser');
const moongoose = require('mongoose');

//Connect to the dataBase 

moongoose.connect('mongodb://username:password1@ds211083.mlab.com:11083/todo');

// Create a schema 

const todoSchema = new moongoose.Schema({

    item: String

});

const Todo = moongoose.model('Todo', todoSchema);

const urlencodedParser = bodyParser.urlencoded({extended:false});
module.exports = function(app) {

app.get('/todo', function(req, res) {

    //get data from db

    Todo.find({}, function(err, data) {

        if(err) throw err;
        res.render('todo', {todos:data});
    });

});

app.post('/todo', urlencodedParser, function(req, res) {

    //get data from view and add it to the db

    let newTodo = Todo(req.body).save(function(err, data) {

        if(err) throw err;
        res.json(data);

    });
    
});

app.delete('/todo/:item', function(req,res) {

    //delete from db

    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {

        if(err) throw err;
        res.json(data);

    });

});

};