//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lod=require('lodash');

const homeStartingContent = "Welcome to the blog site";
const aboutContent = "It is a blog website.";
const contactContent = "It is made by Utsab /n Email: utsab_ug@ece.nits.ac.in";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];

app.get('/',function (req,res) {
  res.render("home",{HomeText:homeStartingContent, received:posts});
  
})

app.get('/about',function (req,res) {
  res.render("about",{about:aboutContent});  
})
app.get('/contact',function (req,res) {
  res.render("contact",{contact:contactContent});  
})

app.get('/compose',function (req,res) {
  res.render("compose");
  
})


//Dynamic routing
app.get('/posts/:postName',function (req,res) {

  //console.log(req.params.postName);
  posts.forEach(i => {
    if(lod.camelCase(i.title)===lod.camelCase(req.params.postName))
      res.render("post",{element:i});
  });
});

app.post("/compose",function (req,res) {
 const post={
   title:req.body.postTitle,
   blog:req.body.blog
 };
 posts.push(post);
 res.redirect('/');
})






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
