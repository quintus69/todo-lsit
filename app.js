const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000;

let items = ["Buy Food", "Cook Food" , "Eat Food"];

app.set('view engine' , 'ejs');

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

mongoose.connect("mongodb+srv://sjprakash720:Ilov3ass%4069420@cluster0.hktbwep.mongodb.net/todolistDB" , {useNewUrlParser: true});

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item" , itemsSchema)

const item1 = new Item({
    name:"Welcome to your todolist"
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "<-- Hit this to delete an item"
});

const defaultItems = [item1,item2,item3];

const listSchema = {
    name: String,
    items : [itemsSchema]
}

const List = mongoose.model("List" , listSchema);

app.get('/', function(req ,res ) {
    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US",options)



    Item.find({},function(err,foundItems){
        res.render('list', {kindofday : day, newListItems : foundItems})
    })

    
    });

    app.get("/customListName" , function(req,res){
        const customListName = req.params.customListName
    })

    app.post('/' , function(req,res){
        const itemName = req.body.newItem

        const item = new Item({
            name:itemName
        })
        item.save();

        res.redirect('/');
    });


    app.post("/delete", function(req,res){
        const checkedItemId = req.body.checkbox;
        Item.findByIdAndRemove(checkedItemId, function(err){
            res.redirect('/')
        })
    })

app.listen(process.env.PORT || port, function(){
    
    console.log(`Server has started successfully on port ${port}`);
});



// mongodb+srv://sjprakash720:Ilov3ass@69420@cluster0.hktbwep.mongodb.net/?retryWrites=true&w=majority