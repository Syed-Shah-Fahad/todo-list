var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolist'); //db connection

//Schema
 var Schema = mongoose.Schema;
 var todoSchema = new Schema({
 	title: {type: String, required: true}
 });

 var todoModel = mongoose.model('todoModel', todoSchema);

//Defining Middleware
app.use(express.static(__dirname + '/public')); //Serving Static content under the directory name called publiv
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/api/createPost', createPost);
app.get('/api/getAllPosts', getAllPosts);
app.delete('/api/deletepost:id', deletepost);
app.get('/api/editpost:id', editpost);
app.put('/api/updatepost:id',updatepost);

function updatepost(req,res){
	var postId = req.params.id;
	var post = req.body;
	todoModel
		.update({_id: postId},{
			title: post.title 
		})
		.then(
			function(status){
				res.sendStatus(200);
			},
			function(error){
				res.sendStatus(400);
			}
			)
}

function editpost(req,res){
	var postId = req.params.id;
	todoModel
		.findById(postId)
		.then(
			function(post){
				res.json(post);
			},
			function(err){
				res.sendStatus(400);
			}
			)

}

function deletepost(req,res){
	var postId = req.params.id;
	todoModel
		.remove({_id: postId})
		.then(
			function(status){
				res.sendStatus(200);
			},
			function(error){
				res.sendStatus(400);
			}
			);

}

function getAllPosts(req,res){
		todoModel
			.find()
			.then(
				function(posts){
					res.json(posts);
				},
				function(error){
					res.sendStatus(400);
				}
				)
}

function createPost(req,res){
	var post = req.body;
	console.log(post);
	todoModel
		.create(post)
		.then(
			function(obj){
					res.json(200);
			},
			function(err){
				res.sendStatus(400);
			}
			);

}

//Listening on Port #
app.listen(4040);
console.log("Server Starts running on port 4040");