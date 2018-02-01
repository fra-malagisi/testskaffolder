<?php
//dependency import
require 'properties.php';
require 'lib/Slim/Slim.php';
require 'security/Security.php';

//init Slim Framework
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->add(new \Security($app));
require 'security/Login.php';
require 'security/ManageUser.php';

//resources
	//db maeci_db
		require('./resource/maeci_db/custom/ImmobileCustom.php');
		require('./resource/maeci_db/Immobile.php');
	

$app->run();


?>
