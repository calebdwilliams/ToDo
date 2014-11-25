'use strict';

toDoApp.controller('ToDoController', ['ToDoFactory', '$log', '$location', function(ToDoFactory, $log, $location) {
	var self = this;

 	self.items = [];
 	self.newTodo = {};
 	self.editItem = {};

 	var fetchTodos = function() {
 		return ToDoFactory.query()
 			.then(function(response) {
 				self.items = response.data;
 				for (var i = 0; i < self.items.length; i ++) {
 					self.items[i].id = parseInt(self.items[i].id);
 				}
 				for (var i = 0; i < self.items.length; i ++) {
 					self.items[i].complete = parseInt(self.items[i].complete);
 				}
 				localStorage['todos'] = JSON.stringify(response.data);
 			}, function(errResponse) {
 				self.items = localStorage['todos'];
 				$log.error('Error while fetching notes.');
 			});
 	};

 	var findItem = function(itemID) {
 		for (item in self.items) {
 			if (self.items[item]['id'] === itemID) {
 				return self.items[item];
 			}
 		}
 	}

 	fetchTodos();

 	self.add = function() {
 		return ToDoFactory.post(self.newTodo)
 			.then(fetchTodos)
 			.then(function(response) {
 				self.newTodo = {};
 			});
 	};

 	self.editView = function(todoID) {
 		self.editItem = findItem(todoID);
 		$location.path('/update/' + todoID);
 	};

 	self.cancel = function(todoID) {
 		self.editItem = {};
 		$location.path('/');
 	};

 	self.delete = function(todoID) {
 		var deleteItem = findItem(todoID);

 		var confirmation = confirm('Are you sure you want to delete item "' + deleteItem.name + '"?');

 		if (confirmation === true) {
 			return ToDoFactory.deleteItem(deleteItem)
 				.then(fetchTodos);
 		}
 	};

 	self.update = function(todoID) {
 		var updateItem = findItem(todoID);
 		return ToDoFactory.update(updateItem);
 	};

 	self.updateItem = function(updateItem) {
 		return ToDoFactory.update(updateItem)
 			.then(function() {
 				self.editItem = {};
 				$location.path('/');
 			});
 	}
}]);

toDoApp.controller('EditController', ['ToDoFactory', '$location', '$routeParams', function(ToDoFactory, $location, $routeParams) {
	var self = this;

	self.whichItem = {};
	self.items = [];

	var isEmpty = function(obj) {
	    for(var prop in obj) {
	        if(obj.hasOwnProperty(prop))
	            return false;
	    }

	    return true;
	}

	var findItem = function() {
		return ToDoFactory.query()
			.then(function(response) {
				// console.log($routeParams.id);
				for (item in response.data) {
		 			if (response.data[item]['id'] === $routeParams.id) {
		 				self.items = response.data;
		 				self.whichItem = response.data[item];
		 			}
		 		}
			})
	}

	findItem().then(function() {
		if (isEmpty(self.whichItem)) {
			$location.path('/');
		}
	});

	self.updateItem = function(item) {
		return ToDoFactory.update(item)
			.then(function() {
				$location.path('/');
			});
	};
}]);

toDoApp.factory('ToDoFactory', ['$http', function($http) {
	return {
		query: function() {
			return $http.get('api/todo.php');
		},
		post: function(newTodo) {
			console.log(newTodo);
			return $http.post('api/todo.php', newTodo).success(function(data) {
				console.log(data);
			});
		},
		update: function(item) {
			return $http.post('api/update-todo.php', item).success(function(data) {
				console.log(data);
			})
		},
		deleteItem: function(item) {
			return $http.post('api/delete-todo.php', item).success(function(data) {
				console.log(data);
			});
		}
	}
}]);
