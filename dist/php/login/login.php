<?php
require('connect.php');
	session_start();


if(isset($_POST['makeLogin']) && !empty($_POST['makeLogin'])) {
	// get username, password + website
	$username = $_POST['username'];
	$password = $_POST['password'];
	$website = $_POST['website'];
	

	// call checkLogin function
	checkLogin($username,$password, $website);
}

if(isset($_POST['checkLogin']) && !empty($_POST['checkLogin'])) {
	isLoggedIn();

}

if(isset($_POST['logout']) && !empty($_POST['logout'])) {
	session_regenerate_id(true);
	session_destroy();
}


function isLoggedIn(){
	if(isset($_SESSION['username'])){
		echo 1;
	}else{
		echo 0;
	}
}

function checkLogin($username, $password, $website){
	// query username password and website in db
	$query = "SELECT * FROM `user` WHERE username='$username' and password='$password' and website='$website'";
	// get result of query
	$result = mysql_query($query) or die(mysql_error());
	$count = mysql_num_rows($result);

	// if result is present in db
	if ($count == 1){
		$_SESSION['username'] = $username;
		echo 1;
	}
	else{
		session_regenerate_id(true);
		echo 0;
	}
}

?>