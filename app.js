const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expresSanitizer = require('express-sanitizer');

//App config
// mongoose.connect("mongodb://localhost:27017/blog-routing", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connect("mongodb+srv://Hivzo:hivzo@blog-app.i9ncu.mongodb.net/blog-routing?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
// mongodb+srv://Hivzo:hivzo@blog-app.i9ncu.mongodb.net/blog-routing?retryWrites=true&w=majority
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expresSanitizer());

// Mongoose/Model Config
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type:Date, default:Date.now}
});

let Blog = mongoose.model("Blog", blogSchema);


//Restful Routs
//Home page
app.get("/", (req, res)=>{
    res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err) {
            console.log(err)
            
        } else { 
            res.render("index", {blogs: blogs});
        }
    });
});

//creating new post

app.get("/blogs/new", (req, res) => {
    res.render("new");
});

app.post("/blogs", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.create(req.body.blog , (err, newBlog) => {
        if(err){
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

//showing single post

app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

//edit route 

app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

//update route 
// .findByIdAndUpdate(id, newData, callback)

app.put("/blogs/:id", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog)=>{
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect(`/blogs/${req.params.id}`);
        }
    });
});

//delete route
//.findByIdAndRemove(id, callback)

app.delete("/blogs/:id", (req, res) => {
    //destroy
    Blog.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});


app.listen(3000, () => {
    console.log("server is on!")
})