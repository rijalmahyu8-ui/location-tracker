<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$ip = isset($_GET['ip']) ? $_GET['ip'] : $_SERVER['REMOTE_ADDR'];
$api_url = "http://ip-api.com/json/" . $ip;
$response = file_get_contents($api_url);
echo $response;
