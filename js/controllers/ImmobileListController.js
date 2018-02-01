// START - USED SERVICES
/*
 *	ImmobileService.delete
 *		PARAMS: 
 *		
 *
 *	ImmobileService.list
 *		PARAMS: 
 *		
 *
 */
// END - USED SERVICES

// START - REQUIRED RESOURCES
/*
 * ImmobileService  
 */
// END - REQUIRED RESOURCES


//CRUD LIST FOR [object Object]

app.controller('ImmobileListController', ['$scope', 'ImmobileService',
    function ($scope, ImmobileService ) {
		
    	$scope.list = ImmobileService.query();
    	
}]);