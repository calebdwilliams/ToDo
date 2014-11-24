<?php
	$to = $_GET["to"];
	$text = $_GET["text"];
	$from = "9729776597@txt.att.net";

	mail("9729776597@txt.att.net", "", $text, "From: $from\r\n");

?>