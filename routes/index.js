var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/alluserposts',async function(req,res,next){
  let user=await userModel
  .findOne({_id:"65f3df38ffc09ddaa1b9da34"})
  .populate('posts')
  res.send(user);
});
router.get('/createuser', async function(req, res, next) {
  let createduser=await userModel.create({
    username:"Akanksha",
    password:"Akanksha",
    posts: [],
    email:"akanksha@gmail.com",
    fullname:"Akanksha Tiwari"
  });
  res.send(createduser);
})


router.get('/createpost',async function(req,res,next){
  let createdpost=await postModel.create({
    postText:"Hello EveryOne",
    user:"65f3df38ffc09ddaa1b9da34"
  });
  let user=await userModel.findOne({_id:"65f3df38ffc09ddaa1b9da34"});
  user.posts.push(createdpost._id);
  await user.save();
  res.send("done")
})

module.exports = router;
