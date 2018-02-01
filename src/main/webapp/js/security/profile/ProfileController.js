
/*
 * ProfileController  
 */
app.controller('ProfileController', ['$scope', '$location', 'AuthenticationService', 'UserService',
    function ($scope, $location, AuthenticationService, UserService) {

		// Get current user
		AuthenticationService.getUser().then(function(user) {
			$scope.user =  user;
		});
		
		// Save user
    	$scope.save = function() {
    		$scope.user.$save().then(function(data){
    			$scope.user = data;
        		$location.path('/home');
    		});
		}
		
		// Change password
		$scope.changePassword = function() {
			var passwordNew = CryptoJS.MD5($scope.passwordNew).toString();
			var passwordOld = CryptoJS.MD5($scope.passwordOld).toString();

			UserService.changePasswordProfile({passwordNew: passwordNew, passwordOld:passwordOld })
			.$promise.then(function(data) {
				$('#changePasswordModal').modal('hide');
				$scope.passwordOld = null;
				$scope.passwordNew = null;
				$scope.passwordNewConfirm = null;
			}, function(err) {
				$scope.showError = true;
			})
		}
    	
}]);