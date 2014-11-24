// notesApp.controller('MainController', ['$scope', function($scope) {
// 	$scope.name = 'Caleb';
// 	var self = this;
// 	self.message = 'Hello '	

// 	self.changeMessage = function() {
// 		self.message = 'Goodbye ';
// 	}

// 	// self.notes = [
// 	// 	{id: 1, label: 'First Note', done: false, assignee: 'Shyam'},
// 	// 	{id: 2, label: 'Second Note', done: false},
// 	// 	{id: 3, label: 'Third Note', done: true},
// 	// 	{id: 4, label: 'Last Note', done: false, assignee: 'Brad'}
// 	// ];

// 	var notes = [
// 		{ id: 1, label: 'First Note', done: false, someRandom: 3141592 },
// 		{ id: 2, label: 'Second Note', done: false },
// 		{ id: 3, label: 'Finished Third Note', done: true}
// 	];

// 	self.notes1 = angular.copy(notes);
// 	self.notes2 = angular.copy(notes);

// 	self.changeNotes = function() {
// 		notes = [
// 			{
// 				id: 1,
// 				label: 'Changed Note',
// 				done: false,
// 				someRandom: 4242
// 			},
// 			{
// 				id: 2,
// 				label: 'Second Note',
// 				done: false
// 			},
// 			{
// 				id: 3,
// 				label: 'Finished Third Note',
// 				done: true
// 			}
// 		];
// 		self.notes1 = angular.copy(notes);

// 		self.notes = notes;
// 	}

// 	self.getNoteClass = function(status) {
// 		return {
// 			done: status,
// 			pending: !status
// 		};
// 	};

// 	self.notes = [
// 		{id: 1, label: 'First Note', done: false},
// 		{id: 2, label: 'Second Note', done: false},
// 		{id: 1, label: 'Third Finished Note', done: true},
// 	];

// }]);

// notesApp.controller('ListController', ['$scope', function($scope) {
// 	var self = this;

// 	self.items = [
// 		{id: 1, label: 'First', done: true},
// 		{id: 2, label: 'Second', done: false}
// 	];

// 	self.getDoneClass = function(item) {
// 		return {
// 			finished: item.done,
// 			unfinished: !item.done
// 		};
// 	};
// }]);

notesApp.controller('MainController', ['$scope', function($scope) {
	var self = this;

	self.users = [];

	self.submit = function() {
		console.log('User clicked submit with ', self.user);
		self.users.push({
			username: self.user.username,
			password: self.user.password,
			profile: {
				firstName: self.user.profile.firstName,
				middleInitial: self.user.profile.middleInitial,
				lastName: self.user.profile.lastName,
				dob: self.user.profile.dob,
				agree: self.user.profile.agree,
				gender: self.user.profile.gender,
				location: self.user.profile.location
			}
		});

		// Reset the fields
		document.getElementById('myForm').reset();
	}

	self.sports = [
		{label: 'Basketball', selected: 'YES'},
		{label: 'Football', selected: 'YES'},
		{label: 'Cricket', selected: 'NO'},
		{label: 'Soccer', selected: 'NO'},
		{label: 'Swimming', selected: 'YES'}
	];

	self.rivalry = [
		{label: 'Texas sucks', id: 1},
		{label: 'Texas realy sucks', id: 2},
		{label: 'Texas can suck it', id: 3}
	];

	self.selectedRivalryId = 1;
	self.selectedRivalry = self.rivalry[1];
}]);






/* Chapter 5 */
	/*
notesApp.controller('NextController', ['$scope', function($scope) {
	var self = this;

	self.tab = 'first';
	self.open = function(tab) {
		self.tab = tab;
	};
}]);

notesApp.controller('SubController', function() {
	var self = this;
	self.list = [
		{id: 1, label: 'Item 0'},
		{id: 2, label: 'Item 1'}
	];

	self.add = function() {
		self.list.push({
			id: self.list.length + 1,
			label: 'Item ' + self.list.length
		});
	}
});

notesApp.controller('DummyController', ['$log', function($log) {
	var self = this;
	self.logStuff = function() {
		$log.log('the button was pressed.');
	};
}]);
	*/

/*  // Using a factory
	notesApp.controller('NextController', [function() {
		var self = this;
		self.tab = 'first';
		
		self.open = function(tab) {
			self.tab = tab;
		};
	}]);

	notesApp.controller('SubController', ['ItemService', function(ItemService) {
		var self = this;

		self.list = function() {
			return ItemService.list();
		};

		self.add = function() {
			ItemService.add({
				id: self.list().length + 1,
				label: 'Item ' + self.list().length
			});
		};
	}]);
*/

