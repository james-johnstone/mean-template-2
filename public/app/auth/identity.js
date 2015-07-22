angular.module('app').factory('identity', function ($window, userService) {
    var currentUser;

    if (!!window.bootstrappedUserObject) {
        var currentUser = new userService();
        angular.extend(currentUser, window.bootstrappedUserObject);
    }

    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorized: function (role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    };
})