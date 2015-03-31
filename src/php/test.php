<?php
$scriptInvokedFromCli =
    isset($_SERVER['argv'][0]) && $_SERVER['argv'][0] === 'php/test.php';
if($scriptInvokedFromCli) {
    echo 'starting server on port 3000' . PHP_EOL;
    exec('php -S localhost:3000 -t public test.php');
} else {
    return routeRequest();
}
function routeRequest()
{
	echo'test';

}