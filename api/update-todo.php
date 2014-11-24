<?php

require_once('todo-connection.php');

if (mysqli_connect_errno()) {
	die("Database connection failed: " . 
		mysqli_connect_errno() . 
		" (" . mysqli_connect_errno() . ")"
	);
}

$content_type_args = explode(";", $_SERVER["CONTENT_TYPE"]);
	
if ($content_type_args[0] == "application/json") {
	$_POST = json_decode(file_get_contents("php://input"), true);
	// print_r($content_type_args);
}

if (isset($_POST['id'])) {
	$id = $_POST['id'];
	if ($statement = $connection->prepare("UPDATE todos SET name=?, description=?, complete=?, date=? WHERE id=?")) {

		if ($statement === false) {
			trigger_error($this->mysqli->error, E_USER_ERROR);
		}

		$statement->bind_param('ssisi', $name, $description, $complete, $date, $id);

		$name = $_POST['name'];
		$description = $_POST['description'];
		$complete = $_POST['complete'];
		$date = date('Y-m-d', strtotime(str_replace('-', '/', $date)));;

		$statement->execute();

		if ($statement->affected_rows === 1) {
			echo "Updated item {$id}.";
		} else {
			echo "Failed to update item {$id}.";
		}

		$statement->close();
	}
}

?>