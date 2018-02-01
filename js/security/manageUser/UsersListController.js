
/*
 * Manage users controller for admin  
 */
app.controller('UsersListController', ['$scope', 'UserService',
    function ($scope, UserService ) {
        
        // Get registered users
    	$scope.users = UserService.query();
    	
}]);