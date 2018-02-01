
/**
 * This service call security & user API function
 */
app.factory("UserService", [ "$resource", function($resource) {

	return $resource(properties.endpoint + "/Users/:_id", {_id:'@_id'}, {
		login : {
			url : properties.endpoint + '/login',
			method : "POST"
		},
		verifyToken : {
			url : properties.endpoint + '/verifyToken',
			method : "POST"
		},
		changePassword : {
			url : properties.endpoint + '/Users/:id/changePassword',
			params: {id:'@id'},
			method : "POST"
		},
		changePasswordProfile : {
			url : properties.endpoint + '/changePassword',
			method : "POST"
		}
    });
    
} ]);