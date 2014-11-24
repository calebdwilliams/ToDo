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
}

if (isset($_POST['id'])) {
	$id = $_POST['id'];
	if ($statement = $connection->prepare("DELETE FROM todos WHERE id=? LIMIT 1")) {

		if ($statement === false) {
			trigger_error($this->mysqli->error, E_USER_ERROR);
			die();
		}

		$statement->bind_param('i', $id);

		$statement->execute();

		if ($statement->affected_rows === 1) {
			echo "Deleted item {$id} from database.";
		} else {
			echo "Failed to delete item {$id} from database.";
		}

		$statement->close();
	}
}

?>