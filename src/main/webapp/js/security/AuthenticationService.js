/**
 * This service manage the security functions
 */
app.factory("AuthenticationService", [
    "$q",
    "UserService",
    "$http",
    "$rootScope",
function($q, UserService, $http, $rootScope) {

    // Current user logged
    var currentUser;

    var AuthenticationService =  {

        OK : 200,
        UNAUTHORIZED : 401,

        /**
         * Login user
         * Set header with JWT token and the current user 
         */
        login(username, password, remember, cb) {

            UserService.login({ username: username, password: password }, function (user) {

                // Set current user
                currentUser = user;
                // Add jwt token to auth header for all requests made by the $http service
                $http.defaults.headers.common.Authorization = 'Baerer ' + user.token;

                // Store user in local storage to keep user logged in between page refreshes 
                if (remember) {
                    localStorage.setItem('token', user.token);
                } else {
                    sessionStorage.setItem('token', user.token);
                }

                $rootScope.$emit('refreshUser');

                // Execute callback with true to indicate successful login
                cb(user);
            }, function(err) {
                // RESPONSE 401
                cb(false);
            });
            
        },
        /**
         * Logout 
         * Remove http header, current user and local/session storage
         */
        logout : function(){
            // Clear token and remove user from local storage to log user logout
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            currentUser = undefined;
            $http.defaults.headers.common.Authorization = '';
            $rootScope.$emit('refreshUser');
        },
        /**
         * Check if current user have a role
         * @param {*} role can be an array of roles or a string
         */
        hasRole : function(role) {
           
                // Not authenticaed
                if (!currentUser || !currentUser.roles) 
                    return false;

                // If user is admin
                if (currentUser.roles.indexOf("ADMIN") != -1)
                    return true;
                
                // If the page is public
                if (role.length == 0)
                    return true;
                
                // Check page role 
                if (Array.isArray(role)){
                    for (var i in role) {
                        for (var j in currentUser.roles) {
                            if (role[i] == currentUser.roles[j])
                                return true
                        }	
                    }
                    return false;

                }
                else {
                    if (currentUser.roles)
                        return currentUser.roles.indexOf(role) >= 0;
                    else
                        return false;	
                }
            
        },
        /**
         * Check if user is authenticated, execute verify JWT token if is the firset refresh
         */
        isAuthenticated : function() {
            
            var deferred = $q.defer();
            if (currentUser) {
                deferred.resolve(currentUser);
            } else {
                var token = sessionStorage.getItem("token") || localStorage.getItem("token");
                if (token) {
                    // Check validity JWT token
                    UserService.verifyToken({token: token} , function(user) {
                        // Set current user
                        currentUser = user;
                        // Add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Baerer ' + token;

                        deferred.resolve(currentUser);
                    }, function(err) {
                        deferred.reject(AuthenticationService.UNAUTHORIZED);
                    });
                } else {
                    deferred.reject(AuthenticationService.UNAUTHORIZED);
                }
            }

            return deferred.promise;
        },
        /**
         * Get current user, execute verify JWT token if is the firset refresh
         */
        getUser : function() {

            var deferred = $q.defer();

            if (currentUser) {
                deferred.resolve(currentUser);
            } else {
                
                var token = sessionStorage.getItem("token") || localStorage.getItem("token");
                if (token) {
                    // Check validity JWT token and get user
                    UserService.verifyToken({token: token} , function(user) {

                        // Set current user
                        currentUser = user;
                        // Add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Baerer ' + token;

                        deferred.resolve(currentUser);
                    }, function(err) {
                        deferred.reject(AuthenticationService.UNAUTHORIZED);
                    });
                } else {
                    deferred.reject(AuthenticationService.UNAUTHORIZED);
                }
            }

            return deferred.promise;
        }


    };

    return AuthenticationService;
} ]);