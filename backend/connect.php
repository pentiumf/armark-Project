<?php 

	//$dbcon = mysqli_connect("localhost", "root", "", "armack") or die("error");

	$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

	$server = $url["host"];
	$username = $url["user"];
	$password = $url["pass"];
	$db = substr($url["path"], 1);

	$dbcon = new mysqli($server, $username, $password, $db);

 ?>