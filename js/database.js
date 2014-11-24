// var todo = {};
// todo.indexedDB = {};

// todo.indexedDB.db = null;

// todo.indexedDB.open = function() {		// Open the database
// 	var version = 1.0,
// 		request = indexedDB.open('todos', version);

// 	// We can only create Object stores in a versionchange transaction.
// 	request.onupgradeneeded = function(event) {
// 		var db = event.target.result;

// 		// A versionchange transaction is started automatically.
// 		event.target.transaction.onerror = todo.indexedDB.onerror;

// 		if(db.objectStoreNames.contains('todo')) {
// 			db.deleteObjectStore('todo');
// 		}

// 		var store = db.createObjectStore('todo', {
// 			keyPath: 'timeStamp'
// 		});
// 	}

// 	request.onsuccess = function(event) {
// 		todo.indexedDB.db = event.target.result;
// 		todo.indexedDB.getAllTodoItems();
// 	};

// 	request.onerror = todo.indexedDB.onerror;
// }

// todo.indexedDB.addTodo = function(todoText) {
// 	var db = todo.indexedDB.db,
// 		trans = db.transaction(['todo'], 'readwrite'),
// 		store = trans.objectStore('todo'),
// 		request = store.put({
// 			'test': todoText,
// 			'timestamp': new Date().getTime()
// 		});

// 	request.onsuccess = function(event) {
// 		todo.indexedDB.getAllTodoItems();
// 	};

// 	request.onerror = function(event) {
// 		console.log(event.value);
// 	};
// };

// todo.indexedDB.getAllTodoItems = function() {
// 	var todos = document.getElementById('todoItems');
// 	todos.innerHTML = '';

// 	var db = todo.indexedDB.db,
// 		trans = db.transaction(['todo'], 'readwrite'),
// 		store = trans.objectStore('todo'),
// 		// Get everything in the store;
// 		keyRange = IDBKeyRange.lowerBound(0),
// 		cursorRequest = store.openCursor(keyRange);

// 	cursorRequest.onsuccess = function(event) {
// 		var result = event.target.result;
// 		if(!!result == false) return;

// 		renderTodo(result.value);
// 		result.continue();
// 	};

// 	cursorRequest.onerror = todo.indexedDB.onerror;
// };

// function renderTodo(row) {
// 	var todos = document.getElementById('todoItems'),
// 		li = document.createElement('li'),
// 		a = document.createElement('a'),
// 		t = document.createTextNode(row.text);

// 	t.data = row.text;

// 	a.addEventListener('click', function(event) {
// 		todo.indexedDB.deleteTodo(row.timeStamp);
// 	});

// 	a.href = '#';
// 	a.textContent = ' [Delete]';
// 	li.appendChild(t);
// 	li.appendChild(a);
// 	todos.appendChild(li);
// }

// todo.indexedDB.deleteTodo = function(id) {
// 	var db = todo.indexedDB.db,
// 		trans = db.transaction(['todo'], 'readwrite'),
// 		store = trans.objectStore('todo'),
// 		request = store.delete(id);

// 	request.onsuccess = function(event) {
// 		todo.indexedDB.getAllTodoItems();	// Refresh the screen
// 	};

// 	request.onerror = function(event) {
// 		console.log(event);
// 	};
// };

// function init() {
// 	todo.indexedDB.open();	// Open displays the data previously saved
// }

// window.addEventListener('DOMContentLoaded', init, false);

// function addTodo() {
// 	var todo = document.getElementById('todo');

// 	todo.indexedDB.addTodo(todo.value);
// 	todo.value = '';
// }

// (function($) {$('input[type="submit"]').on('click', function(e){e.preventDefault();})}(jQuery));