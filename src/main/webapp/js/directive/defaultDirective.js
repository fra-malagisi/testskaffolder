
/**
 * Hide an element if current user do not have role
 * 
 * EXAMPLE: 
 * 
 * <div ng-auth="ADMIN"> Private content only for ADMIN </div>
 * <div ng-auth="['ADMIN', 'MY_ROLE'] "> Private content for ADMIN and MY_ROLE user </div>
 * 
 */
app.directive('ngAuth', ['AuthenticationService', function (AuthenticationService) {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {

        	if (!AuthenticationService.hasRole(attributes.ngAuth)) {
            	$(element).remove();
            }
        }
    };
}]);

/**
 * Convert string to number
 */
app.directive('stringToNumber', function() {
    return {
        restrict: 'EA',
        require: 'ngModel',
        scope: {
        },
        link: function(scope, iElement, iAttrs, ngModel) {
            ngModel.$formatters.push(function(value){
				return Number.parseInt(value);
			});
        }
    }
});

/**
 * Convert string to date
 */
app.directive('stringToDate', function() {
    return {
        restrict: 'EA',
        require: 'ngModel',
        scope: {
        },
        link: function(scope, iElement, iAttrs, ngModel) {
            ngModel.$formatters.push(function(value){
				return new Date(value);
			});
        }
    }
});


/**
 * Link works on every type of tag
 * 
 * EXAMPLE:
 * 
 * <button ng-link="/home">Go to Home</button>
 * 
 */
app.directive('ngLink', ['$location', function($location) {
    return {
        link: function(scope, element, attrs) {

            $(element).on('mousedown', function(e) {
            	if( e.which == 2 ){
            		e.preventDefault();
            		e.stopPropagation();
            	}
            });
            
            $(element).on('mouseup', function(e) {
            	if( e.which == 3 ) return;
            	var params = {};
            	if (attrs.ngLinkParams)
            		params = JSON.parse(attrs.ngLinkParams);
            	
            	if( e.which == 1 ){
	                scope.$apply(function() {
	                    $location.path(attrs.ngLink).search(params);
	                });
            	}
            	
            	if( e.which == 2 ){
            		e.preventDefault();
            		e.stopPropagation();
            		window.open('#'+attrs.ngLink + "?" + $.param( params ));
            		return false;
            	}
            });
        }
    }
}]);