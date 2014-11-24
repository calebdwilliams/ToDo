<?php
require_once('connection.php');

if (mysqli_connect_errno()) {
	die("Database connection failed: " . 
		mysqli_connect_errno() . 
		" (" . mysqli_connect_errno() . ")"
	);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
	
	// * Converts $http.post data from application/json to $_POST * //	

	$content_type_args = explode(";", $_SERVER["CONTENT_TYPE"]);
	
	if ($content_type_args[0] == "application/json") {
		$_POST = json_decode(file_get_contents("php://input"), true);
		print_r($content_type_args);
	}

	//* If $_POST is set, create a prepared SQL statement and drop data onto database *//

	if (isset($_POST)) {
		if ($statement = $connection->prepare("INSERT INTO todos (label, author, complete, modified) VALUES (?, ?, ?, ?)")) {
			$statement->bind_param('ssis', $label, $author, $complete, $modified);

			$label = $_POST['label'];
			$author = $_POST['author'];
			if (isset($_POST['complete'])) {
				$complete = 1;
			} else {
				$complete = 0;
			}
			$modified = date('Y-m-d', strtotime(str_replace('-', '/', $modified)));;

			$statement->execute();

			return "Inserted {$label} into database";

			$statement->close();
		} else {
			return "Prepared statement error: <strong>$connection->error</strong>\n";
		}
	} else {
		echo "Error";
	}
} else if ($_SERVER["REQUEST_METHOD"] === "GET") {

	header('Content-Type: application/json');
	
	$query = "SELECT * FROM todos";

	$result = mysqli_query($connection, $query);

	if (!$result) {
		die("Database query failed");
	}

	$data = array();

	while($row = $result->fetch_assoc()) {
		$data[] = $row;
	}

	echo json_encode($data);
} else {
	return 'error';
}

mysqli_close($connection);