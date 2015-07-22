angular.module('app').controller('signupController', function ($scope, userService, appNotifier, $location, authService ) {

    $scope.signup = function () {
        var newUserData = {
            email: $scope.email,
            userName: $scope.userName,
            password: $scope.password,
            firstName: $scope.firstName,
            lastName: $scope.lastName
        };

        authService.createUser(newUserData).then(function () {
            appNotifier.notify('User account created!', true);
            $location.path('/');
        }, function (reason) {
            appNotifier.notify(reason, false);
        });
    };
})