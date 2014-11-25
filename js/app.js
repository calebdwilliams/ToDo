var notesApp = angular.module('notesApp', [/*dependencies*/]);			// the second argument is necessary to define a module

/* // Factories are set up as JavaScript functions
	notesApp.factory('ItemService', [function() {
		var items = [
			{id: 1, label: 'Item 0'},
			{id: 2, label: 'Item 1'}
		];

		return {
			list: function() {
				return items;
			},
			add: function(item) {
				items.push(item);
			}
		};
	}]);
*/

/* // Services are set up as JavaScript class functions, no return values; object oriented
	function ItemService() {
		var items = [
			{id: 1, label: 'Item 0'},
			{id: 2, label: 'Item 1'}
		];

		this.list = function() {
			return items;
		};
		this.add = function(item) {
			items.push(item);
		};
	}
*/

/* // Providers 
	function ItemService(opt_items) {
		var items = opt_items || [];

		this.list = function() {
			return items;
		};
	}

	notesApp.provider('ItemService', function() {
		var haveDefaultItems = true;

		this.disableDefaultItems = function() {
			haveDefaultItems = false;
		};

		// This function gets our dependencies, not the provider above
		this.$get = [function() {
			var optItems = [];
			if (haveDefaultItems) {
				optItems = [
					{id: 1, label: 'Item 0'},
					{id: 2, label: 'Item 1'},
				];
			}

			return new ItemService(optItems);
		}];
	});
	notesApp.config(['ItemServiceProvider', function(ItemServiceProvider) {
		// to see how the provider can change configuration, change the value of 
		// shouldHaveDefaults to true and try running the example
		var shouldHaveDefaults = false;

		// get configuration from server, set shouldHaveDefaults shomehow
		// assume it magically comes for now
		if (!shouldHaveDefaults) {
			ItemServiceProvider.disableDefaultItems();
		}
	}]);
*/

/*****************
 * Chapter 6
 *****************/


// To Do App

var toDoApp = angular.module('toDoApp', ['ngRoute']);

toDoApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', {
			controller: 'ToDoController',
			controllerAs: 'ctrl',
			templateUrl: 'partials/list.html'
		}).
		when('/update/:id', {
			controller: 'EditController',
			controllerAs: 'edit',
			templateUrl: 'partials/update.html'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);