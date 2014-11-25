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
