angular.module('app').factory('authService', function ($http, identity, $q, userService) {
    return {
        authenticateUser: function (email, password) {
            var defer = $q.defer();

            $http.post('/login', { email: email, password: password }).then(function (response) {
                if (response.data.success) {
                    var user = new userService();
                    angular.extend(user, response.data.user);
                    identity.currentUser = user;
                    defer.resolve(true);
                }
                else {
                    defer.resolve(false);
                }
            });
            return defer.promise;
        },

        createUser: function (newUserData) {
            var newUser = new userService(newUserData);
            var defer = $q.defer();

            newUser.$save().then(function () {
                identity.currentUser = newUser;
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });
            return defer.promise;
        },
        updateUser: function (userData) {
            var defer = $q.defer();
            var clone = new userService();

            angular.extend(clone, userData);

            clone.$update().then(function () {
                //only update the angular bindings if the current user is updating their own profile.
                if (identity.currentUser.email === userData.email) {
                    angular.extend(identity.currentUser, userData);
                }
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });

            return defer.promise;
        },

        logoutUser: function () {
            var defer = $q.defer();
            $http.post('/logout', { logout: true }).then(function () {
                identity.currentUser = undefined;
                defer.resolve();
            });
            return defer.promise;
        },

        authorizeCurrentUserForRole: function (role) {
            if (identity.isAuthorized(role)) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },

        authenticateCurrentUser: function () {
            if (identity.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        }
    }
})