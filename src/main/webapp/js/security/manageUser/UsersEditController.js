
/**
 * Controller edit user for Admin
 */
app.controller('UsersEditController', ['$scope', '$location', '$routeParams', '$q', 'UserService',
    function ($scope, $location, $routeParams, $q, UserService ) {

    	// Get user
    	if ($routeParams.id != 'new')
    	{
        	$scope.id = $routeParams.id;
        	$scope.user = UserService.get({_id: $scope.id});
    	}
    	else{
    		$scope.user = new UserService({
    		    roles: []
    		});
    	}
		
		// Save user
    	$scope.save = function(){
    	    
			if (!$scope.user._id) {
				$scope.user.password = CryptoJS.MD5($scope.user.password).toString();
			}
			
    		$scope.user.$save().then(function(data){
    			$scope.user=data;
        		$location.path('/manage-users/');
    		});
    	}
		
		// Delete user
    	$scope.remove = function(){
    		UserService.remove({_id: $scope.user._id}).$promise.then(function(){
				$('#removeModal').modal('hide');
				$('.modal-backdrop').remove();
				$('.modal-open').removeClass("modal-open");
        		$location.path('/manage-users/');
    		});
    	}
		
		// Add role
		$scope.addRole = function() {
			$scope.user.roles.push($scope.newRole);
			$scope.newRole = "";
		}

		// Remove role
		$scope.removeRole = function(index) {
			$scope.user.roles.splice(index, 1);
		}

		//Change password
		$scope.changePassword = function() {
			var passwordNew = CryptoJS.MD5($scope.passwordNew).toString();
			var passwordAdmin = CryptoJS.MD5($scope.passwordAdmin).toString();

			UserService.changePassword({id: $scope.user._id, passwordNew: passwordNew, passwordAdmin: passwordAdmin })
			.$promise.then(function(data) {
				$('#changePasswordModal').modal('hide');
				$scope.passwordAdmin = null;
				$scope.passwordNew = null;
				$scope.passwordNewConfirm = null;
			}, function(err) {
				$scope.showError = true;
			})
		};

}]);