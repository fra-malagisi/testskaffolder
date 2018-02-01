
/**
 * Run Angular JS
 */
app.run(['$location', '$rootScope', 'AuthenticationService', function($location, $rootScope, AuthenticationService ) {
	$rootScope.properties = properties;
	$rootScope.baseUrl = $rootScope.properties.endpoint;
	
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    	try{
    		$rootScope.title = current.$$route.originalPath;
    	}
    	catch(e){}
    });
    
	$rootScope.dateFilter = function(date) {
		if (date)
			return date.toISOString()
	}
	
	// Security redirect on login error
	$rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
		if (rejection == AuthenticationService.UNAUTHORIZED) {
			$location.path("/login");
		}
	});

} ]);


/**
 * Login Controller
 */
app.controller('LoginController', [
		'$scope',
		'$rootScope',
		'$http',
		'$location',
		'AuthenticationService',
function($scope, $rootScope, $http, $location, AuthenticationService) {

	$scope.login = function() {
		var hash = CryptoJS.MD5($scope.password);

		// Call login service
		AuthenticationService.login($scope.user, hash.toString(), $scope.remember, function (user) {
			if(user) {
				// If login is OK
				$location.path('/');
			} else {
				// Show login error
				if ($scope.showError) {
					$scope.closeError();
					window.setTimeout(function () {
						$scope.showError = true; 
						$scope.$apply();
				   }, 100);
				} else {
					$scope.showError = true; 
				}
			}

		})
	};

	$scope.closeError = function() {
		$scope.showError = false;
	};


} ]);


/**
 * Logout Controller
 */
app.controller('LogoutController', [ '$scope',  'AuthenticationService', '$location', 
function($scope, AuthenticationService, $location) {
	
	AuthenticationService.logout();
	$location.path("/login");

} ]);


/**
 * Menu Controller
 */
app.controller('MenuController', [ '$scope', 'AuthenticationService', '$rootScope',
 function($scope, AuthenticationService, $rootScope) {
	
	var init = function() {
		AuthenticationService.getUser().then(function(user){
			$scope.user = user;
		});
	}

	init();
	$rootScope.$on('refreshUser', init);

} ]);
