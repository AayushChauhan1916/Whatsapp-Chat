const express = require("express");
const app = express();
const path = require("path");
const Chat = require("./models/chat.js");
const methodoveride = require("method-override");

const mongoose = require('mongoose');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(methodoveride("_method"));

main()
    .then(() => console.log("connection successfull"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.listen("8080",()=>{
    console.log("server starting hold down.......")
});

// Index Route 

app.get("/chats", async function (req,res){
  let chats = await Chat.find();
  res.render("home.ejs",{chats})  
});

// new chat route

app.get("/chats/new",(req,res)=>{
  res.render("form.ejs")
});

// post method

app.post("/chats", async (req,res)=>{
  let {from ,message, to} = req.body;
  let new_chat = await new Chat({
    from : from,
    message : message,
    to : to,
    date : new Date()
  })
  new_chat.save()
    .then(res=>{
      console.log("chat saved succesfully")
    })
    .catch(err=>{
      console.log(err)
    })
    res.redirect("/chats")
});

// edit form render

app.get("/chats/:id/edit",async (req,res)=>{
  let {id} = req.params;
  let chat_details = await Chat.findById(id);
  res.render("edit.ejs",{chat_details})
});

// PUT route 

app.put("/chats/:id",async (req,res)=>{
  let {id} = req.params;
  let {message : new_msg} = req.body;
  await Chat.findByIdAndUpdate(id,{message: new_msg},{runValidators : true},{new:true});
  res.redirect("/chats")
});

// delete route

app.delete("/chats/:id",async (req,res)=>{
  let {id} = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect("/chats")
});