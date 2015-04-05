<?php


$db_host		= 'mysparky.org';
$db_user		= 'd01dcd5f';
$db_pass		= 'KNtG4NA9VgRmNeEA';
$db_database	= 'd01dcd5f'; 


$connection = mysql_connect($db_host,$db_user,$db_pass) or die('Unable to establish a DB connection');

$select_db = mysql_select_db($db_database,$connection);
mysql_query("SET names UTF8");


?>