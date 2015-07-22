angular.module('app').controller('authController', function ($scope, $http, identity, appNotifier, authService, $location) {

    $scope.identity = identity;

    $scope.login = function (email, password) {

        authService.authenticateUser(email, password).then(function (success) {
            if (success) {
                appNotifier.notify('You have sucessfully logged in', true);
            }
            else {
                appNotifier.notify('invalid email / password', false);
            }
        });
    };

    $scope.signout = function () {

        authService.logoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            appNotifier.notify('You have sucessfully logged out', true);
            $location.path("/");
        });
    };
});