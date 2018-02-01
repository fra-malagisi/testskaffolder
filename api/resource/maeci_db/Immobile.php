<?php
	require_once './db/dbmaeci_dbManager.php';
	
/*
 * SCHEMA DB Immobile
 * 
	{
		nome: {
			type: 'String'
		},
		//RELAZIONI
		
		
		//RELAZIONI ESTERNE
		
		
	}
 * 
 */


//CRUD METHODS


//CRUD - CREATE


$app->post('/immobiles',	function () use ($app){

	$body = json_decode($app->request()->getBody());
	
	$params = array (
		'nome'	=> isset($body->nome)?$body->nome:'',
			);

	$obj = makeQuery("INSERT INTO immobile (_id, nome )  VALUES ( null, :nome   )", $params, false);

	
	echo json_encode($body);
	
});
	
//CRUD - REMOVE

$app->delete('/immobiles/:id',	function ($id) use ($app){
	
	$params = array (
		'id'	=> $id,
	);

	makeQuery("DELETE FROM immobile WHERE _id = :id LIMIT 1", $params);

});
	
//CRUD - GET ONE
	
$app->get('/immobiles/:id',	function ($id) use ($app){
	$params = array (
		'id'	=> $id,
	);
	
	$obj = makeQuery("SELECT * FROM immobile WHERE _id = :id LIMIT 1", $params, false);
	
	
	
	echo json_encode($obj);
	
});
	
	
//CRUD - GET LIST

$app->get('/immobiles',	function () use ($app){
	makeQuery("SELECT * FROM immobile");
});


//CRUD - EDIT

$app->post('/immobiles/:id',	function ($id) use ($app){

	$body = json_decode($app->request()->getBody());
	
	$params = array (
		'id'	=> $id,
		'nome'	    => isset($body->nome)?$body->nome:''	);

	$obj = makeQuery("UPDATE immobile SET  nome = :nome   WHERE _id = :id LIMIT 1", $params, false);

	
	echo json_encode($body);
    	
});


/*
 * CUSTOM SERVICES
 *
 *	These services will be overwritten and implemented in  Custom.js
 */

			
?>