/* // Using a service
	notesApp.service('ItemService', [ItemService]);
	notesApp.controller('NextController', [function() {
		var self = this;
		self.tab = 'first';
		self.open = function(tab) {
			self.tab = tab;
		};
	}]);
	notesApp.controller('SubController', ['ItemService', function(ItemService) {
		var self = this;
		self.list = function() {
			return ItemService.list();
		};
		self.add = function() {
			ItemService.add({
				id: self.list().length + 1,
				label: 'Item ' + self.list().length
			});
		};
	}]);
*/

/* // Using a Provider 
	notesApp.controller('NextController', [function() {
		var self = this;
		self.tab = 'first';
		self.open = function(tab) {
			self.tab = tab;
		};
	}]);
	notesApp.controller('SubController', ['ItemService', function(ItemService) {
		var self = this;
		self.list = function() {
			return ItemService.list();
		};

		self.add = functoin() {
			ItemService.add({
				id: self.list().length + 1,
				label: 'Item ' + self.list().length
			});
		};
	}]);
*/

/*****************
 * Chapter 6
 *****************/

notesApp.controller('HttpController', ['$http', '$log', 'NoteService', function($http, $log, NoteService) {
 	var self = this;

 	self.items = [];
 	self.newTodo = {};

 	var fetchTodos = function() {
 		return NoteService.query()
 			.then(function(response) {
 				self.items = response.data;
 			}, function(errResponse) {
 				$log.error('Error while fetching notes.');
 			});
 	};

 	fetchTodos();

 	self.add = function() {
 		return NoteService.post(self.newTodo)
 			.then(fetchTodos)
 			.then(function(response) {
 				self.newTodo = {};
 			});
 	};

 	self.delete = function(noteID) {
 		console.log(noteID);
 	};
}]);

notesApp.factory('NoteService', ['$http', function($http) {
 	return {
 		query: function() {
 			return $http.get('api/index.php');
 		}, post: function(postData) {
 			return $http.get('api/index.php', postData);
 		}
 	};
}]);

notesApp.controller('loginCtrl', ['$http', function($http) {
 	var self = this;
 	self.user = {};
 	self.message = 'Please login';
 	self.login = function() {
 		$http.post('/api/login', self.user).then(
 			function(response) {
 				self.message = response.data.message;
 			}
 		);
 	};
 }]);

// notesApp.config(['$httpProvider', function($httpProvider) {
//  	// Every POST data becomes jQuery style
//  	$httpProvider.defaults.transformRequest.push(
//  		function(data) {
//  			var requestStr;
//  			if (data) {
//  				data = JSON.parse(data);
//  				for (var key in data) {
//  					if (requestStr) {
//  						requestStr += '&' + key + '=' + data[key];
//  					} else {
//  						requestStr = key + '=' + data[key];
//  					}
//  				}
//  			}
//  			return requestStr;
//  		}
//  	);
//  	// Set the content type to be FORM type for all post requests
//  	// This does not add it for GET requests
//  	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// }]);

// notesApp.factory('MyLoggingInterceptor', ['$q', function($q) {
//  	return {
//  		request: function(config) {
//  			console.log('Request made with ', config);
//  			return config;
//  			// If an error, not allowed or my custom condition
//  			// return $q.reject('Not allowed')
//  		}, requestError: function(rejection) {
//  			console.log('Request error due to ', rejection);
//  			// Continue to ensure that the next promise chain
//  			// sees and error
//  			return $q.reject(rejection);
//  			// Or handled successfully?
//  			// return someValue
//  		}, response: function(response) {
//  			console.log('Response from server ' response);
//  			// Return a promise
//  			return response || $q.when(response);
//  		}, responseError: function(rejection) {
//  			console.log('Error in response ', rejection);
//  			// Continue to ensure that the next promise chain
//  			// sees an error
//  			// Can check auto status code here if need to
//  			// if (rejection.status === 403) {
//  				// Show a login dialog
//  				// return a value to tell controllers it has 
//  				// been handled
//  			// }
//  			// Or return a rejection to continue the 
//  			// promise failure chain
//  			return $q.reject(rejection);
//  		}
//  	};
// }]).config(['$httpProvider', function($httpProvider) {
//  	$httpProvider.interceptors.push('MyLoggingInterceptor')
// }]);

// To Do App

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
 		self.editItem = {}};
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