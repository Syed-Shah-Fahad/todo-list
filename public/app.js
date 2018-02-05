//Declaring TopLevel Module.
angular
	.module("TodoApp", [])
	.controller("TodoController", TodoController);

	function TodoController($scope,$http){
		$scope.createpost = createpost;
		$scope.deletepost = deletepost;
		$scope.editpost = editpost;
		$scope.updatepost = updatepost;

		function init(){
			getAllPosts();			
		}
		init();

		function updatepost(post){
			//console.log(post)
			$http
				.put('/api/updatepost'+post._id, post)
				.then(getAllPosts);
		}

		function editpost(postId){
			$http
				.get('/api/editpost'+postId)
				.then(function(response){
					$scope.post=response.data;
				})
		}

		function deletepost(postId){
			$http
				.delete('/api/deletepost'+postId)
				.then(getAllPosts);
		}

		function getAllPosts(){
			$http
				.get('/api/getAllPosts')
				.then(function(response){
					$scope.posts=response.data;
				})
		}

		function createpost(post){
			console.log(post);
			$http
				.post('/api/createPost',post)
				.then(getAllPosts);
		}

	}

