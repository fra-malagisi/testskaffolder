// START - USED SERVICES
/*
 *	ImmobileService.create
 *		PARAMS: 
 *		
 *
 *	ImmobileService.get
 *		PARAMS: 
 *		
 *
 *	ImmobileService.update
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

app.controller('ImmobileEditController', ['$scope', '$location', '$routeParams', '$q', 'ImmobileService',
    function ($scope, $location, $routeParams, $q, ImmobileService ) {

    	//manage create and save
		$scope.external = {};
		
    	if ($routeParams.id != 'new')
    	{
        	$scope.id = $routeParams.id;
        	$scope.obj = ImmobileService.get({_id: $scope.id});
        	
    	}
    	else{
    		$scope.obj = new ImmobileService();
        	
    	}
    	
    	$scope.save = function(){
    		$scope.obj.$save().then(function(data){
    			$scope.obj=data;
        		$location.path('/immobiles/');
    		});
    	}
    	
    	$scope.remove = function(){
    		ImmobileService.remove({_id: $scope.obj._id}).$promise.then(function(){
				$('#removeModal').modal('hide');
				$('.modal-backdrop').remove();
				$('.modal-open').removeClass("modal-open");
        		$location.path('/immobiles/');
    		});
    	}
    	
}]);